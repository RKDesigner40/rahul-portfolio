import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/content/seo";

// Fixed date (not `new Date()`) so the sitemap stays fully static; bump it when content changes.
const LAST_UPDATED = "2026-10-27";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
