import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FREE_LEADS, SITE } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  weight: ["400", "500"],
});

const description = `SignalOrbit delivers verified B2B leads: researched decision-makers with sourced reasons they fit and a recommended outreach route for each. Your first ${FREE_LEADS} leads are free.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "SignalOrbit — Verified B2B leads",
    template: "%s — SignalOrbit",
  },
  description,
  applicationName: SITE.name,
  keywords: [
    "B2B lead generation",
    "verified leads",
    "prospect research",
    "sales prospecting",
    "outreach strategy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "SignalOrbit — Verified B2B leads",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalOrbit — Verified B2B leads",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  description,
  serviceType: "B2B lead generation",
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    description: `First ${FREE_LEADS} verified leads free; ongoing delivery by custom monthly proposal.`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-[0.9rem] focus:font-medium focus:text-[#03080f]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
