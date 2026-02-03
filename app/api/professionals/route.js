import { NextResponse } from "next/server";
import { google } from "googleapis";
import { JWT } from "google-auth-library";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, firstName, lastName, companyName, country } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const jwtClient = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await jwtClient.authorize();

    const sheets = google.sheets({ version: "v4", auth: jwtClient });

    const dateOfSubmission = new Date().toLocaleDateString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const row = [
      firstName || "", 
      lastName || "",
      companyName || "", 
      email || "", 
      country || "", 
      dateOfSubmission, 
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.PROFESSIONALS_GOOGLE_SHEETS_ID,
      range: "Sheet1!B:G",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ message: "Saved in Google Sheet." });
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    return NextResponse.json(
      { message: "Google Sheets Error", error: error.message },
      { status: 500 },
    );
  }
}
