import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    const brevoPayload = {
      // Replace '1' with your actual Brevo Template ID

      // (You can find this ID in your Brevo Templates dashboard)

      templateId: 1,

      sender: {
        // Must be an authenticated domain in your Brevo account

        name: "Website Enquiries",
        email: "waytonest01@gmail.com",
      },

      to: [
        {
          email: "waytonest01@gmail.com",
          name: "Sales Team",
        },
      ],

      // Pass the data exactly as the template expects it

      params: {
        user_name: data.user_name,

        user_email: data.user_email,

        user_phone: data.user_phone,

        project_name: data.project_name,

        config_type: data.config_type,

        visit_date: data.visit_date,

        source_url: data.source_url,
      },
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",

      headers: {
        accept: "application/json",

        "api-key": process.env.BREVO_API_KEY,

        "content-type": "application/json",
      },

      body: JSON.stringify(brevoPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.error("Brevo API Error:", errorData);

      throw new Error("Failed to send email via Brevo");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email Route Error:", error);

    return NextResponse.json(
      { error: "Failed to send email" },

      { status: 500 }
    );
  }
}
