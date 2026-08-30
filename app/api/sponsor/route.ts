import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RECIPIENTS = ["nadavminkowitz@gmail.com", "danielmink@gmail.com"];

const clean = (v: unknown, fallback = "Not provided") =>
  String(v ?? "").trim() || fallback;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const contactName = clean(body.contactName || body.name, "");
    const email = clean(body.email, "");

    if (!contactName || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const company = clean(body.company);
    const signageName = clean(body.signageName, company);
    const title = clean(body.title);
    const phone = clean(body.phone);
    const website = clean(body.website);
    const street = clean(body.street);
    const city = clean(body.city);
    const state = clean(body.state);
    const zip = clean(body.zip);
    const tier = clean(body.tier, "Not specified");
    const payment = clean(body.payment, "Not specified");
    const announcer = clean(body.announcer || body.message, "None");
    const signature = clean(body.signature, contactName);
    const date = clean(body.date, new Date().toLocaleDateString("en-US"));
    const authorized = body.authorized ? "Yes" : "No";

    const text = [
      "New sponsorship commitment from rockforacause.live",
      "",
      `Level: ${tier}`,
      `Payment method: ${payment}`,
      "",
      "SPONSOR",
      `Company: ${company}`,
      `Name for signage: ${signageName}`,
      `Website: ${website}`,
      `Address: ${street}, ${city}, ${state} ${zip}`,
      "",
      "CONTACT",
      `Name: ${contactName}`,
      `Title: ${title}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "ANNOUNCER NOTES",
      announcer,
      "",
      "AUTHORIZATION",
      `Authorized to commit and grants logo permission: ${authorized}`,
      `Signed: ${signature}`,
      `Date: ${date}`,
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
        subject: `Sponsorship commitment: ${company} (${tier})`,
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