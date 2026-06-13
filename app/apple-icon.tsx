import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180, height: 180, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "#13131f",
          fontFamily: "monospace", fontSize: 64,
          fontWeight: 700, letterSpacing: 4,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        AR
      </div>
    ),
    { ...size }
  );
}
