import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://deflick.pro";
  const now = new Date("2026-08-05T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified: now,
      priority: 1
    },
    ...["work", "about", "contact", "privacy"].map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: now,
      priority: route === "work" ? 0.9 : 0.7
    })),
    ...projects
      .filter((project) => project.visible)
      .map((project) => ({
        url: `${siteUrl}/work/${project.slug}`,
        lastModified: now,
        priority: 0.8
      }))
  ];
}
