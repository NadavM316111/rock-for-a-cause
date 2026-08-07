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
  ["The Band", "#band"],
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

const DOORS = new Date("2026-10-18T13:30:00-04:00").getTime();

/* Asset filenames, matching what is in /public */
const IMG = {
  band: "/band.jpeg",
  sr: "/logo-sr.jpg",
  bgc: "/logo-bgc.jpeg",
  sor: "/logo-sor.jpg",
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

const display = "var(--font-display), Impact, sans-serif";

/* ------------------------------------------------------------------ */

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
      "Support two incredible organizations",
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
      "Premium front row seating",
      "Meet and greet with the band",
      "Signed commemorative concert poster",
      "Photo with the band",
      "Recognition on this site and in the event program",
    ],
  },
];

const FACTS = [
  { label: "Date", value: "Sun, Oct 18", sub: "2026" },
  { label: "Music", value: "2:00 to 6:00", sub: "Doors at 1:30 PM" },
  { label: "Venue", value: "471 NW 3rd St", sub: "Miami, Florida" },
  { label: "Ages", value: "All Ages", sub: "Everyone welcome" },
];

/* ------------------------------------------------------------------ */

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

          <nav className="desktop-only" style={{ gap: 28, alignItems: "center" }}>
            {NAV.map(([label, href]) => (
              <a
              
                key={href}
                href={href}
                className="navlink"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.cream,
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
                one afternoon, and every ticket goes to work for kids in Broward
                County. Loud room, good reason.
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

          <div className="split">
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
                  src="/logo-bgc.jpeg"
                  alt="Boys & Girls Clubs of Broward County"
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
                Boys &amp; Girls Clubs of Broward County
              </h3>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                After the last bell rings, thousands of kids in Broward County
                have nowhere to be. The Boys &amp; Girls Clubs give them
                somewhere: homework help, hot meals, mentors who learn their
                names, and programs in art, sports, and music that most families
                could not otherwise afford.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                We are a band that got to learn instruments because someone made
                room for us to. This show is about making that room for somebody
                else.
              </p>

              <div
                style={{
                  marginTop: 30,
                  borderLeft: `3px solid ${C.red}`,
                  paddingLeft: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: display,
                    fontSize: 21,
                    lineHeight: 1.24,
                    textTransform: "uppercase",
                    color: C.cream,
                  }}
                >
                  Kids playing music, so other kids get a shot at it.
                </p>
              </div>
            </div>
          </div>

          {/* Partners */}
          <div style={{ marginTop: 76 }}>
            <Eyebrow>A joint effort between</Eyebrow>
            <div className="partner-row" style={{ marginTop: 24 }}>
              {[
                { src: "/logo-sr.jpg", alt: "Static Rebellion", dark: true },
                { src: "/logo-sor.jpg", alt: "School of Rock Miami", dark: false },
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
            All ticketing is handled through Eventbrite. Proceeds benefit the
            Boys &amp; Girls Clubs of Broward County.
          </p>
        </div>
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
                South Florida rock built on the stuff that came out of the
                eighties and nineties: real guitars, real drums, choruses meant
                to be shouted back. We write our own songs and we play them
                loud.
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
            </div>
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
                q: "Is this really all ages?",
                a: "Yes. Bring your family, bring your grandmother, bring the kid who just started guitar lessons.",
              },
              {
                q: "Where is it?",
                a: "471 NW 3rd Street, Miami, Florida. Tap the address in the footer for directions.",
              },
              {
                q: "How do I sponsor or donate more?",
                a: "Email booking@staticrebellion.com and we will connect you with the right people.",
              },
            ].map((item, i) => (
              <div
                key={item.q}
                style={{
                  padding: 32,
                  borderRight: i % 2 === 0 ? `1px solid ${C.line}` : "none",
                  borderBottom: i < 2 ? `1px solid ${C.line}` : "none",
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
                  src="/logo-sr.jpg"
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
                of Broward County.
              </p>
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
                  <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ color: C.cream, borderBottom: `1px solid ${C.line}` }}
                >
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
                <a
                
                  href="https://instagram.com/staticrebellion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ color: C.muted }}
                >
                  Instagram @staticrebellion
                </a>
                <a
                  href="https://tiktok.com/@static.rebellion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ color: C.muted }}
                >
                  TikTok @static.rebellion
                </a>

                <a
                  href="mailto:booking@staticrebellion.com"
                  className="social-link"
                  style={{ color: C.muted }}
                >
                  booking@staticrebellion.com
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