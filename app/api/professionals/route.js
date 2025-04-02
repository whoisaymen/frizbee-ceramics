import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const {email, firstName, lastName, companyName, category, country} = body;

    const hubspotUrl = process.env.HUBSPOT_DOMAIN;
    const hubspotAccessToken = process.env.HUBSPOT_ACCESS_TOKEN;

    const contactData = {
        properties: {
            email: email,
            lastname: lastName,
            firstname: firstName,
            company: companyName,
            // segment_1: category,
            country: country,
            source: "Shopify professional tab",
            segment_3: "Prospect",
        }
    };

    try {
        const response = await fetch(hubspotUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${hubspotAccessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData),
        });

        const data = await response.json();

        if (response.ok) {
            return new NextResponse(
                JSON.stringify({ message: "Contact saved in HubSpot", data }),
                { status: 200 }
            );
        } else {
            console.error("HubSpot API Error:", data);
            return new NextResponse(
                JSON.stringify({ message: "Error saving to HubSpot", details: data }),
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
