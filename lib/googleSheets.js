import { google } from "googleapis";

export async function appendOrderToSheet(orderData) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // FILTER ONLY PRE-ORDER ITEMS
    const preOrderItems = (orderData.line_items || []).filter(item =>
      (orderData.preOrderMatchedIds || []).includes(item.product_id)
    );

    if (preOrderItems.length === 0) {
      console.log("⚠ appendOrderToSheet called but no pre-order items found.");
      return false;
    }

    const orderNumber = orderData.order_number;
    const clientName = orderData.billing_address?.name || "";

    const productNames = preOrderItems.map(item => item.name).join(", ");

    const quantityTotal = preOrderItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    // Date formatting
    const orderDateObj = new Date(orderData.created_at);
    const yyyy = orderDateObj.getFullYear();
    const mm = orderDateObj.getMonth() + 1;
    const dd = orderDateObj.getDate();

    const eta = new Date(orderData.created_at);
    eta.setDate(eta.getDate() + 20);

    const etaFormula = `=DATE(${eta.getFullYear()}, ${eta.getMonth() + 1}, ${eta.getDate()})`;
    const orderDateFormula = `=DATE(${yyyy}, ${mm}, ${dd})`;

    const row = [
      orderNumber,
      clientName,
      productNames,
      quantityTotal,
      orderDateFormula,
      etaFormula,
      "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    console.log("✔ Only pre-order items saved to sheet");
    return true;
  } catch (error) {
    console.error("❌ Google Sheet Error:", error);
    return false;
  }
}
