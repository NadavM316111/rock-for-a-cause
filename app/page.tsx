"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TICKETS =
  "https://www.eventbrite.com/e/static-rebellion-rock-for-a-cause-in-partnership-with-school-of-rock-tickets-1997094540531?aff=oddtdtcreator";

const NAV: [string, string][] = [
  ["The Show", "#show"],
  ["Listen", "#music"],
  ["The Cause", "#cause"],
  ["Tickets", "#tickets"],
  ["Sponsors", "#sponsors"],
  ["Auction", "#auction"],
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
    {
    title: "See You Walkin'",
    spotifyId: "5g0k1r6Z7y2X3n8J9v1K4L",
    apple: "https://music.apple.com/us/album/see-you-walking-there/6816581495?i=6816581496",
  },
];
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=471+NW+3rd+St+Miami+FL";

const SOR_SITE = "https://www.schoolofrock.com/locations/coconutgrove";

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

/* Metal palette for the sponsor wall */
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
const PROGRAM = [
  { time: "1:30 PM", what: "Doors open, guest check-in, silent auction opens, food trucks, VIP and sponsor reception" },
  { time: "2:00 PM", what: "Opening and welcome from the MC" },
  { time: "2:10 PM", what: "School of Rock, opening band" },
  { time: "2:50 PM", what: "JAFCO speaker" },
  { time: "2:55 PM", what: "School of Rock, second band" },
  { time: "3:35 PM", what: "Boys and Girls Club of Broward County speaker" },
  { time: "3:40 PM", what: "Sponsor and charity recognition, Diamond plaque presentation" },
  { time: "3:50 PM", what: "Static Rebellion, headlining set one" },
  { time: "4:50 PM", what: "Intermission, food and photos" },
  { time: "5:00 PM", what: "Static Rebellion, headlining set two" },
  { time: "5:50 PM", what: "Closing remarks and silent auction winners" },
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
/* ---------------------- SPONSOR WALL ---------------------- */

const SPONSOR_WALL: {
  tier: string;
  height: number;
  columns: string;
  maxWidth: number;
  palette: { edge: string; text: string; glow: string };
  logos: { src: string; alt: string }[];
}[] = [
  {
    tier: "Title Sponsor",
    height: 260,
    columns: "1fr",
    maxWidth: 760,
    palette: { edge: "#C83C28", text: "#EFE6D4", glow: "rgba(200,60,40,0.24)" },
    logos: [{ src: "/sponsor-american-heritage.png", alt: "American Heritage Schools" }],
  },
  {
    tier: "Silver",
    height: 150,
    columns: "repeat(auto-fit, minmax(200px, 1fr))",
    maxWidth: 1100,
    palette: M.silver,
    logos: [
      { src: "/sponsor-schwartzreich.png", alt: "Schwartzreich & Associates, P.A." },
      { src: "/sponsor-scottish-rite.png", alt: "Scottish Rite" },
      { src: "/sponsor-aqua-realty.png", alt: "Aqua Realty Services" },
      { src: "/sponsor-odonnell.png", alt: "The O'Donnell Law Firm" },
      { src: "/sponsor-maister-law.png", alt: "Maister Law" },
    ],
  },
];
/* ---------------------- SILENT AUCTION ---------------------- */

type Lot = {
  title: string;
  sub: string;
  img: string;
  portrait: boolean;
  bg: string;
  body: string;
  value: string;
  start: string;
  logo: string;
  logoH: number;
  courtesy: string;
};

const LOTS: Lot[] = [
  {
    title: "Patriot Guitar",
    sub: "Signed by Static Rebellion",
    img: "/auction-guitar.jpg",
    logo: "/logo-auction-sr.png",
    logoH: 120,
    courtesy: "Static Rebellion",
    portrait: false,
    bg: "#000",
    body: "An American flag guitar signed by the band and played live on stage at Rock for a Cause. Own a piece of the show.",
    value: "$300",
    start: "$150",
  },
  {
    title: "Decked-Out Golf Cart",
    sub: "MSRP $10,000",
    img: "/auction-golf-cart.jpg",
    logo: "/logo-auction-denago.png",
    logoH: 54,
    courtesy: "Denago EV",
    portrait: false,
    bg: "#000",
    body: "Ride in style with a fully decked-out golf cart, loaded with upgrades and valued at an MSRP of $10,000.",
    value: "$10,000",
    start: "$5,000",
  },
  {
    title: "Philip Stein Men\u2019s Watch",
    sub: "Two time zones, one wrist",
    img: "/auction-watch-men.jpg",
    logo: "/logo-auction-philipstein.png",
    logoH: 66,
    courtesy: "Philip Stein",
    portrait: true,
    bg: "#24140A",
    body: "A stylish, sophisticated timepiece. The perfect blend of luxury, style and wellness.",
    value: "$965",
    start: "$482.50",
  },
  {
    title: "Philip Stein Ladies\u2019 Watch",
    sub: "Rose gold on white",
    img: "/auction-watch-ladies.jpg",
    logo: "/logo-auction-philipstein.png",
    logoH: 66,
    courtesy: "Philip Stein",
    portrait: true,
    bg: "#24140A",
    body: "Elegant and timeless design. The perfect blend of luxury, style and wellness.",
    value: "$945",
    start: "$472.50",
  },
  {
    title: "Beatles Artwork",
    sub: "By Doron Viner",
    img: "/auction-beatles.jpg",
    logo: "/logo-auction-doron.png",
    logoH: 130,
    courtesy: "Doron Viner, The Art Gallery",
    portrait: true,
    bg: "#000",
    body: "Bring home a piece of music history with this striking Beatles piece by renowned artist Doron Viner. A must-have for any Beatles, music or art lover.",
    value: "$5,000",
    start: "$2,500",
  },
  {
    title: "Private Acting Class",
    sub: "With Mr. A, Acay Abraham of Abstrakt Acting",
    img: "/auction-acting.jpg",
    logo: "/logo-auction-abstrakt.png",
    logoH: 130,
    courtesy: "Abstrakt Acting",
    portrait: true,
    bg: "#070303",
    body: "Build confidence. Find your voice. Grow creativity and on-camera performance skills in a private class with Mr. A.",
    value: "$150",
    start: "$75",
  },
  {
    title: "Private Piano Lesson",
    sub: "With Michael Bendoyim",
    img: "/auction-piano.jpg",
    logo: "/logo-auction-bendoyim.png",
    logoH: 120,
    courtesy: "Bendoyim Piano Lessons",
    portrait: false,
    bg: "#000",
    body: "A one-hour private lesson with classical pianist Michael Bendoyim, a conservatory graduate who has toured Germany and performed with the South Florida Orchestra.",
    value: "$150",
    start: "$75",
  },
  {
    title: "Three Nights at The Pullman",
    sub: "Nashville, courtesy of Sun & Sea Ventures",
    img: "/auction-pullman.jpg",
    logo: "/logo-auction-sunsea.png",
    logoH: 130,
    courtesy: "Sun & Sea Ventures",
    portrait: false,
    bg: "#000",
    body: "Three nights in the heart of downtown Nashville with skyline views, an infinity-edge rooftop pool, a fitness center, a pickleball court, a 24-hour front desk and an assigned parking space.",
    value: "$6,000",
    start: "$3,000",
  },
];

const PAPER = "#EFE6D4";
const PAPER_INK = "#1C1714";
const PAPER_SOFT = "#5C5048";
const lotNo = (i: number) => String(i + 1).padStart(2, "0");

function LotImage({ i, mobile }: { i: number; mobile?: boolean }) {
  const lot = LOTS[i];
  const contain = mobile && lot.portrait;
  return (
    <div style={{ position: "absolute", inset: 0, background: lot.bg, overflow: "hidden" }}>
      <Image
        src={lot.img}
        alt={lot.title}
        fill
        sizes="(max-width: 899px) 100vw, 520px"
        style={{ objectFit: contain ? "contain" : "cover" }}
      />
      {!mobile ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0) 78%, rgba(0,0,0,0.38) 100%)",
          }}
        />
      ) : null}
    </div>
  );
}

