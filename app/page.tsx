"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TICKETS =
  "https://www.eventbrite.com/e/static-rebellion-rock-for-a-cause-in-partnership-with-school-of-rock-tickets-1997094540531?aff=oddtdtcreator";

const NAV: [string, string][] = [
  ["The Show", "#show"],
  ["Listen", "#music"],
  ["The Cause", "#cause"],
  ["Tickets", "#tickets"],
  ["Sponsors", "#sponsors"],
  ["The Band", "#band"],
  ["Parking", "#parking"],
];

const SONGS = [
  {
    title: "Run, Run, Run!",
    spotifyId: "7DlAZYhOxGWWFRHIhxu59P",
    apple: "https://music.apple.com/us/album/run-run-run/1881573769?i=1881573770",
  },
  {
    title: "One Shot",
    spotifyId: "29WpbMNslGsCCzzdWI1KT6",
    apple: "https://music.apple.com/us/album/one-shot/6779890913?i=6779890914",
  },
];
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=471+NW+3rd+St+Miami+FL";

const SOR_SITE = "https://www.schoolofrock.com/locations/miami";

const SOR_SOCIALS = [
  { label: "@schoolofrockmiami", href: "https://instagram.com/schoolofrockmiami" },
  { label: "@schoolofrockdoral", href: "https://instagram.com/schoolofrockdoral" },
  {
    label: "@schoolofrockcoconutgrove",
    href: "https://instagram.com/schoolofrockcoconutgrove",
  },
];

const DOORS = new Date("2026-10-18T13:30:00-04:00").getTime();

/* Asset filenames, matching what is in /public */
const IMG = {
  band: "/band.jpeg",
  sr: "/logo-sr.jpg",
  bgc: "/logo-bgc.jpeg",
  sor: "/logo-sor.jpg",
  jafco: "/logo-jafco.png",
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

/* Metal palette for the sponsor wall and the tier bars */
const M = {
  silver: { edge: "#B9BEC4", text: "#D8DDE2", glow: "rgba(185,190,196,0.16)" },
  gold: { edge: "#D4AF37", text: "#EBC85B", glow: "rgba(212,175,55,0.16)" },
  platinum: { edge: "#CFD8DF", text: "#E8EFF4", glow: "rgba(207,216,223,0.18)" },
  diamond: { edge: "#4FA3D9", text: "#8FD0F5", glow: "rgba(79,163,217,0.20)" },
};

const display = "var(--font-display), Impact, sans-serif";

/* ------------------------------------------------------------------ */

type IconProps = {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
};

function Bolt({
  size = 14,
  color = C.red,
  style,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 10 16"
      fill="none"
      aria-hidden={ariaHidden}
      style={{ flexShrink: 0, ...style }}
    >
      <path d="M6.2 0L0 9.1h3.4L2.9 16 10 6.4H6.3L6.2 0z" fill={color} />
    </svg>
  );
}

function Star({
  size = 14,
  color = C.red,
  style,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden={ariaHidden}
      style={{ flexShrink: 0, ...style }}
    >
      <path
        d="M8 0l2.1 5.3L16 5.9l-4.3 3.8 1.3 5.8L8 12.4 3 15.5l1.3-5.8L0 5.9l5.9-.6L8 0z"
        fill={color}
      />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: C.red,
      }}
    >
      <span style={{ width: 26, height: 2, background: C.red }} />
      {children}
    </div>
  );
}

