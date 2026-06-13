"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LERP_TORCH = 0.12;
const TORCH_R    = 280;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CursorSystem() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const torchRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  useEffect(() => {
    if (!mounted || !isActive) return;

    let mouseX = -9999, mouseY = -9999;
    let torchX = -9999, torchY = -9999;
    let hasMoved = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        torchX = mouseX; torchY = mouseY;
        hasMoved = true;
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      torchX = lerp(torchX, mouseX, LERP_TORCH);
      torchY = lerp(torchY, mouseY, LERP_TORCH);

      const torch = torchRef.current;
      if (torch) {
        torch.style.setProperty("--tx", `${torchX}px`);
        torch.style.setProperty("--ty", `${torchY}px`);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
    };
  }, [mounted, isActive]);

  useEffect(() => {
    if (!mounted) return;
    const hoverMq  = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hoverMq.matches || motionMq.matches) {
      setIsActive(false);
      return;
    }
    setIsActive(true);
  }, [mounted]);

  if (!mounted || !isActive) return null;

  return createPortal(
    <div
      ref={torchRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        background: `radial-gradient(circle ${TORCH_R}px at var(--tx, -9999px) var(--ty, -9999px),
                      rgba(245,158,11,0.12),
                      rgba(245,158,11,0.035) 40%,
                      transparent 65%)`,
      }}
    />,
    document.body
  );
}
