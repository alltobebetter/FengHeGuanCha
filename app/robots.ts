import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/posts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // 屏蔽常见 AI 训练爬虫——契合"不愿被消费"的调性
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "CCBot",
          "PerplexityBot",
          "Bytespider",
          "Amazonbot",
          "FacebookBot",
          "Applebot-Extended",
          "Diffbot",
          "ImagesiftBot",
          "Omgilibot",
          "Omgili",
          "YouBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
