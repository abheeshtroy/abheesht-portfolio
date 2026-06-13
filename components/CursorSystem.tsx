"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ─── Tunable constants ─────────────────────────────────────────────────────────
const BLOB_SIZE  = 46;    // resting diameter in px
const LERP_BLOB  = 0.17;  // blob position lerp
const LERP_TORCH = 0.12;  // torch lerp — lower = heavier, more ambient
const LERP_SIZE  = 0.25;  // snap size lerp
const TORCH_R    = 280;   // torch gradient radius in px
const SNAP_PX    = 22;    // horizontal snap padding in px
const SNAP_PY    = 16;    // vertical snap padding in px

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CursorSystem() {
  const [mounted, setMounted] = useState(false);
  const blobRef  = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);

  // SSR safety: portal needs document.body at render time
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only activate on hover-capable fine-pointer (mouse) devices
    const hoverMq  = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hoverMq.matches || motionMq.matches) return;

    document.body.classList.add("cursor-custom-active");

    // ── Mutable state (closure — avoids React re-renders) ──────────────────
    let mouseX = -9999, mouseY = -9999;
    let blobX  = -9999,  blobY  = -9999;
    let torchX = -9999,  torchY = -9999;
    let hasMoved = false;

    let curW = BLOB_SIZE, curH = BLOB_SIZE, curR = 999;
    let tgtW = BLOB_SIZE, tgtH = BLOB_SIZE, tgtR = 999;

    let snapped = false;
    let snapX   = 0, snapY = 0;

    let rafId: number;

    // ── Event handlers ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        // First frame: snap blob and torch instantly so they appear at the cursor
        blobX = mouseX; blobY = mouseY;
        torchX = mouseX; torchY = mouseY;
        hasMoved = true;
      }
      // Dot: exact position, zero lag
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouseX - 2.5}px,${mouseY - 2.5}px,0)`;
      }
    };

    // Magnetic snap — event delegation so dynamically mounted elements work
    const TEXT_SEL = "input, textarea, select";
    const onOver = (e: MouseEvent) => {
      // Text inputs: shrink + fade so typing isn't obscured
      if ((e.target as Element).closest(TEXT_SEL)) {
        tgtW = 6; tgtH = 6; tgtR = 999;
        snapped = false;
        if (blobRef.current) blobRef.current.style.opacity = "0.1";
        if (dotRef.current)  dotRef.current.style.opacity  = "0.35";
        return;
      }
      // Magnetic snap
      const el = (e.target as Element).closest("[data-cursor-snap]");
      if (!el) return;
      if (blobRef.current) blobRef.current.style.opacity = "1";
      if (dotRef.current)  dotRef.current.style.opacity  = "1";
      const r = el.getBoundingClientRect();
      snapX = r.left + r.width  / 2;
      snapY = r.top  + r.height / 2;
      tgtW  = r.width  + SNAP_PX;
      tgtH  = r.height + SNAP_PY;
      tgtR  = 10;
      snapped = true;
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      // Leaving a text input — restore
      if ((e.target as Element).closest(TEXT_SEL)) {
        if (related && (related as Element).closest?.(TEXT_SEL)) return;
        tgtW = BLOB_SIZE; tgtH = BLOB_SIZE; tgtR = 999;
        if (blobRef.current) blobRef.current.style.opacity = "1";
        if (dotRef.current)  dotRef.current.style.opacity  = "1";
        return;
      }
      // Leaving a snap target
      const el = (e.target as Element).closest("[data-cursor-snap]");
      if (!el) return;
      if (related && el.contains(related)) return;
      tgtW = BLOB_SIZE; tgtH = BLOB_SIZE; tgtR = 999;
      snapped = false;
      if (blobRef.current) blobRef.current.style.opacity = "1";
    };

    const onLeave = () => {
      if (blobRef.current) blobRef.current.style.opacity = "1";
      if (dotRef.current)  dotRef.current.style.opacity  = "0";
    };
    const onEnter = () => {
      if (blobRef.current) blobRef.current.style.opacity = "1";
      if (dotRef.current)  dotRef.current.style.opacity  = "1";
    };

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // ── Single rAF loop ───────────────────────────────────────────────────────
    const tick = () => {
      rafId = requestAnimationFrame(tick);

      // Blob: snap to element center when snapped, else follow mouse
      blobX = lerp(blobX, snapped ? snapX : mouseX, LERP_BLOB);
      blobY = lerp(blobY, snapped ? snapY : mouseY, LERP_BLOB);

      // Torch: always follows raw mouse, just slower
      torchX = lerp(torchX, mouseX, LERP_TORCH);
      torchY = lerp(torchY, mouseY, LERP_TORCH);

      // Size / radius lerp
      curW = lerp(curW, tgtW, LERP_SIZE);
      curH = lerp(curH, tgtH, LERP_SIZE);
      curR = lerp(curR, tgtR, LERP_SIZE);

      // Write blob transforms
      const blob = blobRef.current;
      if (blob) {
        blob.style.transform    = `translate3d(${blobX - curW / 2}px,${blobY - curH / 2}px,0)`;
        blob.style.width        = `${curW}px`;
        blob.style.height       = `${curH}px`;
        blob.style.borderRadius = `${curR}px`;
      }

      // Write torch via CSS vars — no gradient string rebuild each frame
      const torch = torchRef.current;
      if (torch) {
        torch.style.setProperty("--tx", `${torchX}px`);
        torch.style.setProperty("--ty", `${torchY}px`);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("cursor-custom-active");
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* 1 ── TORCH GLOW — additive ambient light, follows mouse with lag */}
      <div
        ref={torchRef}
        style={{
          position:      "fixed",
          inset:         0,
          pointerEvents: "none",
          zIndex:        9998,
          mixBlendMode:  "normal",
          // Gradient references CSS vars updated in rAF — never rebuilt as a string
          background: `radial-gradient(circle ${TORCH_R}px at var(--tx, -9999px) var(--ty, -9999px),
                        rgba(245,158,11,0.09),
                        rgba(245,158,11,0.025) 40%,
                        transparent 65%)`,
        }}
      />

      {/* 2 ── CURSOR BLOB — honeyed invert, mix-blend-mode: difference */}
      <div
        ref={blobRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        9999,
          mixBlendMode:  "difference",
          background:    "linear-gradient(140deg, #fde68a 0%, #f59e0b 50%, #b45309 100%)",
          width:         `${BLOB_SIZE}px`,
          height:        `${BLOB_SIZE}px`,
          borderRadius:  "999px",
          willChange:    "transform, width, height, border-radius",
          transition:    "opacity 0.15s ease",
        }}
      />

      {/* 3 ── PRECISE DOT — exact pointer position, no lag, keeps clicks accurate */}
      <div
        ref={dotRef}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          pointerEvents:   "none",
          zIndex:          10000,
          width:           "5px",
          height:          "5px",
          borderRadius:    "999px",
          backgroundColor: "rgba(255,255,255,0.85)",
          willChange:      "transform",
        }}
      />
    </>,
    document.body
  );
}
