import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { appendOrderToSheet } from '@/lib/googleSheets';
import { getPreOrderProductIds } from '@/lib/shopify';

async function sendGA4Purchase(order) {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
  const apiSecret = process.env.GA4_MEASUREMENT_PROTOCOL_SECRET

  if (!measurementId || !apiSecret) return

  const items = (order.line_items || []).map((li) => ({
    item_id: String(li.variant_id),
    item_name: li.title,
    item_variant: li.variant_title,
    price: parseFloat(li.price),
    quantity: li.quantity,
  }))

  // DEBUG — remove before go-live
  console.log('[GA4] purchase', { transaction_id: String(order.order_number), value: parseFloat(order.total_price), currency: order.currency, items })
  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: String(order.customer?.id || order.id),
          events: [{
            name: 'purchase',
            params: {
              transaction_id: String(order.order_number),
              value: parseFloat(order.total_price),
              tax: parseFloat(order.total_tax || 0),
              currency: order.currency || 'EUR',
              items,
            },
          }],
        }),
      }
    )
  } catch (err) {
    console.error('GA4 purchase event failed:', err)
  }
}

export async function GET() {
  // console.log("🔔 Webhook endpoint is live");
  return NextResponse.json({ message: "Webhook endpoint is live" }, { status: 200 });
}
export async function POST(req) {
  try {
    // console.log("Webhook Hit:", req);

    const rawBody = await req.text();

    // Validate HMAC
    const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256');
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET || '';

    const hash = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('base64');

    if (hash !== hmacHeader) {
      // console.error('❌ HMAC validation failed');
      // writeLog("❌ HMAC validation failed", { hmacHeader, hash });
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const topic = req.headers.get('X-Shopify-Topic');
    const orderData = JSON.parse(rawBody);

    // console.log(`📦 Received Webhook: ${topic} → Order ${orderData.id}`);
    // // Always save JSON file (for debugging only)
    // const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    // saveJsonToFile(`order-${orderData.id}-${timestamp}.json`, orderData);

    if (topic === "orders/paid") {
      // Fire GA4 purchase event for every paid order
      await sendGA4Purchase(orderData)

      const preOrderIds = await getPreOrderProductIds();

      const orderProductIds = (orderData.line_items || [])
        .map(li => li.product_id);

      const matchedPreOrderIds = orderProductIds.filter(id =>
        preOrderIds.includes(Number(id))
      );

      if (matchedPreOrderIds.length === 0) {
        // console.log("🟢 No pre-order products inside this order → NOT saved.");
        return NextResponse.json({ ok: true });
      }

      // console.log("🟦 Pre-order products detected:", matchedPreOrderIds);
      orderData.preOrderMatchedIds = matchedPreOrderIds;

      await appendOrderToSheet(orderData);
      // console.log("✔ Saved to Google Sheet");
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