function LotDetails({ i, mobile }: { i: number; mobile?: boolean }) {
  const lot = LOTS[i];
  return (
    <div
      style={{
        position: mobile ? "relative" : "absolute",
        inset: mobile ? undefined : 0,
        background: PAPER,
        color: PAPER_INK,
        padding: mobile ? "26px 22px 24px" : "44px 46px 38px 52px",
        display: "flex",
        flexDirection: "column",
        backgroundImage: mobile
          ? undefined
          : "linear-gradient(to right, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 9%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: display, fontSize: 22, color: C.red, textTransform: "uppercase" }}>
          Lot {lotNo(i)}
        </span>
        <span style={{ fontSize: 13, color: PAPER_SOFT }}>of {lotNo(LOTS.length - 1)}</span>
      </div>

      <h3
        style={{
          fontFamily: display,
          fontSize: mobile ? "clamp(30px, 8vw, 38px)" : 44,
          lineHeight: 0.95,
          textTransform: "uppercase",
          marginTop: 16,
          color: PAPER_INK,
        }}
      >
        {lot.title}
      </h3>

      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.red,
          lineHeight: 1.5,
        }}
      >
        {lot.sub}
      </div>

      <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.65, color: PAPER_SOFT }}>
        {lot.body}
      </p>

      {/* Donor logo, fills the open space on the page */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: mobile ? "24px 0 4px" : "20px 0",
          minHeight: mobile ? undefined : lot.logoH + 60,
        }}
      >
        <div style={{ fontSize: 12, color: PAPER_SOFT, marginBottom: 12 }}>Courtesy of</div>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 300,
            height: Math.round(lot.logoH * (mobile ? 0.8 : 1)),
          }}
        >
          <Image
            src={lot.logo}
            alt={lot.courtesy}
            fill
            sizes="300px"
            style={{ objectFit: "contain", objectPosition: "left center" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: `2px solid ${PAPER_INK}`,
          marginTop: 24,
          paddingTop: 16,
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: PAPER_SOFT }}>Value</div>
          <div style={{ fontFamily: display, fontSize: 30, lineHeight: 1, marginTop: 6, color: PAPER_INK }}>
            {lot.value}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: PAPER_SOFT }}>Starting bid</div>
          <div style={{ fontFamily: display, fontSize: 30, lineHeight: 1, marginTop: 6, color: C.red }}>
            {lot.start}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuctionBook() {
  const n = LOTS.length;
  const [cur, setCur] = useState(0);
  const [turn, setTurn] = useState<{ to: number; dir: 1 | -1 } | null>(null);
  const [wide, setWide] = useState(true); // only used for animation timing
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setWide(mq.matches);
      setReduced(rm.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flip = (dir: 1 | -1, target?: number) => {
    if (turn) return;
    const to = target ?? (cur + dir + n) % n;
    if (to === cur) return;
    if (reduced) {
      setCur(to);
      return;
    }
    setTurn({ to, dir });
    timer.current = setTimeout(() => {
      setCur(to);
      setTurn(null);
    }, wide ? 820 : 480);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") flip(1);
    if (e.key === "ArrowLeft") flip(-1);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx < -40) flip(1);
    if (dx > 40) flip(-1);
  };

  const shown = turn ? turn.to : cur;
  const leftI = turn ? (turn.dir === 1 ? cur : turn.to) : cur;
  const rightI = turn ? (turn.dir === 1 ? turn.to : cur) : cur;

  const arrowBtn: React.CSSProperties = {
    width: 52,
    height: 52,
    border: `1px solid ${C.cream}`,
    background: "transparent",
    color: C.cream,
    cursor: "pointer",
    fontFamily: display,
    fontSize: 24,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  return (
    <div>
      <style>{`
        @keyframes sr-turn-fwd { from { transform: rotateY(0deg); } to { transform: rotateY(-180deg); } }
        @keyframes sr-turn-back { from { transform: rotateY(0deg); } to { transform: rotateY(180deg); } }
        @keyframes sr-shade { 0% { opacity: 0; } 50% { opacity: 0.45; } 100% { opacity: 0; } }
        @keyframes sr-leave-fwd { from { transform: rotateY(0deg); opacity: 1; } to { transform: rotateY(-105deg); opacity: 0; } }
        @keyframes sr-leave-back { from { transform: rotateY(0deg); opacity: 1; } to { transform: rotateY(105deg); opacity: 0; } }
        .sr-thumbs::-webkit-scrollbar { display: none; }
        .sr-mob { display: none; }
        .sr-thumbs { justify-content: center; }
        @media (max-width: 899px) {
          .sr-desk { display: none; }
          .sr-mob { display: block; }
          .sr-thumbs { justify-content: flex-start; }
        }
        .sr-arrow:hover:not(:disabled) { background: ${C.cream} !important; color: ${C.ink} !important; }
      `}</style>

      <div
        role="region"
        aria-roledescription="catalog"
        aria-label="Silent auction items"
        tabIndex={0}
        onKeyDown={onKey}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ outlineOffset: 6 }}
      >
        {/* ---------- Desktop: open book, two pages ---------- */}
        <div className="sr-desk">
          <div
            style={{
              background: "#5E1B10",
              padding: "16px 18px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.4)",
              maxWidth: 1040,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                height: 580,
                perspective: 2400,
                boxShadow: "-3px 0 0 #D8CCB2, -6px 0 0 #C4B696, 3px 0 0 #D8CCB2, 6px 0 0 #C4B696",
              }}
            >
              <div style={{ position: "relative" }}>
                <LotImage i={leftI} />
              </div>
              <div style={{ position: "relative" }}>
                <LotDetails i={rightI} />
              </div>

              {/* Spine */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  width: 2,
                  background: "rgba(0,0,0,0.5)",
                  zIndex: 2,
                }}
              />

              {/* The page that turns */}
              {turn ? (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    left: turn.dir === 1 ? "50%" : 0,
                    transformOrigin: turn.dir === 1 ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                    animation: `${turn.dir === 1 ? "sr-turn-fwd" : "sr-turn-back"} 0.82s cubic-bezier(.45,.05,.3,1) forwards`,
                    zIndex: 3,
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    {turn.dir === 1 ? <LotDetails i={cur} /> : <LotImage i={cur} />}
                    <div style={{ position: "absolute", inset: 0, background: "#000", animation: "sr-shade 0.82s linear forwards", pointerEvents: "none" }} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {turn.dir === 1 ? <LotImage i={turn.to} /> : <LotDetails i={turn.to} />}
                    <div style={{ position: "absolute", inset: 0, background: "#000", animation: "sr-shade 0.82s linear forwards", pointerEvents: "none" }} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* ---------- Mobile: one page at a time ---------- */}
        <div className="sr-mob">
          <div style={{ position: "relative", perspective: 1600 }}>
            <MobilePage i={shown} />
            {turn ? (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  transformOrigin: turn.dir === 1 ? "left center" : "right center",
                  animation: `${turn.dir === 1 ? "sr-leave-fwd" : "sr-leave-back"} 0.48s cubic-bezier(.5,0,.75,0) forwards`,
                  zIndex: 3,
                }}
              >
                <MobilePage i={cur} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          marginTop: 30,
        }}
      >
        <button className="sr-arrow" style={arrowBtn} onClick={() => flip(-1)} aria-label="Previous item">
          &lsaquo;
        </button>
        <div
          aria-live="polite"
          style={{
            fontFamily: display,
            fontSize: 22,
            color: C.cream,
            minWidth: 90,
            textAlign: "center",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {lotNo(shown)} <span style={{ color: C.muted }}>/ {lotNo(n - 1)}</span>
        </div>
        <button className="sr-arrow" style={arrowBtn} onClick={() => flip(1)} aria-label="Next item">
          &rsaquo;
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="sr-thumbs"
        style={{
          display: "flex",
          gap: 10,
          marginTop: 24,
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingBottom: 4,
        }}
      >
        {LOTS.map((lot, i) => (
          <button
            key={lot.img}
            onClick={() => flip(i > cur ? 1 : -1, i)}
            aria-label={`Go to lot ${lotNo(i)}, ${lot.title}`}
            aria-current={shown === i}
            style={{
              position: "relative",
              width: 74,
              height: 74,
              flexShrink: 0,
              padding: 0,
              cursor: "pointer",
              background: lot.bg,
              border: `2px solid ${shown === i ? C.red : C.line}`,
              opacity: shown === i ? 1 : 0.6,
              transition: "opacity 0.2s ease, border-color 0.2s ease",
              overflow: "hidden",
            }}
          >
            <Image src={lot.img} alt="" fill sizes="74px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function MobilePage({ i }: { i: number }) {
  return (
    <div style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ position: "relative", height: 300 }}>
        <LotImage i={i} mobile />
      </div>
      <LotDetails i={i} mobile />
    </div>
  );
}
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
            <Link
  href="/sponsor"
  className="btn-ghost desktop-only"
  style={{
    border: `1px solid ${C.cream}`,
    color: C.cream,
    padding: "12px 20px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    marginRight: 8,
  }}
>
  Become a Sponsor
</Link>
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
          <Link href="/sponsor" onClick={() => setMenuOpen(false)}>Become a Sponsor</Link>
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
            Thank you to the businesses and organizations backing the show.
            Their support puts every dollar of every ticket to work for kids in
            South Florida.
          </p>

          {SPONSOR_WALL.map((row) => (
            <div key={row.tier} style={{ marginBottom: 44 }}>
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
                  maxWidth: row.maxWidth,
                  margin: "0 auto",
                }}
              >
                {row.logos.map((logo) => (
                  <div
                    key={logo.src}
                    style={{
                      border: `1px solid ${row.palette.edge}88`,
                      background: `linear-gradient(180deg, ${row.palette.glow} 0%, rgba(0,0,0,0) 100%), ${C.ink2}`,
                      padding: 12,
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: row.height,
                        background: "#FFFFFF",
                      }}
                    >
                      <div style={{ position: "absolute", inset: 18 }}>
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          sizes="(max-width: 700px) 90vw, 700px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: 44,
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
                <Bolt size={11} />
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
                <Bolt size={11} />
                <span>50% JAFCO</span>
              </span>
            </div>
          </div>

          <div style={{ marginTop: 44, textAlign: "center" }}>
            <Link
              href="/sponsor"
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
              }}
            >
              See How To Sponsor
            </Link>
            <p style={{ marginTop: 16, fontSize: 14, color: C.muted }}>
              Four levels, every perk, and the commitment form, all on one page.
            </p>
          </div>
        </div>
      </section>
      {/* ---------------- SILENT AUCTION ---------------- */}
      <section
        id="auction"
        style={{
          padding: "96px 0",
          background: C.ink2,
          borderBottom: `1px solid ${C.line}`,
          overflow: "hidden",
        }}
      >
        <div className="wrap">
          <SectionTitle
            kicker="Bid in person at the show"
            title={
              <>
                Silent
                <br />
                <span style={{ color: C.red }}>auction</span>
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
            Eight lots, over $23,000 in donated items. Flip through the
            catalog now, then come place your bids. Bidding opens with doors at
            1:30 PM and winners are announced at 5:50 PM.
          </p>

          <AuctionBook />
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
                Static Rebellion is a South Florida alternative rock band
                founded in May 2025 by brothers Redd, 17 (drums and producer)
                and Nadav, 15 (lead vocals and guitar). Laz joined the band on
                bass in April 2026, completing the trio.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                Inspired by the raw energy of alternative rock, punk and grunge
                from the &rsquo;80s and &rsquo;90s, Static Rebellion brings that
                spirit to a new generation: real guitars, loud drums, original
                songs and a live show built around the audience.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                The band writes, records and produces its own music and performs
                regularly throughout South Florida&rsquo;s tri-county area. Their
                sets combine original material with their own take on
                fan-favorite rock and pop songs spanning multiple decades.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                In 2026, Static Rebellion released its first two original
                singles, with a third currently in production. The band also
                produced the official Miami Dolphins Mascot Theme Song, bringing
                their sound from South Florida stages to one of the
                region&rsquo;s most recognizable sports franchises.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: C.muted,
                }}
              >
                Static Rebellion&rsquo;s originals are streaming now, but this is
                music meant to be experienced live. Come hear it the way rock is
                supposed to sound: loud, live, and in a room full of people.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 26,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
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

                <a
                  href="https://www.nbcmiami.com/video/entertainment/south-florida-live/static-rebellion-rocks-the-studio/3842388/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: `1px solid ${C.red}`,
                    color: C.cream,
                    padding: "9px 16px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  <Bolt size={9} />
                  Featured on NBC6 South Florida Live
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
                stage with us all afternoon. That alone is worth the ticket.
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
  schoolofrock.com/locations/coconutgrove
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
            {/* ---------------- PROGRAM ---------------- */}
      <section
        id="program"
        style={{ padding: "84px 0", borderTop: `1px solid ${C.line}` }}
      >
        <div className="wrap">
          <SectionTitle
            kicker="Scottish Rite Temple, Miami"
            title={
              <>
                Run of
                <br />
                <span style={{ color: C.red }}>the day</span>
              </>
            }
          />

          <div style={{ border: `1px solid ${C.line}` }}>
            {PROGRAM.map((p, i, arr) => (
              <div
                key={p.time}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "20px 24px",
                  borderBottom:
                    i < arr.length - 1 ? `1px solid ${C.line}` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: display,
                    fontSize: "clamp(18px, 2.4vw, 24px)",
                    textTransform: "uppercase",
                    color: C.cream,
                    lineHeight: 1.1,
                    minWidth: 104,
                    flexShrink: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.time}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: C.muted,
                    paddingTop: 2,
                  }}
                >
                  {p.what}
                </div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 18, fontSize: 14, color: C.muted }}>
            Times are approximate and may shift on the day.
          </p>
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
                a: "Yes. Tap See How To Sponsor in the Sponsors section for every level and the commitment form.",
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
                <a
                  href="https://bgcbc.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ fontSize: 14, color: C.muted }}
                >
                  bgcbc.org
                </a>

                <a
                  href="https://jafco.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ fontSize: 14, color: C.muted }}
                >
                  jafco.org
                </a>

                <a
                  href={SOR_SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ fontSize: 14, color: C.muted }}
                >
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

                {SOR_SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ color: C.muted }}
                  >
                    Instagram {s.label}
                  </a>
                ))}

                <a
                  href="mailto:booking@staticrebellion.com"
                  className="social-link"
                  style={{ color: C.muted }}
                >
                  booking@staticrebellion.com
                </a>

                <Link
                  href="/sponsor"
                  className="social-link"
                  style={{ color: C.muted }}
                >
                  Sponsor the show
                </Link>
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