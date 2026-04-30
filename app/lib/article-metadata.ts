import type { Metadata } from "next";
import { getPost, AUTHOR, type Post } from "@/app/lib/posts";

/** 生成文章页的完整 metadata。 */
export function articleMetadata(slug: string): Metadata {
  const post = getPost(slug);
  if (!post) {
    return { title: "未找到" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: AUTHOR }],
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}`,
      publishedTime: post.isoDate,
      authors: [AUTHOR],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export type { Post };
