import { profile } from "@/content/site";
import { absoluteUrl, seo, SITE_URL } from "@/content/seo";

/** Renders schema.org JSON-LD; `<` is escaped so content can't break out of the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Person + WebSite, linked by @id. Rendered once in the root layout. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      url: SITE_URL,
      image: absoluteUrl(seo.personImage),
      jobTitle: seo.jobTitle,
      description: seo.description,
      email: `mailto:${profile.contactEmail}`,
      address: {
        "@type": "PostalAddress",
        addressRegion: seo.location.region,
        addressCountry: seo.location.country,
      },
      knowsAbout: seo.knowsAbout,
      sameAs: [profile.links.linkedin, profile.links.behance],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: seo.siteName,
      description: seo.description,
      inLanguage: "en-IN",
      publisher: { "@id": PERSON_ID },
    },
  ],
};
