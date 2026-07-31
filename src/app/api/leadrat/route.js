import { NextResponse } from "next/server";

// LeadRat CRM integration endpoint.
// The website's enquiry forms POST their standard payload here (same-origin),
// and this server-side route maps it to LeadRat's schema and forwards it with
// the API key kept out of the browser / public repo.

const LEADRAT_URL = "https://connect.leadrat.com/api/v1/integration/Website";

// Pull the 10-digit mobile out of whatever the user typed.
function normalizeMobile(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

// Try to pull a BHK count out of a configuration string like "3 BHK - 1875 Sqft".
function extractBhk(config) {
  const match = String(config || "").match(/(\d+)\s*BHK/i);
  return match ? match[1] : "";
}

// Extract a URL if the source string embeds one (our forms send "... [Full URL: https://...]").
function extractUrl(source) {
  const match = String(source || "").match(/https?:\/\/[^\s\]]+/);
  return match ? match[0] : "";
}

// City/state best-effort from the project name for CRM routing.
function locationForProject(project) {
  const p = String(project || "").toLowerCase();
  if (p.includes("mysore")) return { city: "Mysore", state: "Karnataka" };
  return { city: "Bengaluru", state: "Karnataka" };
}

function formatDateTime(timestamp) {
  const d = timestamp ? new Date(timestamp) : new Date();
  const valid = !isNaN(d.getTime()) ? d : new Date();
  // LeadRat sample uses dd-mm-yy and HH:MM:SS; use IST since LeadRat is India-based.
  const date = valid
    .toLocaleDateString("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\//g, "-");
  const time = valid.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return { date, time };
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Accept the fields our enquiry forms already send, with sensible fallbacks.
    const name = body.name || body.user_name || "";
    const rawEmail = body.email || body.user_email || "";
    const email =
      rawEmail && rawEmail !== "Not Provided" && rawEmail !== "Not Selected"
        ? rawEmail
        : "";
    const phone = body.phone || body.user_phone || body.mobile || "";
    const project = body.project_name || body.project || "";
    const config =
      body.configuration_type ||
      body.configuration ||
      body.config_type ||
      body.config ||
      "";
    const visitDate =
      body.preferred_visit_date && body.preferred_visit_date !== "Not Selected"
        ? body.preferred_visit_date
        : "";
    const source = body.source || body.source_text || "";

    const mobile = normalizeMobile(phone);

    // Basic guard: LeadRat needs at least a name and a mobile number.
    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, error: "Missing name or mobile" },
        { status: 400 },
      );
    }

    const apiKey = process.env.LEADRAT_API_KEY;
    if (!apiKey) {
      console.error("LEADRAT_API_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "CRM not configured" },
        { status: 500 },
      );
    }

    const { city, state } = locationForProject(project);
    const { date, time } = formatDateTime(body.timestamp);
    const sourceUrl = extractUrl(source);

    const notesParts = [];
    if (config) notesParts.push(`Configuration: ${config}`);
    if (visitDate) notesParts.push(`Preferred site visit: ${visitDate}`);
    if (sourceUrl) notesParts.push(`Source page: ${sourceUrl}`);

    const lead = {
      name,
      email,
      countryCode: "91",
      mobile,
      city,
      state,
      project,
      source: "Website",
      subSource: "sobha-specialoffers.com",
      notes: notesParts.join(" | "),
      submittedDate: date,
      submittedTime: time,
      additionalProperties: {
        NoOfBHK: extractBhk(config),
        Configuration: config || "",
        PreferredVisitDate: visitDate || "",
        SourceURL: sourceUrl || "",
      },
    };

    const response = await fetch(LEADRAT_URL, {
      method: "POST",
      headers: {
        "API-Key": apiKey,
        "Content-Type": "application/json",
      },
      // LeadRat expects an array of lead objects.
      body: JSON.stringify([lead]),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("LeadRat error:", response.status, text);
      return NextResponse.json(
        { success: false, status: response.status },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LeadRat route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to forward lead" },
      { status: 500 },
    );
  }
}
