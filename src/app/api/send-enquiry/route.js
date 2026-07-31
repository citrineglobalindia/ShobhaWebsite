import { NextResponse } from "next/server";

// Ensure this runs on the server at request time (never statically optimized).
export const dynamic = "force-dynamic";

// --- Configuration (overridable via environment variables) ---
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const TO_EMAIL = process.env.ENQUIRY_TO_EMAIL || "waytonest01@gmail.com";
// Sender must be a verified sender / authenticated domain in Brevo.
const FROM_EMAIL = process.env.ENQUIRY_FROM_EMAIL || "enquiry@brigadesgranada.co.in";
const FROM_NAME = process.env.ENQUIRY_FROM_NAME || "Sobha Website Enquiry";
const PROJECT_LABEL = process.env.ENQUIRY_PROJECT_LABEL || "Sobha";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(data) {
  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Configuration", data.configuration_type],
    ["Preferred visit date", data.preferred_visit_date],
    ["Project", data.project_name],
    ["Source", data.source],
    ["Submitted at", data.timestamp],
  ];

  const tableRows = rows
    .filter(([, val]) => val && String(val).trim() && String(val) !== "Not Selected" && String(val) !== "Not Provided")
    .map(
      ([label, val]) =>
        `<tr>
          <td style="padding:10px 16px;background:#f8fafc;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(val)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#0f172a;border-radius:12px 12px 0 0;padding:20px 24px;">
        <h1 style="margin:0;color:#ffffff;font-size:18px;">🔔 New Enquiry — ${escapeHtml(PROJECT_LABEL)}</h1>
        <p style="margin:6px 0 0;color:#facc15;font-size:13px;">A new lead just submitted an enquiry on the website.</p>
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border-radius:0 0 12px 12px;border-collapse:collapse;overflow:hidden;">
        ${tableRows}
      </table>
      <p style="margin:16px 4px 0;color:#94a3b8;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(data.name || "the lead")}.</p>
    </div>
  </body>
</html>`;
}

export async function POST(request) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return NextResponse.json(
      { success: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Accept both the site's apiPayload shape and the older EmailJS param names.
  const normalized = {
    name: data.name ?? data.user_name,
    email: data.email ?? data.user_email,
    phone: data.phone ?? data.user_phone,
    project_name: data.project_name,
    configuration_type: data.configuration_type ?? data.config_type,
    preferred_visit_date: data.preferred_visit_date ?? data.visit_date,
    timestamp: data.timestamp,
    source: data.source ?? data.source_url,
  };

  if (!normalized.name && !normalized.phone && !normalized.email) {
    return NextResponse.json(
      { success: false, error: "Missing enquiry details." },
      { status: 400 }
    );
  }

  const payload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: TO_EMAIL }],
    subject: `🔔 New Enquiry — ${normalized.project_name || PROJECT_LABEL}`,
    htmlContent: buildHtml(normalized),
  };

  if (normalized.email && /.+@.+\..+/.test(String(normalized.email))) {
    payload.replyTo = { email: String(normalized.email), name: normalized.name || undefined };
  }

  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Brevo send failed:", res.status, text);
      return NextResponse.json(
        { success: false, error: "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Brevo request error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 502 }
    );
  }
}
