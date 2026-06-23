"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const glow = glowRef.current;
    if (!glow) return;
    const handleMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      glow.style.opacity = "1";
    };
    const handleLeave = () => { glow.style.opacity = "0"; };
    const handleEnter = () => { glow.style.opacity = "1"; };
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 hidden sm:block"
      style={{
        width: 450,
        height: 450,
        transform: "translate(-50%, -50%)",
        background: isLight
          ? "radial-gradient(circle, rgba(220,180,120,0.18) 0%, rgba(200,165,110,0.08) 35%, transparent 65%)"
          : "radial-gradient(circle, rgba(179,63,98,0.15) 0%, rgba(242,179,93,0.08) 35%, transparent 65%)",
        filter: "blur(50px)",
        transition: "opacity 0.4s ease",
        opacity: 0,
      }}
      aria-hidden
    />
  );
}
