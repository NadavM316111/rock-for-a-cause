"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  /app/sponsor/page.tsx                                             */
/*  Web version of the Rock for a Cause sponsorship commitment form.  */
/* ------------------------------------------------------------------ */

const TICKETS =
  "https://www.eventbrite.com/e/static-rebellion-rock-for-a-cause-in-partnership-with-school-of-rock-tickets-1997094540531?aff=oddtdtcreator";

const SPONSOR_EMAIL = "sponsors@rockforacause.live";
const CHECK_ADDRESS = "10731 Hawks Vista Street, Plantation, FL 33324";

/* Max upload. Keep this under Vercel's 4.5MB request body limit,
   remembering base64 inflates a file by about a third. */
const MAX_LOGO_BYTES = 3 * 1024 * 1024;

const IMG = {
  sr: "/logo-sr.jpg",
};

const C = {
  ink: "#0B0A0A",
  ink2: "#131110",
  line: "rgba(239,230,212,0.14)",
  red: "#C83C28",
  redHi: "#E04A2F",
  cream: "#EFE6D4",
  sand: "#D9C9A3",
  muted: "#948A80",
};

const M = {
  silver: { edge: "#B9BEC4", text: "#D8DDE2", glow: "rgba(185,190,196,0.16)" },
  gold: { edge: "#D4AF37", text: "#EBC85B", glow: "rgba(212,175,55,0.16)" },
  platinum: { edge: "#CFD8DF", text: "#E8EFF4", glow: "rgba(207,216,223,0.18)" },
  diamond: { edge: "#4FA3D9", text: "#8FD0F5", glow: "rgba(79,163,217,0.20)" },
};

const display = "var(--font-display), Impact, sans-serif";

const LEVELS = [
  {
    id: "Silver, $1,000",
    name: "Silver",
    price: "$1,000",
    tickets: "2 VIP Tickets",
    palette: M.silver,
    lead: null as string | null,
    perks: [
      "Company logo on the event website",
      "Recognition on social media",
      "Name listed on sponsor signage",
    ],
  },
  {
    id: "Gold, $5,000",
    name: "Gold",
    price: "$5,000",
    tickets: "6 VIP Tickets",
    palette: M.gold,
    lead: "Everything in Silver, plus:",
    perks: [
      "Medium logo on marketing materials",
      "Recognition during the live event",
      "Linked logo on the event website",
      "Meet and greet with the band",
    ],
  },
  {
    id: "Platinum, $10,000",
    name: "Platinum",
    price: "$10,000",
    tickets: "10 VIP Tickets",
    palette: M.platinum,
    lead: "Everything in Gold, plus:",
    perks: [
      "Premium logo placement on signage",
      "Recognition from the stage",
      "Featured social media spotlight",
      "Promotional materials at the venue",
      "Photo with Static Rebellion",
    ],
  },
  {
    id: "Diamond, $20,000",
    name: "Diamond",
    price: "$20,000",
    tickets: "15 VIP Tickets",
    palette: M.diamond,
    lead: "Everything in Platinum, plus:",
    perks: [
      "Featured as Presenting Sponsor",
      "On-stage acknowledgment",
      "Dedicated spotlight on the website",
      "Booth or display space",
      "Private meet and greet, event t-shirts",
      "Your rep speaks on stage, plus a plaque",
    ],
  },
];

/* ------------------------------------------------------------------ */

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: C.ink,
  border: `1px solid ${C.line}`,
  color: C.cream,
  padding: "14px 15px",
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  borderRadius: 0,
  appearance: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: C.red,
  marginBottom: 9,
};

function Bolt({ size = 14, color = C.red }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 10 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M6.2 0L0 9.1h3.4L2.9 16 10 6.4H6.3L6.2 0z" fill={color} />
    </svg>
  );
}

function Star({ size = 14, color = C.red }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8 0l2.1 5.3L16 5.9l-4.3 3.8 1.3 5.8L8 12.4 3 15.5l1.3-5.8L0 5.9l5.9-.6L8 0z"
        fill={color}
      />
    </svg>
  );
}

