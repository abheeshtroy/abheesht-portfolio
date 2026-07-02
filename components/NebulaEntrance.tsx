"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface BlobConfig {
  bg: string;
  from: { x: string; y: string; scale: number };
  to: { x: string; y: string; scale: number };
  peakOpacity: number;
  ambientOpacity: number;
  size: number;
  delay: number;
  duration: number;
}

const darkBlobs: BlobConfig[] = [
  {
    bg: "radial-gradient(circle, rgba(179,63,98,0.85) 0%, rgba(179,63,98,0.25) 40%, transparent 70%)",
    from: { x: "-30%", y: "-25%", scale: 0.35 },
    to: { x: "-8%", y: "-10%", scale: 1.1 },
    peakOpacity: 0.76,
    ambientOpacity: 0.04,
    size: 750,
    delay: 0,
    duration: 4.2,
  },
  {
    bg: "radial-gradient(circle, rgba(242,179,93,0.6) 0%, rgba(242,179,93,0.14) 45%, transparent 70%)",
    from: { x: "110%", y: "-35%", scale: 0.25 },
    to: { x: "78%", y: "5%", scale: 1.25 },
    peakOpacity: 0.58,
    ambientOpacity: 0.035,
    size: 630,
    delay: 0.35,
    duration: 3.8,
  },
  {
    bg: "radial-gradient(circle, rgba(100,50,160,0.75) 0%, rgba(100,50,160,0.18) 40%, transparent 70%)",
    from: { x: "-35%", y: "60%", scale: 0.3 },
    to: { x: "22%", y: "50%", scale: 1.15 },
    peakOpacity: 0.68,
    ambientOpacity: 0.04,
    size: 680,
    delay: 0.6,
    duration: 4.0,
  },
  {
    bg: "radial-gradient(circle, rgba(200,70,110,0.7) 0%, rgba(200,70,110,0.15) 45%, transparent 70%)",
    from: { x: "115%", y: "80%", scale: 0.3 },
    to: { x: "82%", y: "65%", scale: 1.1 },
    peakOpacity: 0.64,
    ambientOpacity: 0.035,
    size: 570,
    delay: 0.85,
    duration: 3.6,
  },
  {
    bg: "radial-gradient(circle, rgba(242,179,93,0.45) 0%, rgba(242,179,93,0.07) 50%, transparent 70%)",
    from: { x: "50%", y: "-40%", scale: 0.2 },
    to: { x: "50%", y: "28%", scale: 1 },
    peakOpacity: 0.45,
    ambientOpacity: 0.03,
    size: 540,
    delay: 1.1,
    duration: 3.4,
  },
];

/* blush + lavender — soft pink and light purple, bridging burgundy → parchment */

const lightBlobs: BlobConfig[] = [
  {
    bg: "radial-gradient(circle, rgba(224,130,155,0.85) 0%, rgba(224,130,155,0.3) 40%, transparent 70%)",
    from: { x: "-30%", y: "-25%", scale: 0.35 },
    to: { x: "-5%", y: "-8%", scale: 1.1 },
    peakOpacity: 0.9,
    ambientOpacity: 0,
    size: 750,
    delay: 0,
    duration: 4.2,
  },
  {
    bg: "radial-gradient(circle, rgba(160,130,210,0.75) 0%, rgba(160,130,210,0.22) 45%, transparent 70%)",
    from: { x: "110%", y: "-35%", scale: 0.25 },
    to: { x: "78%", y: "5%", scale: 1.25 },
    peakOpacity: 0.85,
    ambientOpacity: 0,
    size: 630,
    delay: 0.35,
    duration: 3.8,
  },
  {
    bg: "radial-gradient(circle, rgba(190,140,180,0.75) 0%, rgba(190,140,180,0.22) 40%, transparent 70%)",
    from: { x: "-35%", y: "60%", scale: 0.3 },
    to: { x: "22%", y: "50%", scale: 1.15 },
    peakOpacity: 0.8,
    ambientOpacity: 0,
    size: 680,
    delay: 0.6,
    duration: 4.0,
  },
  {
    bg: "radial-gradient(circle, rgba(230,150,160,0.7) 0%, rgba(230,150,160,0.18) 45%, transparent 70%)",
    from: { x: "115%", y: "80%", scale: 0.3 },
    to: { x: "82%", y: "65%", scale: 1.1 },
    peakOpacity: 0.75,
    ambientOpacity: 0,
    size: 580,
    delay: 0.85,
    duration: 3.6,
  },
  {
    bg: "radial-gradient(circle, rgba(175,145,215,0.6) 0%, rgba(175,145,215,0.12) 50%, transparent 70%)",
    from: { x: "50%", y: "-40%", scale: 0.2 },
    to: { x: "50%", y: "28%", scale: 1 },
    peakOpacity: 0.7,
    ambientOpacity: 0,
    size: 540,
    delay: 1.1,
    duration: 3.4,
  },
];

const SETTLE_DURATION = 1.8;
const TOGGLE_SCALE = 0.55; // toggle replay runs at 55% duration/delay of first-load

export default function NebulaEntrance() {
  const { resolvedTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(true);
  const hasPlayedOnceRef = useRef(false);
  const [phase, setPhase] = useState<"entrance" | "ambient">("entrance");

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // replay a shorter entrance every time resolvedTheme changes (including first load)
  useEffect(() => {
    if (isMobile || !resolvedTheme) return;
    setPhase("entrance");
    const isFirstLoad = !hasPlayedOnceRef.current;
    const scale = isFirstLoad ? 1 : TOGGLE_SCALE;
    const totalTime = (1.1 + 3.4 + SETTLE_DURATION) * scale * 1000;
    const timer = setTimeout(() => {
      hasPlayedOnceRef.current = true;
      setPhase("ambient");
    }, totalTime);
    return () => clearTimeout(timer);
  }, [isMobile, resolvedTheme]);

  if (isMobile) return null;

  const isDark = resolvedTheme === "dark";
  const blobs = isDark ? darkBlobs : lightBlobs;
  const isFirstLoad = !hasPlayedOnceRef.current;
  const scale = isFirstLoad ? 1 : TOGGLE_SCALE;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {blobs.map((blob, i) => {
        const isEntrance = phase === "entrance";
        const totalDuration = (blob.duration + SETTLE_DURATION) * scale;
        const scaledDelay = blob.delay * scale;

        return (
          <motion.div
            key={`${resolvedTheme}-${i}`}
            style={{
              position: "absolute",
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: blob.bg,
              left: 0,
              top: 0,
              willChange: isEntrance ? "transform, opacity" : "auto",
            }}
            initial={
              isEntrance
                ? {
                    x: blob.from.x,
                    y: blob.from.y,
                    scale: blob.from.scale,
                    opacity: 0,
                  }
                : {
                    x: blob.to.x,
                    y: blob.to.y,
                    scale: blob.to.scale,
                    opacity: blob.ambientOpacity,
                  }
            }
            animate={
              isEntrance
                ? {
                    x: [blob.from.x, blob.to.x, blob.to.x],
                    y: [blob.from.y, blob.to.y, blob.to.y],
                    scale: [blob.from.scale, blob.to.scale, blob.to.scale],
                    opacity: [0, blob.peakOpacity, blob.ambientOpacity],
                  }
                : {
                    x: blob.to.x,
                    y: blob.to.y,
                    scale: blob.to.scale,
                    opacity: blob.ambientOpacity,
                  }
            }
            transition={
              isEntrance
                ? {
                    duration: totalDuration,
                    delay: scaledDelay,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.65, 1],
                  }
                : { duration: 0 }
            }
          />
        );
      })}
    </div>
  );
}
