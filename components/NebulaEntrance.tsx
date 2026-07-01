"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const darkBlobs = [
  { fx: 0.15, fy: 0.2, sx: 0.5, sy: 0.6, r: 179, g: 63, b: 98, tr: 220 },
  { fx: 0.78, fy: 0.25, sx: 0.2, sy: 0.85, r: 120, g: 60, b: 140, tr: 200 },
  { fx: 0.45, fy: 0.8, sx: 0.8, sy: 0.15, r: 242, g: 160, b: 70, tr: 180 },
  { fx: 0.65, fy: 0.5, sx: 0.1, sy: 0.4, r: 158, g: 47, b: 79, tr: 160 },
  { fx: 0.3, fy: 0.6, sx: 0.7, sy: 0.9, r: 200, g: 100, b: 60, tr: 140 },
];

const lightBlobs = [
  { fx: 0.12, fy: 0.18, sx: 0.55, sy: 0.7, r: 190, g: 110, b: 120, tr: 240 },
  { fx: 0.8, fy: 0.22, sx: 0.2, sy: 0.85, r: 180, g: 100, b: 130, tr: 220 },
  { fx: 0.45, fy: 0.82, sx: 0.78, sy: 0.12, r: 200, g: 120, b: 115, tr: 200 },
  { fx: 0.62, fy: 0.45, sx: 0.12, sy: 0.42, r: 175, g: 95, b: 125, tr: 180 },
  { fx: 0.28, fy: 0.58, sx: 0.72, sy: 0.88, r: 195, g: 115, b: 120, tr: 170 },
];

export default function NebulaEntrance() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"animating" | "ambient" | "removed">("animating");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const isLight = resolvedTheme === "light";
    const blobs = isLight ? lightBlobs : darkBlobs;
    const peakAlpha = isLight ? 0.30 : 0.28;
    const ambientAlpha = isLight ? 0 : 0.11;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;
    const start = performance.now();
    const duration = 4200;

    function drawFrame(ep: number, alpha: number) {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);
      const scale = w / 700;

      blobs.forEach((b) => {
        const cx = (b.sx * w) + ((b.fx - b.sx) * w * ep);
        const cy = (b.sy * h) + ((b.fy - b.sy) * h * ep);
        const rad = 60 + (b.tr - 60) * ep;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad * scale);
        grad.addColorStop(0, `rgba(${b.r},${b.g},${b.b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${b.r},${b.g},${b.b},${alpha * 0.5})`);
        grad.addColorStop(0.7, `rgba(${b.r},${b.g},${b.b},${alpha * 0.15})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
    }

    let animId: number;

    const draw = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(elapsed / duration, 1);
      const ep = 1 - Math.pow(1 - Math.min(p / 0.7, 1), 3);

      let alpha: number;
      if (p < 0.2) {
        alpha = (p / 0.2) * peakAlpha;
      } else if (p < 0.5) {
        alpha = peakAlpha;
      } else {
        const decay = (p - 0.5) / 0.5;
        const easeDecay = decay * decay * (3 - 2 * decay);
        alpha = peakAlpha - (peakAlpha - ambientAlpha) * easeDecay;
      }

      drawFrame(ep, alpha);

      if (p < 1) {
        animId = requestAnimationFrame(draw);
      } else {
        if (isLight) {
          ctx.clearRect(0, 0, W(), H());
          setPhase("removed");
        } else {
          setPhase("ambient");
        }
      }
    };

    animId = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      if (!isLight) drawFrame(1, ambientAlpha);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;
  if (phase === "removed") return null;

  const isLight = resolvedTheme === "light";

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: phase === "animating" ? 50 : (isLight ? -1 : 0),
        pointerEvents: "none",
        opacity: isLight && phase === "ambient" ? 0 : 1,
        transition: isLight ? "opacity 0.8s ease" : undefined,
      }}
    />
  );
}
