import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { JsonLd, siteJsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { seo, SITE_URL } from "@/content/seo";
import { profile } from "@/content/site";
import "./globals.css";

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

// Only the italic cut is used anywhere (accent words), so the upright file isn't loaded.
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.description,
  applicationName: seo.siteName,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  category: "design",
  // Pages set their own canonical; this is the fallback for the homepage.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: seo.siteName,
    locale: seo.locale,
    title: seo.defaultTitle,
    description: seo.description,
    images: [{ ...seo.ogImage, alt: `${profile.name} — ${seo.jobTitle}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.description,
    images: [seo.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#131312",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" id="top" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={siteJsonLd} />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  );
}
