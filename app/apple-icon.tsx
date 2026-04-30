import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3f5d4c",
          borderRadius: 36,
        }}
      >
        <svg
          width="112"
          height="112"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f8f5ee"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 16.572v2.42a2.01 2.01 0 0 1 -2.009 2.008h-7.981a2.01 2.01 0 0 1 -2.01 -2.009v-7.981a2.01 2.01 0 0 1 2.009 -2.01h2.954" />
          <path d="M9.167 4.511a2.04 2.04 0 0 1 2.496 -1.441l7.826 2.097a2.04 2.04 0 0 1 1.441 2.496l-2.097 7.826a2.04 2.04 0 0 1 -2.496 1.441l-7.827 -2.097a2.04 2.04 0 0 1 -1.441 -2.496l2.098 -7.827l0 .001" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