function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, DOORS - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units =
    left === null
      ? [
          ["--", "Days"],
          ["--", "Hours"],
          ["--", "Min"],
          ["--", "Sec"],
        ]
      : [
          [String(Math.floor(left / 86400000)), "Days"],
          [String(Math.floor(left / 3600000) % 24).padStart(2, "0"), "Hours"],
          [String(Math.floor(left / 60000) % 60).padStart(2, "0"), "Min"],
          [String(Math.floor(left / 1000) % 60).padStart(2, "0"), "Sec"],
        ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        border: `1px solid ${C.line}`,
        marginTop: 36,
        maxWidth: 420,
      }}
    >
      {units.map(([value, label], i) => (
        <div
          key={label}
          style={{
            padding: "14px 8px",
            textAlign: "center",
            borderRight: i < 3 ? `1px solid ${C.line}` : "none",
          }}
        >
          <div
            style={{
              fontFamily: display,
              fontSize: 30,
              lineHeight: 1,
              color: C.cream,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.muted,
              fontWeight: 600,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Marquee() {
  const items = [
    "Live Music",
    "Big Impact",
    "Brighter Futures",
    "All Ages Welcome",
    "Sunday October 18",
  ];
  const run = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        background: C.red,
        borderTop: `1px solid ${C.ink}`,
        borderBottom: `1px solid ${C.ink}`,
        overflow: "hidden",
        padding: "13px 0",
      }}
    >
      <div className="marquee-track">
        {run.map((text, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 22,
              paddingRight: 22,
              fontFamily: display,
              fontSize: 17,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.cream,
              whiteSpace: "nowrap",
            }}
          >
            {text}
            <Bolt size={9} color={C.ink} />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
}: {
  kicker: string;
  title: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 44 }}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2
        style={{
          fontFamily: display,
          fontSize: "clamp(38px, 6vw, 68px)",
          lineHeight: 0.92,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          marginTop: 16,
          color: C.cream,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const TIERS = [
  {
    name: "General Admission",
    price: "25",
    accent: false,
    tag: null as string | null,
    perks: [
      "Admission to the concert",
      "Access to all performances",
      "Support incredible organizations",
    ],
  },
  {
    name: "VIP Meet & Greet",
    price: "50",
    accent: false,
    tag: null as string | null,
    perks: [
      "Everything in General Admission",
      "Meet and greet with Static Rebellion",
      "Signed commemorative concert poster",
      "Photo with the band",
      "Early entry at 1:00 PM",
    ],
  },
  {
    name: "Rock Star Sponsor",
    price: "100",
    accent: true,
    tag: "Best Seats",
    perks: [
      "Premium VIP seating",
      "Meet and greet with the band",
      "Signed commemorative concert poster",
      "Photo with the band",
      "Recognition on this site and receive free event t-shirt",
    ],
  },
];

const FACTS = [
  { label: "Date", value: "Sun, Oct 18", sub: "2026" },
  { label: "Music", value: "2:00 to 6:00", sub: "Doors at 1:30 PM" },
  { label: "Venue", value: "471 NW 3rd St", sub: "Miami, Florida" },
  { label: "Ages", value: "All Ages", sub: "Everyone welcome" },
];

const BENEFICIARIES = [
  {
    name: "Boys & Girls Club of Broward County",
    logo: IMG.bgc,
    alt: "Boys & Girls Club of Broward County",
    site: "https://bgcbc.org",
    siteLabel: "bgcbc.org",
    body: [
      "After the last bell rings, thousands of kids in South Florida have nowhere to be. The Boys & Girls Club provides: homework help, hot meals, one on one mentorship, and programs in art, sports, and music that most families could not otherwise afford.",
      "We are a band that got to learn instruments because someone made room for us to. This show is about making that room for somebody else.",
    ],
  },
  {
    name: "JAFCO",
    logo: IMG.jafco,
    alt: "JAFCO",
    site: "https://jafco.org",
    siteLabel: "jafco.org",
    body: [
      "JAFCO is there for South Florida children impacted by abuse, neglect, and trauma, and for children with developmental disabilities. Emergency shelter, group homes, foster care, therapy, and support for the whole family, on one campus in Broward County.",
      "Kids walk in on the worst day of their lives and find people whose only job is to take care of them. Your ticket helps keep that going.",
    ],
  },
];

/* ------------------ SPONSOR WALL + SPONSOR TIERS ------------------ */

const SPONSOR_WALL: {
  tier: "Diamond" | "Platinum" | "Gold" | "Silver";
  count: number;
  height: number;
  columns: string;
  palette: { edge: string; text: string; glow: string };
}[] = [
  {
    tier: "Diamond",
    count: 1,
    height: 220,
    columns: "repeat(auto-fit, minmax(280px, 1fr))",
    palette: M.diamond,
  },
  {
    tier: "Platinum",
    count: 2,
    height: 180,
    columns: "repeat(auto-fit, minmax(260px, 1fr))",
    palette: M.platinum,
  },
  {
    tier: "Gold",
    count: 3,
    height: 150,
    columns: "repeat(auto-fit, minmax(210px, 1fr))",
    palette: M.gold,
  },
  {
    tier: "Silver",
    count: 6,
    height: 118,
    columns: "repeat(auto-fit, minmax(150px, 1fr))",
    palette: M.silver,
  },
];

const SPONSOR_TIERS = [
  {
    name: "Silver",
    price: "$1,000",
    palette: M.silver,
    lead: null as string | null,
    perks: [
      "Company logo on the event website",
      "Recognition on social media",
      "Name listed on sponsor signage at the event",
      "Two VIP tickets",
    ],
  },
  {
    name: "Gold",
    price: "$5,000",
    palette: M.gold,
    lead: "Everything in Silver, plus:",
    perks: [
      "Medium-sized logo on event marketing materials",
      "Recognition during the live event",
      "Logo featured on the event website with a direct link",
      "Six VIP tickets",
      "Meet and greet with the band",
    ],
  },
  {
    name: "Platinum",
    price: "$10,000",
    palette: M.platinum,
    lead: "Everything in Gold, plus:",
    perks: [
      "Premium logo placement on event signage",
      "Recognition from the stage during performances",
      "Featured social media spotlight before the event",
      "Opportunity to display promotional materials at the venue",
      "Ten VIP tickets",
      "Photo with Static Rebellion",
    ],
  },
  {
    name: "Diamond",
    price: "$20,000",
    palette: M.diamond,
    lead: "Everything in Platinum, plus:",
    perks: [
      "Premier logo placement on all event materials",
      "Featured recognition as Presenting Sponsor",
      "On-stage acknowledgment during the event",
      "A representative from your business addresses the audience live on stage for a few minutes",
      "Presentation of a plaque by Static Rebellion recognizing your community alliance",
      "Dedicated sponsor spotlight on the event website",
      "Premium booth or display space, if desired",
      "Fifteen VIP tickets",
      "Private meet and greet with the band",
      "Complimentary event t-shirts for your guests",
    ],
  },
];

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

function SponsorForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    tier: "Not sure yet",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      setError("Please add your name and email so we can reach you.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending that. Please try again in a moment."
      );
    }
  };

  if (status === "sent") {
    return (
      <div
        style={{
          border: `1px solid ${C.line}`,
          borderLeft: `3px solid ${C.red}`,
          padding: "44px 34px",
        }}
      >
        <h3
          style={{
            fontFamily: display,
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1.04,
            textTransform: "uppercase",
            color: C.cream,
          }}
        >
          Thank you. We got it.
        </h3>
        <p
          style={{
            marginTop: 16,
            fontSize: 17,
            lineHeight: 1.7,
            color: C.muted,
            maxWidth: 520,
          }}
        >
          Someone from the Rock for a Cause team will follow up shortly to walk
          you through the sponsorship levels and get your logo on the wall.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${C.line}`,
        padding: "38px 34px",
        background: C.ink,
      }}
    >
      <Eyebrow>Become a sponsor</Eyebrow>
      <h3
        style={{
          fontFamily: display,
          fontSize: "clamp(26px, 3.6vw, 40px)",
          lineHeight: 1.04,
          textTransform: "uppercase",
          color: C.cream,
          marginTop: 16,
          marginBottom: 10,
        }}
      >
        Tell us about your business
      </h3>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: C.muted,
          maxWidth: 560,
          marginBottom: 30,
        }}
      >
        Fill this out and the Rock for a Cause team will get back to you with
        everything you need, including logo specs and deadlines.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 20,
        }}
      >
        <div>
          <label style={labelStyle} htmlFor="sp-name">
            Your Name
          </label>
          <input
            id="sp-name"
            style={inputStyle}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="sp-company">
            Company
          </label>
          <input
            id="sp-company"
            style={inputStyle}
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Business name"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="sp-email">
            Email
          </label>
          <input
            id="sp-email"
            type="email"
            style={inputStyle}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="sp-phone">
            Phone
          </label>
          <input
            id="sp-phone"
            style={inputStyle}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={labelStyle} htmlFor="sp-tier">
          Sponsorship Level
        </label>
        <select
          id="sp-tier"
          style={inputStyle}
          value={form.tier}
          onChange={(e) => set("tier", e.target.value)}
        >
          <option>Not sure yet</option>
          <option>Silver, $1,000</option>
          <option>Gold, $5,000</option>
          <option>Platinum, $10,000</option>
          <option>Diamond, $20,000</option>
          <option>Custom or in-kind donation</option>
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={labelStyle} htmlFor="sp-message">
          Anything Else
        </label>
        <textarea
          id="sp-message"
          rows={5}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Questions, ideas, or how you would like to be involved"
        />
      </div>

      {status === "error" ? (
        <p style={{ marginTop: 18, fontSize: 14, color: C.redHi }}>{error}</p>
      ) : null}

      <button
        onClick={submit}
        disabled={status === "sending"}
        className="btn-red"
        style={{
          marginTop: 28,
          background: C.red,
          color: C.cream,
          border: "none",
          padding: "18px 46px",
          fontFamily: display,
          fontSize: 19,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          cursor: status === "sending" ? "default" : "pointer",
          opacity: status === "sending" ? 0.65 : 1,
        }}
      >
        {status === "sending" ? "Sending..." : "Send It"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSponsorInfo, setShowSponsorInfo] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSponsorInfo = () => {
    setShowSponsorInfo(true);
    setTimeout(() => {
      document
        .getElementById("sponsor-levels")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
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
          background: scrolled ? "rgba(11,10,10,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
          transition: "background 0.2s ease, border-color 0.2s ease",
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
          <a
            href="#top"
            aria-label="Static Rebellion"
            style={{
              position: "relative",
              width: 132,
              height: 44,
              flexShrink: 0,
            }}
          >
            <Image
              src={IMG.sr}
              alt="Static Rebellion"
              fill
              sizes="132px"
              style={{ objectFit: "contain", objectPosition: "left center" }}
              priority
            />
          </a>

          <nav className="desktop-only" style={{ gap: 18, alignItems: "center" }}>
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="navlink"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.cream,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
            }}
          >
            <a
              href={TICKETS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red hdr-cta"
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

            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="menu-panel">
          <button
            className="menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}

          <a
            href={TICKETS}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Get Tickets
          </a>
        </div>
      ) : null}

      {/* ---------------- HERO ---------------- */}
      <section
        id="top"
        style={{ padding: "40px 0 76px", position: "relative", overflow: "hidden" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 640,
            height: 640,
            background:
              "radial-gradient(circle, rgba(200,60,40,0.16) 0%, rgba(200,60,40,0) 68%)",
            pointerEvents: "none",
          }}
        />

        <div className="wrap" style={{ position: "relative" }}>
          <div className="hero-grid">
            {/* Left column */}
            <div>
              <Eyebrow>One Afternoon. One Stage. One Mission.</Eyebrow>

              <h1
                style={{
                  fontFamily: display,
                  fontSize: "clamp(62px, 12.5vw, 148px)",
                  lineHeight: 0.83,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  marginTop: 22,
                  color: C.cream,
                }}
              >
                Rock
                <br />
                For A<br />
                <span style={{ color: C.red }}>Cause</span>
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 30,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: display,
                    fontSize: "clamp(20px, 3.4vw, 28px)",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    color: C.cream,
                  }}
                >
                  Sunday, October 18, 2026
                </span>
                <Bolt size={13} />
                <span
                  style={{
                    fontFamily: display,
                    fontSize: "clamp(20px, 3.4vw, 28px)",
                    textTransform: "uppercase",
                    color: C.sand,
                  }}
                >
                  Miami
                </span>
              </div>

              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  lineHeight: 1.62,
                  color: C.muted,
                  maxWidth: 480,
                }}
              >
                Static Rebellion and School of Rock Miami are taking one stage for
                one afternoon, and every ticket goes to work for kids in South
                Florida. Loud room, good reason.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 34,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={TICKETS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red"
                  style={{
                    background: C.red,
                    color: C.cream,
                    padding: "17px 38px",
                    fontFamily: display,
                    fontSize: 18,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                  }}
                >
                  Get Tickets
                </a>

                <a
                  href="#cause"
                  className="btn-ghost"
                  style={{
                    border: `1px solid ${C.cream}`,
                    color: C.cream,
                    padding: "17px 38px",
                    fontFamily: display,
                    fontSize: 18,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                  }}
                >
                  Why It Matters
                </a>
              </div>

              <Countdown />
            </div>

            {/* Right column: photo in an offset red frame */}
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                className="hero-frame"
                style={{
                  position: "absolute",
                  top: 22,
                  right: -22,
                  bottom: -22,
                  left: 22,
                  border: `2px solid ${C.red}`,
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  background: C.ink2,
                }}
              >
                <Image
                  src="/band.jpeg"
                  alt="Static Rebellion, photographed in South Florida"
                  fill
                  sizes="(max-width: 920px) 100vw, 46vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(11,10,10,0.72) 0%, rgba(11,10,10,0) 42%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    background: C.red,
                    color: C.cream,
                    padding: "9px 18px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Static Rebellion
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ---------------- FACTS BAR ---------------- */}
      <section id="show" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="facts">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                style={{
                  padding: "34px 22px",
                  borderRight: `1px solid ${C.line}`,
                  borderBottom: `1px solid ${C.line}`,
                  borderLeft: i === 0 ? `1px solid ${C.line}` : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: C.red,
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{
                    fontFamily: display,
                    fontSize: "clamp(21px, 2.6vw, 28px)",
                    textTransform: "uppercase",
                    marginTop: 12,
                    color: C.cream,
                    lineHeight: 1.02,
                  }}
                >
                  {f.value}
                </div>
                <div style={{ marginTop: 7, fontSize: 13, color: C.muted }}>
                  {f.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LISTEN ---------------- */}
      <section
        id="music"
        style={{
          padding: "96px 0",
          background: C.ink2,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div className="wrap">
          <SectionTitle
            kicker="Hear us first"
            title={
              <>
                Our
                <br />
                <span style={{ color: C.red }}>originals</span>
              </>
            }
          />

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: C.muted,
              maxWidth: 540,
              marginTop: -24,
              marginBottom: 34,
            }}
          >
            Two of ours, streaming now. Hit play and decide for yourself whether
            you want to hear them at full volume in October.
          </p>

          <div className="embed-row">
            {SONGS.map((s) => (
              <div key={s.title}>
                <iframe
                  src={`https://open.spotify.com/embed/track/${s.spotifyId}?utm_source=generator&theme=0`}
                  height={152}
                  loading="lazy"
                  title={`${s.title} on Spotify`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
                <a
                  href={s.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.cream,
                    borderBottom: `1px solid ${C.red}`,
                    paddingBottom: 3,
                  }}
                >
                  {s.title} on Apple Music
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- THE CAUSE ---------------- */}
      <section id="cause" style={{ padding: "96px 0" }}>
        <div className="wrap">
          <SectionTitle
            kicker="Where the money goes"
            title={
              <>
                Every ticket
                <br />
                <span style={{ color: C.red }}>does something</span>
              </>
            }
          />

          {BENEFICIARIES.map((b, i) => (
            <div
              key={b.name}
              className="split"
              style={{ marginTop: i === 0 ? 0 : 72 }}
            >
              <div
                style={{
                  background: C.cream,
                  padding: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: 170 }}>
                  <Image
                    src={b.logo}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 900px) 90vw, 300px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: display,
                    fontSize: "clamp(26px, 3.6vw, 38px)",
                    lineHeight: 1.04,
                    textTransform: "uppercase",
                    color: C.cream,
                  }}
                >
                  {b.name}
                </h3>

                <a
                  href={b.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    display: "inline-block",
                    marginTop: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.cream,
                    borderBottom: `1px solid ${C.red}`,
                    paddingBottom: 3,
                  }}
                >
                  {b.siteLabel}
                </a>

                {b.body.map((para, j) => (
                  <p
                    key={j}
                    style={{
                      marginTop: j === 0 ? 22 : 18,
                      fontSize: 17,
                      lineHeight: 1.72,
                      color: C.muted,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: 56,
              borderLeft: `3px solid ${C.red}`,
              paddingLeft: 20,
            }}
          >
            <p
              style={{
                fontFamily: display,
                fontSize: "clamp(21px, 2.8vw, 30px)",
                lineHeight: 1.24,
                textTransform: "uppercase",
                color: C.cream,
                maxWidth: 620,
              }}
            >
              Kids playing music, so other kids get a shot at it.
            </p>
          </div>

          {/* Partners */}
          <div style={{ marginTop: 76 }}>
            <Eyebrow>A joint effort between</Eyebrow>
            <div className="partner-row" style={{ marginTop: 24 }}>
              {[
                { src: IMG.sr, alt: "Static Rebellion", dark: true },
                { src: IMG.sor, alt: "School of Rock Miami", dark: false },
              ].map((p) => (
                <div
                  key={p.alt}
                  style={{
                    background: p.dark ? C.ink2 : C.cream,
                    border: `1px solid ${C.line}`,
                    height: 148,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 26,
                  }}
                >
                  <div
                    style={{ position: "relative", width: "100%", height: "100%" }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 700px) 90vw, 420px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <a
              href={SOR_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={{
                display: "inline-block",
                marginTop: 18,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.cream,
                borderBottom: `1px solid ${C.red}`,
                paddingBottom: 3,
              }}
            >
              schoolofrock.com/locations/miami
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- TICKETS ---------------- */}
      <section
        id="tickets"
        style={{
          padding: "96px 0",
          background: C.ink2,
          borderTop: `1px solid ${C.line}`,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div className="wrap">
          <SectionTitle
            kicker="Tickets on sale now"
            title={
              <>
                Pick your
                <br />
                <span style={{ color: C.red }}>spot</span>
              </>
            }
          />

          <div className="tiers" style={{ border: `1px solid ${C.line}` }}>
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                className="tier"
                style={{
                  position: "relative",
                  padding: "40px 30px 34px",
                  background: t.accent ? C.red : "transparent",
                  borderRight:
                    i < TIERS.length - 1 ? `1px solid ${C.line}` : "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {t.tag ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: C.cream,
                      color: C.ink,
                      padding: "7px 15px",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.tag}
                  </div>
                ) : null}

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: t.accent ? C.cream : C.red,
                  }}
                >
                  {t.name}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 4,
                    marginTop: 18,
                  }}
                >
                  <span
                    style={{
                      fontFamily: display,
                      fontSize: 26,
                      color: t.accent ? C.cream : C.muted,
                      marginTop: 8,
                    }}
                  >
                    $
                  </span>
                  <span
                    style={{
                      fontFamily: display,
                      fontSize: 68,
                      lineHeight: 0.9,
                      color: C.cream,
                    }}
                  >
                    {t.price}
                  </span>
                </div>

                <ul style={{ listStyle: "none", marginTop: 26, flexGrow: 1 }}>
                  {t.perks.map((perk) => (
                    <li
                      key={perk}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        padding: "9px 0",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: t.accent ? "rgba(239,230,212,0.94)" : C.muted,
                        borderBottom: `1px solid ${
                          t.accent ? "rgba(239,230,212,0.18)" : C.line
                        }`,
                      }}
                    >
                      <span style={{ marginTop: 3 }}>
                        <Bolt size={8} color={t.accent ? C.cream : C.red} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href={TICKETS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={t.accent ? "btn-ghost" : "btn-red"}
                  style={{
                    marginTop: 28,
                    textAlign: "center",
                    padding: "15px 20px",
                    fontFamily: display,
                    fontSize: 16,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    background: t.accent ? "transparent" : C.red,
                    border: t.accent ? `1px solid ${C.cream}` : "none",
                    color: C.cream,
                  }}
                >
                  Select
                </a>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 22,
              fontSize: 14,
              color: C.muted,
              textAlign: "center",
            }}
          >
            Proceeds benefit the Boys &amp; Girls Club of Broward County and
            JAFCO.
          </p>
        </div>
      </section>

      {/* ---------------- SPONSORS ---------------- */}
      <section
        id="sponsors"
        style={{
          padding: "96px 0",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div className="wrap">
          <SectionTitle
            kicker="The wall"
            title={
              <>
                Our
                <br />
                <span style={{ color: C.red }}>sponsors</span>
              </>
            }
          />

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: C.muted,
              maxWidth: 560,
              marginTop: -24,
              marginBottom: 46,
            }}
          >
            These spots are open. Every business that steps up gets its logo on
            this wall, on the signage at the venue, and in front of a room full
            of families from right here in South Florida.
          </p>

          {SPONSOR_WALL.map((row) => (
            <div key={row.tier} style={{ marginBottom: 40 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <Star size={13} color={row.palette.edge} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: row.palette.text,
                  }}
                >
                  {row.tier}
                </span>
                <span
                  style={{
                    flexGrow: 1,
                    height: 1,
                    background: `linear-gradient(to right, ${row.palette.edge}55, transparent)`,
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: row.columns,
                  gap: 16,
                }}
              >
                {Array.from({ length: row.count }).map((_, i) => (
                  <div
                    key={`${row.tier}-${i}`}
                    style={{
                      height: row.height,
                      border: `1px solid ${row.palette.edge}66`,
                      background: `linear-gradient(180deg, ${row.palette.glow} 0%, rgba(0,0,0,0) 100%), ${C.ink2}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      textAlign: "center",
                      padding: 14,
                    }}
                  >
                    <Star size={row.tier === "Silver" ? 12 : 16} color={row.palette.edge} />
                    <div
                      style={{
                        fontFamily: display,
                        fontSize: row.tier === "Silver" ? 15 : 19,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: row.palette.text,
                        lineHeight: 1.1,
                      }}
                    >
                      Your Logo Here
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: C.muted,
                      }}
                    >
                      {row.tier} Spot
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!showSponsorInfo ? (
            <div style={{ marginTop: 52, textAlign: "center" }}>
              <button
                onClick={openSponsorInfo}
                className="btn-red"
                style={{
                  display: "inline-block",
                  width: "100%",
                  maxWidth: 720,
                  background: C.red,
                  color: C.cream,
                  border: "none",
                  padding: "30px 40px",
                  fontFamily: display,
                  fontSize: "clamp(24px, 4.6vw, 42px)",
                  lineHeight: 1.05,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                See How To Sponsor
              </button>
            </div>
          ) : null}
        </div>

        {/* ---- Revealed: the four levels, then the form ---- */}
        {showSponsorInfo ? (
          <div
            id="sponsor-levels"
            style={{
              marginTop: 76,
              paddingTop: 76,
              borderTop: `1px solid ${C.line}`,
              background: C.ink2,
              paddingBottom: 90,
            }}
          >
            <div className="wrap">
              <div style={{ textAlign: "center", marginBottom: 46 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <Star size={16} />
                  <h2
                    style={{
                      fontFamily: display,
                      fontSize: "clamp(34px, 6vw, 62px)",
                      lineHeight: 0.95,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      color: C.cream,
                    }}
                  >
                    Sponsorship Levels
                  </h2>
                  <Star size={16} />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 18,
                }}
              >
                {SPONSOR_TIERS.map((t) => (
                  <div
                    key={t.name}
                    style={{
                      border: `1px solid ${t.palette.edge}66`,
                      background: `linear-gradient(180deg, ${t.palette.glow} 0%, rgba(0,0,0,0) 62%), ${C.ink}`,
                      padding: "30px 26px 32px",
                      display: "flex",
                      flexDirection: "column",
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
                        height: 1,
                        background: `${t.palette.edge}44`,
                        margin: "22px 0 18px",
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
                          marginBottom: 14,
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
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 34,
                  border: `1px solid ${C.red}`,
                  padding: "24px 26px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.cream,
                    lineHeight: 1.7,
                  }}
                >
                  100% of net proceeds from sponsorships are distributed equally
                </div>
              <div
  style={{
    marginTop: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 22,
    flexWrap: "wrap",
    fontFamily: display,
    fontSize: 26,
    textTransform: "uppercase",
    color: C.cream,
  }}
>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      maxWidth: "100%",
    }}
  >
    <Bolt size={11} aria-hidden="true" style={{ flexShrink: 0 }} />
    <span>50% Boys &amp; Girls Club of Broward County</span>
  </span>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
    }}
  >
    <Bolt size={11} aria-hidden="true" style={{ flexShrink: 0 }} />
    <span>50% JAFCO</span>
  </span>
</div>
</div>

              <div style={{ marginTop: 56 }}>
                <SponsorForm />
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* ---------------- THE BAND ---------------- */}
      <section id="band" style={{ padding: "96px 0" }}>
        <div className="wrap">
          <SectionTitle
            kicker="Who is playing"
            title={
              <>
                Static
                <br />
                <span style={{ color: C.red }}>Rebellion</span>
              </>
            }
          />

          <div className="info-grid band-grid">
            <div
              style={{
                padding: "34px 34px 34px 0",
                borderTop: `1px solid ${C.line}`,
              }}
            >
              <p style={{ fontSize: 17, lineHeight: 1.72, color: C.muted }}>
                South Florida alternative rock band inspired by artists from the
                eighties and nineties: real guitars, loud drums, audience interaction.
                We write our own songs and we play them
                loud. We also cover your favorite songs spanning decades of rock and pop.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                Our originals are streaming now. Come hear them the way they are
                supposed to sound, in a room with other people.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 26 }}>
                <a
                  href="https://instagram.com/staticrebellion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.cream,
                    borderBottom: `1px solid ${C.red}`,
                    paddingBottom: 3,
                  }}
                >
                  Instagram
                </a>

                <a
                  href="https://tiktok.com/@static.rebellion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.cream,
                    borderBottom: `1px solid ${C.red}`,
                    paddingBottom: 3,
                  }}
                >
                  TikTok
                </a>
              </div>
            </div>

            <div
              style={{
                padding: "34px 0 34px 34px",
                borderTop: `1px solid ${C.line}`,
                borderLeft: `1px solid ${C.line}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.red,
                  marginBottom: 20,
                }}
              >
                Also on the bill
              </div>
              <h3
                style={{
                  fontFamily: display,
                  fontSize: "clamp(24px, 3.2vw, 34px)",
                  lineHeight: 1.06,
                  textTransform: "uppercase",
                  color: C.cream,
                }}
              >
                School of Rock Miami
              </h3>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                Student performers from School of Rock Miami are sharing the
                stage with us all afternoon. Some of them are playing their first
                real show. That alone is worth the ticket.
              </p>

              <a
                href={SOR_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.cream,
                  borderBottom: `1px solid ${C.red}`,
                  paddingBottom: 3,
                }}
              >
                schoolofrock.com/locations/miami
              </a>

              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.red,
                  marginTop: 28,
                  marginBottom: 14,
                }}
              >
                Follow School of Rock
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                {SOR_SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{
                      fontSize: 15,
                      color: C.muted,
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PARKING ---------------- */}
      <section
        id="parking"
        style={{
          padding: "84px 0",
          borderTop: `1px solid ${C.line}`,
        }}
      >
        <div className="wrap">
          <SectionTitle
            kicker="Getting there"
            title={
              <>
                Parking
                <br />
                <span style={{ color: C.red }}>is handled</span>
              </>
            }
          />

          <div
            style={{
              border: `1px solid ${C.line}`,
              padding: "38px 34px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <span style={{ marginTop: 8 }}>
                <Bolt size={14} />
              </span>
              <p
                style={{
                  fontFamily: display,
                  fontSize: "clamp(24px, 4vw, 40px)",
                  lineHeight: 1.08,
                  textTransform: "uppercase",
                  color: C.cream,
                }}
              >
                Metered and paid valet parking offered at event
              </p>
            </div>

            <p
              style={{
                marginTop: 22,
                fontSize: 17,
                lineHeight: 1.7,
                color: C.muted,
                maxWidth: 560,
              }}
            >
              Pull up to 471 NW 3rd Street and hand off the keys for paid valet,
              or park at a street meter nearby. Give yourself a few extra minutes
              if you are coming for the 1:30 PM doors.
            </p>

            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={{
                display: "inline-block",
                marginTop: 24,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.cream,
                borderBottom: `1px solid ${C.red}`,
                paddingBottom: 3,
              }}
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- KNOW BEFORE YOU GO ---------------- */}
      <section
        style={{
          padding: "84px 0",
          background: C.ink2,
          borderTop: `1px solid ${C.line}`,
        }}
      >
        <div className="wrap">
          <SectionTitle kicker="Know before you go" title="Details" />

          <div className="info-grid" style={{ border: `1px solid ${C.line}` }}>
            {[
              {
                q: "What time should I get there?",
                a: "Doors open at 1:30 PM and music starts at 2:00 PM. VIP and Rock Star Sponsor ticket holders get in at 1:00 PM.",
              },
              {
                q: "What must I bring to enter?",
                a: "The event email confirming your ticket purchase.",
              },
              {
                q: "Will there be food?",
                a: "Yes, there will be several food trucks as well as one kosher food truck. Food available for purchase.",
              },
              {
                q: "Is this really all ages?",
                a: "Yes. Bring your family, bring your grandmother, bring the kid who just started guitar lessons.",
              },
              {
                q: "Where is it?",
                a: "471 NW 3rd Street, Miami, Florida. Tap the address in the footer for directions.",
              },
              {
                q: "Where do I park?",
                a: "Metered and paid valet parking are offered at the event. See the parking section above.",
              },
              {
                q: "Who does the money help?",
                a: "The Boys & Girls Club of Broward County and JAFCO, both serving kids right here in South Florida.",
              },
              {
                q: "Can my business get involved?",
                a: "Yes. Head to the Sponsors section and tap See How To Sponsor for every level and what comes with it.",
              },
            ].map((item, i, arr) => (
              <div
                key={item.q}
                style={{
                  padding: 32,
                  borderRight: i % 2 === 0 ? `1px solid ${C.line}` : "none",
                  borderBottom:
                    i < arr.length - 2 ? `1px solid ${C.line}` : "none",
                }}
              >
                <h4
                  style={{
                    fontFamily: display,
                    fontSize: 21,
                    textTransform: "uppercase",
                    color: C.cream,
                    lineHeight: 1.18,
                  }}
                >
                  {item.q}
                </h4>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 15,
                    lineHeight: 1.68,
                    color: C.muted,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING CTA ---------------- */}
      <section style={{ padding: "104px 0", textAlign: "center" }}>
        <div className="wrap">
          <h2
            style={{
              fontFamily: display,
              fontSize: "clamp(46px, 9vw, 116px)",
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: C.cream,
            }}
          >
            Show up.
            <br />
            <span style={{ color: C.red }}>Be loud.</span>
          </h2>
          <p
            style={{
              marginTop: 24,
              fontSize: 17,
              color: C.muted,
              maxWidth: 480,
              margin: "24px auto 0",
              lineHeight: 1.62,
            }}
          >
            Sunday, October 18. Four hours of live music. One very good reason.
          </p>

          <a
            href={TICKETS}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
            style={{
              display: "inline-block",
              marginTop: 36,
              background: C.red,
              color: C.cream,
              padding: "19px 52px",
              fontFamily: display,
              fontSize: 21,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
            }}
          >
            Get Tickets
          </a>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer
        style={{ borderTop: `1px solid ${C.line}`, padding: "56px 0 40px" }}
      >
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div style={{ position: "relative", width: 150, height: 48 }}>
                <Image
                  src={IMG.sr}
                  alt="Static Rebellion"
                  fill
                  sizes="150px"
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </div>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 14,
                  lineHeight: 1.66,
                  color: C.muted,
                  maxWidth: 300,
                }}
              >
                Rock for a Cause is presented by Static Rebellion in partnership
                with School of Rock Miami, benefiting the Boys &amp; Girls Clubs
                of Broward County and JAFCO.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                <a href="https://bgcbc.org" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: 14, color: C.muted }}>
                  bgcbc.org
                </a>

                <a href="https://jafco.org" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: 14, color: C.muted }}>
                  jafco.org
                </a>

                <a href={SOR_SITE} target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: 14, color: C.muted }}>
                  schoolofrock.com/locations/miami
                </a>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.red,
                  marginBottom: 16,
                }}
              >
                The Show
              </div>
              <div style={{ fontSize: 15, lineHeight: 2, color: C.muted }}>
                <div>Sunday, October 18, 2026</div>
                <div>2:00 PM to 6:00 PM</div>
                <div>Doors at 1:30 PM</div>
                <div>Metered and paid valet parking</div>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: C.cream, borderBottom: `1px solid ${C.line}` }}>
                  471 NW 3rd St, Miami, FL
                </a>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.red,
                  marginBottom: 16,
                }}
              >
                Connect
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 15,
                }}
              >
                <a href="https://instagram.com/staticrebellion" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: C.muted }}>
                  Instagram @staticrebellion
                </a>

                <a href="https://tiktok.com/@static.rebellion" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: C.muted }}>
                  TikTok @static.rebellion
                </a>

                {SOR_SOCIALS.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: C.muted }}>
                    Instagram {s.label}
                  </a>
                ))}

                <a href="mailto:booking@staticrebellion.com" className="social-link" style={{ color: C.muted }}>
                  booking@staticrebellion.com
                </a>

                <a href="#sponsors" className="social-link" style={{ color: C.muted }}>
                  Sponsor the show
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: `1px solid ${C.line}`,
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
            <span>Static Rebellion 2026</span>
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              Live Music <Bolt size={8} /> Big Impact <Bolt size={8} /> Brighter
              Futures
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}