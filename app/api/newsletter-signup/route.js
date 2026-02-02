import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const email = body.email;

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;
  // const URL = `https://${domain}/admin/api/2023-10/customers.json`;// old api version 2023-04
  const URL = `https://${domain}/admin/api/2024-10/customers.json`; // new api version 2023-10

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminAccessToken,
    },
    body: JSON.stringify({
      customer: {
        email: email,
        // accepts_marketing: true,
        // email_marketing_consent: {
        //   state : "subscribed",
        //   marketing_opt_in_level: "confirmed",
        // }
        email_marketing_consent: {
          state: "subscribed",
          opt_in_level: "confirmed_opt_in" 
        }
      },
    }),
  };

  try {
    const response = await fetch(URL, options);

    const data = await response.json();

    if (response.ok) {
      return new NextResponse(
        JSON.stringify({ message: "Subscription successful", data: data }),
        { status: 200 }
      );
    } else {
      console.error("Error from Shopify:", data); // Log error details
      return new NextResponse(
        JSON.stringify({ message: "Error subscribing", details: data }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Server Error:", error); // Log server-side error
    return new NextResponse(
      JSON.stringify({ message: "Error subscribing", error: error.toString() }),
      { status: 500 }
    );
  }
}

