import type { MetadataRoute } from "next";
import { posts, SITE_URL } from "@/app/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/posts/${p.slug}`,
      lastModified: new Date(p.isoDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
