import type { MetadataRoute } from "next";
import { seoRoutes, siteUrl } from "@/modules/content/data/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...seoRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.path === "/about" || route.path === "/services" ? 0.9 : 0.8,
    })),
  ];
}
