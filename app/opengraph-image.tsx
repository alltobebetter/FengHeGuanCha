import { renderOgImage, ogImageSize, ogContentType } from "@/app/lib/og-template";
import { SITE_NAME, SITE_DESCRIPTION } from "@/app/lib/posts";

export const size = ogImageSize;
export const contentType = ogContentType;
export const alt = SITE_NAME;

export default function OG() {
  return renderOgImage({
    title: SITE_NAME,
    subtitle: SITE_DESCRIPTION,
  });
}
