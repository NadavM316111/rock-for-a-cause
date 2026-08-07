import type { Metadata } from "next";
import { Anton, Barlow } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rockforacause.staticrebellion.com"),
  title: "Rock for a Cause | Static Rebellion x School of Rock Miami",
  description:
    "An afternoon of live rock in Miami benefiting the Boys & Girls Clubs of Broward County. Sunday, October 18, 2026. All ages. Tickets from $25.",
  keywords: [
    "Static Rebellion",
    "Rock for a Cause",
    "Miami concert",
    "School of Rock Miami",
    "Boys and Girls Clubs of Broward County",
    "benefit concert",
    "all ages show",
  ],
  openGraph: {
    title: "Rock for a Cause | Static Rebellion x School of Rock Miami",
    description:
      "One afternoon. Live rock. Every ticket supports the Boys & Girls Clubs of Broward County. Sunday, October 18, 2026 in Miami.",
    url: "https://rockforacause.staticrebellion.com",
    siteName: "Static Rebellion",
    images: [{ url: "/band.jpg", width: 1200, height: 630, alt: "Static Rebellion" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock for a Cause | Static Rebellion x School of Rock Miami",
    description:
      "Live rock in Miami benefiting the Boys & Girls Clubs of Broward County. October 18, 2026. All ages.",
    images: ["/band.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${barlow.variable}`}>
      <head>
        <meta name="theme-color" content="#0B0A0A" />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}