function StepHead({
  n,
  title,
  note,
}: {
  n: string;
  title: string;
  note?: string;
}) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          borderBottom: `1px solid ${C.line}`,
          paddingBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: display,
            fontSize: 30,
            lineHeight: 1,
            color: C.red,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {n}
        </span>
        <h2
          style={{
            fontFamily: display,
            fontSize: "clamp(26px, 4vw, 40px)",
            lineHeight: 1,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: C.cream,
          }}
        >
          {title}
        </h2>
      </div>
      {note ? (
        <p
          style={{
            marginTop: 14,
            fontSize: 16,
            lineHeight: 1.7,
            color: C.muted,
            maxWidth: 640,
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle} htmlFor={id}>
        {label}
        {required ? <span style={{ color: C.redHi }}> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        style={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function SponsorPage() {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-US"));
  }, []);

  const [level, setLevel] = useState("");
  const [pay, setPay] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  /* logo upload */
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [logo, setLogo] = useState<{
    filename: string;
    type: string;
    size: number;
    data: string;
  } | null>(null);
  const [logoError, setLogoError] = useState("");

  const [form, setForm] = useState({
    company: "",
    signageName: "",
    contactName: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    announcer: "",
    signature: "",
  });

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const pickLogo = async (file: File | undefined) => {
    if (!file) return;
    setLogoError("");

    if (file.size > MAX_LOGO_BYTES) {
      setLogoError(
        `That file is ${(file.size / 1024 / 1024).toFixed(
          1
        )}MB. Keep it under 3MB, or send a smaller export and we will ask for the print-ready version when we confirm your level.`
      );
      return;
    }

    try {
      const data: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve(String(reader.result).split(",")[1] || "");
        reader.onerror = () => reject(new Error("read failed"));
        reader.readAsDataURL(file);
      });

      setLogo({
        filename: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        data,
      });
    } catch {
      setLogoError("Could not read that file. Try another one.");
    }
  };

  const submit = async () => {
    const missing: string[] = [];
    if (!level) missing.push("a sponsorship level");
    if (!form.company.trim()) missing.push("company");
    if (!form.contactName.trim()) missing.push("contact name");
    if (!form.email.trim()) missing.push("email");
    if (!form.phone.trim()) missing.push("phone");
    if (
      !form.street.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.zip.trim()
    )
      missing.push("full address");
    if (!pay) missing.push("how you plan to pay");
    if (!authorized) missing.push("the authorization checkbox");
    if (!form.signature.trim()) missing.push("your printed name");

    if (missing.length) {
      setStatus("error");
      setError(`Still needed: ${missing.join(", ")}.`);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          name: form.contactName,
          tier: level,
          payment: pay,
          date: today,
          authorized,
          logo,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending that. Please try again in a moment."
      );
    }
  };

  return (
    <main style={{ background: C.ink, minHeight: "100vh" }}>
      {/* ---------------- HEADER ---------------- */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: 68,
          display: "flex",
          alignItems: "center",
          background: "rgba(11,10,10,0.94)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Link
            href="/#sponsors"
            className="social-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: C.cream,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: display,
                fontSize: 20,
                lineHeight: 1,
                color: C.red,
              }}
            >
              &larr;
            </span>
            Back to the show
          </Link>

          <Link
            href="/"
            aria-label="Static Rebellion"
            className="desktop-only"
            style={{ position: "relative", width: 120, height: 40 }}
          >
            <Image
              src={IMG.sr}
              alt="Static Rebellion"
              fill
              sizes="120px"
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          <a
            href={TICKETS}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
            style={{
              background: C.red,
              color: C.cream,
              padding: "12px 22px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Get Tickets
          </a>
        </div>
      </header>

      {/* ---------------- MASTHEAD ---------------- */}
      <section
        style={{
          padding: "56px 0 44px",
          borderBottom: `1px solid ${C.line}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 620,
            height: 620,
            background:
              "radial-gradient(circle, rgba(200,60,40,0.16) 0%, rgba(200,60,40,0) 68%)",
            pointerEvents: "none",
          }}
        />
        <div className="wrap" style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.red,
            }}
          >
            One day. One stage. One mission.
          </div>

          <h1
            style={{
              fontFamily: display,
              fontSize: "clamp(44px, 9vw, 104px)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              marginTop: 18,
              color: C.cream,
            }}
          >
            Sponsorship
            <br />
            <span style={{ color: C.red }}>Commitment</span>
          </h1>

          <p
            style={{
              marginTop: 20,
              fontSize: 15,
              lineHeight: 1.7,
              color: C.sand,
              letterSpacing: "0.02em",
            }}
          >
            Rock for a Cause by Static Rebellion, in partnership with School of
            Rock Miami
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              marginTop: 18,
              flexWrap: "wrap",
              fontFamily: display,
              fontSize: "clamp(18px, 3vw, 26px)",
              textTransform: "uppercase",
              color: C.cream,
            }}
          >
            <span>Sunday, October 18, 2026</span>
            <Star size={12} />
            <span>2:00 to 6:00 PM</span>
            <Star size={12} />
            <span>Doors 1:30 PM</span>
          </div>

          <div
            style={{
              marginTop: 30,
              border: `1px solid ${C.red}`,
              padding: "18px 22px",
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.7,
              color: C.cream,
            }}
          >
            100% of net proceeds from sponsorships is split equally between the
            Boys &amp; Girls Club of Broward County and JAFCO. Both are
            registered 501(c)(3) nonprofits, and each sends your tax receipt
            directly.
          </div>
        </div>
      </section>

      {status === "sent" ? (
        /* ---------------- SUCCESS ---------------- */
        <section style={{ padding: "90px 0 120px" }}>
          <div className="wrap">
            <div
              style={{
                border: `1px solid ${C.line}`,
                borderLeft: `3px solid ${C.red}`,
                padding: "48px 36px",
                maxWidth: 760,
              }}
            >
              <h2
                style={{
                  fontFamily: display,
                  fontSize: "clamp(30px, 5vw, 52px)",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  color: C.cream,
                }}
              >
                Thank you. We got it.
              </h2>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                We will confirm your level within two business days.
                {logo
                  ? ` Your logo file, ${logo.filename}, came through with the form.`
                  : " We did not get a logo with this form. Reply to our confirmation email with your artwork and we will take it from there."}
              </p>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                Questions in the meantime, write to {SPONSOR_EMAIL}.
              </p>
              <Link
                href="/"
                className="btn-red"
                style={{
                  display: "inline-block",
                  marginTop: 32,
                  background: C.red,
                  color: C.cream,
                  padding: "16px 38px",
                  fontFamily: display,
                  fontSize: 18,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                }}
              >
                Back to the show
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ---------------- 01 PICK YOUR LEVEL ---------------- */}
          <section style={{ padding: "72px 0 0" }}>
            <div className="wrap">
              <StepHead
                n="01"
                title="Pick your level"
                note="Tap a level to select it. Every level above Silver includes everything below it."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 18,
                }}
              >
                {LEVELS.map((t) => {
                  const active = level === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setLevel(t.id)}
                      aria-pressed={active}
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                        border: active
                          ? `2px solid ${t.palette.edge}`
                          : `1px solid ${t.palette.edge}55`,
                        background: `linear-gradient(180deg, ${t.palette.glow} 0%, rgba(0,0,0,0) 62%), ${C.ink2}`,
                        padding: active ? "27px 25px 31px" : "28px 26px 32px",
                        display: "flex",
                        flexDirection: "column",
                        font: "inherit",
                        color: C.cream,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          justifyContent: "center",
                        }}
                      >
                        <Star size={20} color={t.palette.edge} />
                        <span
                          style={{
                            fontFamily: display,
                            fontSize: 30,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: t.palette.text,
                            lineHeight: 1,
                          }}
                        >
                          {t.name}
                        </span>
                      </div>

                      <div
                        style={{
                          fontFamily: display,
                          fontSize: 40,
                          textAlign: "center",
                          color: C.cream,
                          marginTop: 8,
                          lineHeight: 1,
                        }}
                      >
                        {t.price}
                      </div>

                      <div
                        style={{
                          marginTop: 12,
                          textAlign: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: t.palette.text,
                        }}
                      >
                        {t.tickets}
                      </div>

                      <div
                        style={{
                          height: 1,
                          background: `${t.palette.edge}44`,
                          margin: "20px 0 16px",
                        }}
                      />

                      {t.lead ? (
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: t.palette.text,
                            marginBottom: 12,
                          }}
                        >
                          {t.lead}
                        </div>
                      ) : null}

                      <ul style={{ listStyle: "none", flexGrow: 1 }}>
                        {t.perks.map((perk) => (
                          <li
                            key={perk}
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "flex-start",
                              padding: "7px 0",
                              fontSize: 14.5,
                              lineHeight: 1.5,
                              color: C.muted,
                            }}
                          >
                            <span style={{ marginTop: 3 }}>
                              <Star size={10} color={t.palette.edge} />
                            </span>
                            {perk}
                          </li>
                        ))}
                      </ul>

                      <div
                        style={{
                          marginTop: 22,
                          textAlign: "center",
                          padding: "12px 14px",
                          border: `1px solid ${
                            active ? "transparent" : `${t.palette.edge}66`
                          }`,
                          background: active ? C.red : "transparent",
                          fontFamily: display,
                          fontSize: 16,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          color: C.cream,
                        }}
                      >
                        {active ? "Selected" : "Select"}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: 20, fontSize: 14, color: C.muted }}>
                Want to give a different amount or donate goods and services?
                Write to {SPONSOR_EMAIL} and we will build something that works.
              </div>
            </div>
          </section>

          {/* ---------------- 02 SPONSOR DETAILS ---------------- */}
          <section style={{ padding: "72px 0 0" }}>
            <div className="wrap">
              <StepHead n="02" title="Sponsor details" />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 20,
                }}
              >
                <Field
                  id="sp-company"
                  label="Company or organization"
                  required
                  value={form.company}
                  onChange={(v) => set("company", v)}
                  placeholder="Business name"
                />
                <Field
                  id="sp-signage"
                  label="Name to show on signage"
                  value={form.signageName}
                  onChange={(v) => set("signageName", v)}
                  placeholder="Leave blank to use the name above"
                />
                <Field
                  id="sp-contact"
                  label="Contact name"
                  required
                  value={form.contactName}
                  onChange={(v) => set("contactName", v)}
                  placeholder="Full name"
                />
                <Field
                  id="sp-title"
                  label="Title"
                  value={form.title}
                  onChange={(v) => set("title", v)}
                  placeholder="Owner, manager, and so on"
                />
                <Field
                  id="sp-email"
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  placeholder="you@company.com"
                />
                <Field
                  id="sp-phone"
                  label="Phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  placeholder="(954) 555-0100"
                />
                <Field
                  id="sp-website"
                  label="Website"
                  value={form.website}
                  onChange={(v) => set("website", v)}
                  placeholder="yourcompany.com"
                />
                <Field
                  id="sp-street"
                  label="Street address"
                  required
                  value={form.street}
                  onChange={(v) => set("street", v)}
                  placeholder="Street and suite"
                />
                <Field
                  id="sp-city"
                  label="City"
                  required
                  value={form.city}
                  onChange={(v) => set("city", v)}
                  placeholder="City"
                />
                <Field
                  id="sp-state"
                  label="State"
                  required
                  value={form.state}
                  onChange={(v) => set("state", v)}
                  placeholder="FL"
                />
                <Field
                  id="sp-zip"
                  label="ZIP"
                  required
                  value={form.zip}
                  onChange={(v) => set("zip", v)}
                  placeholder="33324"
                />
              </div>
            </div>
          </section>

          {/* ---------------- 03 SEND YOUR LOGO ---------------- */}
          <section style={{ padding: "72px 0 0" }}>
            <div className="wrap">
              <StepHead n="03" title="Send your logo" />

              <div
                style={{
                  border: `1px dashed ${logo ? C.red : C.line}`,
                  padding: "34px 28px",
                  textAlign: "center",
                  background: C.ink2,
                }}
              >
                <input
                  ref={fileRef}
                  id="sp-logo"
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps,.zip,image/*"
                  style={{ display: "none" }}
                  onChange={(e) => pickLogo(e.target.files?.[0])}
                />

                {logo ? (
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        fontFamily: display,
                        fontSize: "clamp(19px, 3vw, 26px)",
                        textTransform: "uppercase",
                        color: C.cream,
                        lineHeight: 1.2,
                        wordBreak: "break-all",
                      }}
                    >
                      <Bolt size={12} />
                      {logo.filename}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 13, color: C.muted }}>
                      {(logo.size / 1024).toFixed(0)} KB, attached to your
                      submission
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        justifyContent: "center",
                        marginTop: 20,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="btn-ghost"
                        style={{
                          border: `1px solid ${C.cream}`,
                          background: "transparent",
                          color: C.cream,
                          padding: "12px 26px",
                          fontFamily: display,
                          fontSize: 15,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        Replace File
                      </button>
                      <button
                        onClick={() => {
                          setLogo(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        style={{
                          border: `1px solid ${C.line}`,
                          background: "transparent",
                          color: C.muted,
                          padding: "12px 26px",
                          fontFamily: display,
                          fontSize: 15,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        fontFamily: display,
                        fontSize: "clamp(22px, 3.4vw, 32px)",
                        textTransform: "uppercase",
                        color: C.cream,
                        lineHeight: 1.15,
                      }}
                    >
                      Upload your logo
                    </div>
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: C.muted,
                        maxWidth: 480,
                        margin: "12px auto 0",
                      }}
                    >
                      Vector files (.ai, .eps, .svg) or a transparent PNG at
                      2000px or wider reproduce best on banners. Up to 3MB.
                    </p>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="btn-red"
                      style={{
                        marginTop: 22,
                        background: C.red,
                        color: C.cream,
                        border: "none",
                        padding: "15px 38px",
                        fontFamily: display,
                        fontSize: 17,
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      Choose File
                    </button>
                  </div>
                )}

                {logoError ? (
                  <p
                    style={{
                      marginTop: 18,
                      fontSize: 14,
                      color: C.redHi,
                      lineHeight: 1.6,
                    }}
                  >
                    {logoError}
                  </p>
                ) : null}
              </div>

              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: C.muted,
                }}
              >
                Send artwork early. Late files may miss the print deadline for
                signage. If your file is too large to upload here, submit the
                form anyway and reply to our confirmation email with the artwork
                attached.
              </p>

              <div style={{ marginTop: 30 }}>
                <label style={labelStyle} htmlFor="sp-announcer">
                  Anything the announcer should know? Pronunciation, tagline,
                  booth needs
                </label>
                <textarea
                  id="sp-announcer"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  value={form.announcer}
                  onChange={(e) => set("announcer", e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>
          </section>

          {/* ---------------- 04 HOW YOU WILL PAY ---------------- */}
          <section style={{ padding: "72px 0 0" }}>
            <div className="wrap">
              <StepHead
                n="04"
                title="How you will pay"
                note="Your total donation is split 50/50 between the Boys and Girls Club of Broward County and JAFCO. Each nonprofit sends its own receipt for its half."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 18,
                }}
              >
                {[
                  {
                    id: "Check",
                    title: "Check",
                    blurb:
                      "Two separate checks, each for half your sponsorship. Details appear once you pick this.",
                  },
                  {
                    id: "Credit card by phone",
                    title: "Credit card",
                    blurb:
                      "We call you and take the card over the phone. Details appear once you pick this.",
                  },
                ].map((opt) => {
                  const active = pay === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setPay(opt.id)}
                      aria-pressed={active}
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                        font: "inherit",
                        color: C.cream,
                        background: active ? C.ink2 : "transparent",
                        border: active
                          ? `2px solid ${C.red}`
                          : `1px solid ${C.line}`,
                        padding: active ? "25px 25px" : "26px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <Bolt size={12} color={active ? C.red : C.muted} />
                        <span
                          style={{
                            fontFamily: display,
                            fontSize: 26,
                            textTransform: "uppercase",
                            lineHeight: 1,
                          }}
                        >
                          {opt.title}
                        </span>
                      </div>
                      <p
                        style={{
                          marginTop: 14,
                          fontSize: 15,
                          lineHeight: 1.65,
                          color: C.muted,
                        }}
                      >
                        {opt.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>

              {pay === "Check" ? (
                <div
                  style={{
                    marginTop: 22,
                    border: `1px solid ${C.line}`,
                    borderLeft: `3px solid ${C.red}`,
                    padding: "26px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: C.red,
                      marginBottom: 16,
                    }}
                  >
                    Paying by check
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: C.muted }}>
                    Write two separate checks, each for half your sponsorship.
                    One payable to Boys &amp; Girls Club of Broward County, one
                    payable to JAFCO. Mail both to:
                  </p>
                  <p
                    style={{
                      marginTop: 14,
                      fontFamily: display,
                      fontSize: "clamp(18px, 2.6vw, 24px)",
                      textTransform: "uppercase",
                      color: C.cream,
                      lineHeight: 1.3,
                    }}
                  >
                    {CHECK_ADDRESS}
                  </p>
                  <p
                    style={{
                      marginTop: 14,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: C.muted,
                    }}
                  >
                    Checks must clear before the print deadline for your logo to
                    make signage.
                  </p>
                </div>
              ) : null}

              {pay === "Credit card by phone" ? (
                <div
                  style={{
                    marginTop: 22,
                    border: `1px solid ${C.line}`,
                    borderLeft: `3px solid ${C.red}`,
                    padding: "26px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: C.red,
                      marginBottom: 16,
                    }}
                  >
                    Paying by card
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: C.muted }}>
                    Submit this form and we will call the number you gave to
                    arrange the card payment, then split the donation 50/50.
                  </p>
                  <p
                    style={{
                      marginTop: 14,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: C.muted,
                    }}
                  >
                    For your own protection, never type a card number into this
                    form or send one by email. We will never ask you to.
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          {/* ---------------- 05 CONFIRM ---------------- */}
          <section style={{ padding: "72px 0 110px" }}>
            <div className="wrap">
              <StepHead n="05" title="Confirm" />

              <button
                onClick={() => setAuthorized((a) => !a)}
                aria-pressed={authorized}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  font: "inherit",
                  color: C.cream,
                  background: "transparent",
                  border: `1px solid ${authorized ? C.red : C.line}`,
                  padding: "22px 24px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 22,
                    height: 22,
                    flexShrink: 0,
                    marginTop: 2,
                    border: `1px solid ${authorized ? C.red : C.muted}`,
                    background: authorized ? C.red : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    lineHeight: 1,
                    color: C.cream,
                  }}
                >
                  {authorized ? "\u2713" : ""}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.65, color: C.muted }}>
                  I am authorized to commit this sponsorship on behalf of the
                  company named above, and I grant permission to use the
                  submitted logo in event materials.
                </span>
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 20,
                  marginTop: 24,
                }}
              >
                <Field
                  id="sp-signature"
                  label="Print your name"
                  required
                  value={form.signature}
                  onChange={(v) => set("signature", v)}
                  placeholder="Typed name acts as your signature"
                />
                <div>
                  <label style={labelStyle} htmlFor="sp-date">
                    Date
                  </label>
                  <input
                    id="sp-date"
                    style={{ ...inputStyle, color: C.muted }}
                    value={today}
                    readOnly
                  />
                </div>
              </div>

              {status === "error" ? (
                <p style={{ marginTop: 20, fontSize: 15, color: C.redHi }}>
                  {error}
                </p>
              ) : null}

              <button
                onClick={submit}
                disabled={status === "sending"}
                className="btn-red"
                style={{
                  marginTop: 30,
                  width: "100%",
                  maxWidth: 460,
                  background: C.red,
                  color: C.cream,
                  border: "none",
                  padding: "22px 46px",
                  fontFamily: display,
                  fontSize: "clamp(20px, 3.4vw, 28px)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: status === "sending" ? "default" : "pointer",
                  opacity: status === "sending" ? 0.65 : 1,
                }}
              >
                {status === "sending" ? "Sending..." : "Submit Commitment"}
              </button>

              <p
                style={{
                  marginTop: 20,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: C.muted,
                  maxWidth: 620,
                }}
              >
                We confirm your level within two business days. Questions before
                you send it: {SPONSOR_EMAIL}.
              </p>
            </div>
          </section>
        </>
      )}

      {/* ---------------- FOOTER ---------------- */}
      <footer
        style={{ borderTop: `1px solid ${C.line}`, padding: "40px 0 44px" }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.muted,
          }}
        >
          <Link href="/" className="social-link" style={{ color: C.cream }}>
            Back to the show
          </Link>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
          >
            Live Music <Bolt size={8} /> Big Impact <Bolt size={8} /> Brighter
            Futures
          </span>
        </div>
      </footer>
    </main>
  );
}