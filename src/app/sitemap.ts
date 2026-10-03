import type { MetadataRoute } from "next";
import { LEGAL_PAGES } from "@/lib/legal";

export const dynamic = "force-static";

const SITEMAP_ORIGIN = "https://www.signalorbit.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITEMAP_ORIGIN}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...LEGAL_PAGES.map((page) => ({
      url: `${SITEMAP_ORIGIN}${page.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
