import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/app/lib/posts";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

/**
 * 极简米白底 + 墨绿强调色的 OG 图。
 * 印刷品调性：大标题 + 副标题 + 站名脚标。
 */
export function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const BG = "#f8f5ee";
  const INK = "#2a2a2a";
  const ACCENT = "#3f5d4c";
  const MUTED = "#6b6b66";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: BG,
          color: INK,
          fontFamily: "serif",
        }}
      >
        {/* 顶部站名 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: MUTED,
            fontSize: 22,
            letterSpacing: "0.3em",
          }}
        >
          <span>{SITE_NAME}</span>
          <span>LOOL.CLICK</span>
        </div>

        {/* 中部标题 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: title.length > 24 ? 64 : 76,
              lineHeight: 1.25,
              color: INK,
              letterSpacing: "0.02em",
              fontWeight: 500,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.5,
                color: MUTED,
                letterSpacing: "0.05em",
                maxWidth: 1000,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* 底部装饰线 + 墨绿圆点 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 14,
              background: ACCENT,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 1,
              background: "#d9d4c5",
            }}
          />
          <span
            style={{
              color: MUTED,
              fontSize: 20,
              letterSpacing: "0.25em",
            }}
          >
            个 人 观 点 存 档
          </span>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
