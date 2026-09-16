import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { LEGAL_PAGES } from "@/lib/legal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...LEGAL_PAGES.map((page) => ({
      url: `${SITE.url}${page.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
