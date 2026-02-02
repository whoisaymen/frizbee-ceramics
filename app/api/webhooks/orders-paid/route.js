import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { appendOrderToSheet } from '@/lib/googleSheets';
import { getPreOrderProductIds } from '@/lib/shopify';

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
