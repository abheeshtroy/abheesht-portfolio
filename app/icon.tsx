import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32, height: 32, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "#13131f", borderRadius: "50%",
          border: "1.5px solid #6366f1",
          fontFamily: "monospace", fontSize: 11,
          fontWeight: 600, letterSpacing: 1.5,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        AR
      </div>
    ),
    { ...size }
  );
}
