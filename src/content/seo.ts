import { profile } from "@/content/site";

/** Production domain — the single source for canonical URLs, sitemap, robots and structured data. */
export const SITE_URL = "https://rahulkulathoor.in";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * Site-wide SEO copy. Keep it natural: one clear statement of who Rahul is,
 * where he's based and what he does — no keyword lists.
 */
export const seo = {
  siteName: profile.name,
  locale: "en_IN",
  defaultTitle: `${profile.name} — Freelance UI/UX Designer in Kerala, India`,
  titleTemplate: `%s | ${profile.name}`,
  description:
    "Freelance UI/UX designer in Kerala, India with 10+ years of experience in website design, dashboards, SaaS products, landing pages and mobile app UI.",
  jobTitle: "Freelance UI/UX Designer",
  // Where Rahul is based (used in structured data and the About facts).
  location: { region: "Kerala", country: "IN", label: "Kerala, India" },
  // Topics for Person.knowsAbout — services he offers, as stated across the site.
  knowsAbout: [
    "UI/UX Design",
    "Product Design",
    "Website Design and Development",
    "Mobile App UI/UX Design",
    "Dashboard and SaaS Product Design",
    "Landing Page Design",
    "Responsive Web Design",
    "Design Systems",
    "Figma",
    "Next.js",
    "Tailwind CSS",
  ],
  /** Social card used by the homepage and as the default; generated into /public/og/. */
  ogImage: { url: "/og/home.jpg", width: 1200, height: 630 },
  /** Real photo for Person.image. */
  personImage: "/images/rahul-kulathoor.jpg",
} as const;
