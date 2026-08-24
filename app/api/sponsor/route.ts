import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RECIPIENTS = ["nadavminkowitz@gmail.com", "danielmink@gmail.com"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const company = String(body.company || "").trim() || "Not provided";
    const phone = String(body.phone || "").trim() || "Not provided";
    const tier = String(body.tier || "").trim() || "Not specified";
    const message = String(body.message || "").trim() || "No message";

    const text = [
      "New sponsorship inquiry from rockforacause.live",
      "",
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Level: ${tier}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Mailer not configured" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.SPONSOR_FROM ||
          "Rock for a Cause <onboarding@resend.dev>",
        to: RECIPIENTS,
        reply_to: email,
        subject: `Sponsorship inquiry: ${company} (${tier})`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}