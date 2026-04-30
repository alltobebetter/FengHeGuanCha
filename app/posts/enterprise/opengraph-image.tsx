import { renderOgImage, ogImageSize, ogContentType } from "@/app/lib/og-template";
import { getPost } from "@/app/lib/posts";

export const size = ogImageSize;
export const contentType = ogContentType;
const post = getPost("enterprise")!;
export const alt = post.title;

export default function OG() {
  return renderOgImage({ title: post.title, subtitle: post.date });
}
