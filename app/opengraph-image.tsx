import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abheesht Roy — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#13131f",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "2px solid #6366f1",
            marginBottom: 40,
            color: "rgba(255,255,255,0.8)",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          AR
        </div>
        <div style={{ fontSize: 52, color: "white", fontWeight: 700, marginBottom: 20 }}>
          Abheesht Roy
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          Software engineer building at the intersection of reliable systems and applied AI.
        </div>
      </div>
    ),
    { ...size }
  );
}
