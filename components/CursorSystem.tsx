"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";

const LERP_FOLLOW = 0.12;
const LERP_DIM    = 0.12;
const CORE_R = 90;
const HALO_R = 340;

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor-interactive]';
const TEXT_SELECTOR =
  "p, span, h1, h2, h3, h4, h5, h6, li, label, blockquote, td, th";
const SKIP_GLOW_SELECTOR = "[data-cursor-skip-glow]";
const ICON_SELECTOR = "[data-cursor-icon]";

const CURSOR_ICON_MAP: Record<string, string> = {
  samsung: "/cursors/samsung-cursor.png",
  "agent-techs": "/cursors/agent-techs-cursor.png",
  atthah: "/cursors/atthah-cursor.png",
  ncsm: "/cursors/ncsm-cursor.png",
  desknow: "/cursors/desknow-cursor.png",
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CursorSystem() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const torchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !isActive) return;

    const isDark = resolvedTheme === "dark";

    const DEFAULT_GLOW_SHADOW = isDark
      ? "0 0 22px 2px rgba(242,179,93,0.40), inset 0 0 26px rgba(242,179,93,0.12)"
      : "0 0 20px 2px rgba(224,168,138,0.35), inset 0 0 24px rgba(224,168,138,0.12)";
    const DEFAULT_GLOW_BORDER = isDark
      ? "rgba(242,179,93,0.75)"
      : "rgba(224,168,138,0.70)";

    const GLOW_TRANSITION =
      "box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s cubic-bezier(0.22,1,0.36,1)";

    const patched = new WeakSet<HTMLElement>();
    const origBoxShadow = new WeakMap<HTMLElement, string>();
    const origBorderColor = new WeakMap<HTMLElement, string>();
    let glowEl: HTMLElement | null = null;

    const applyGlow = (el: HTMLElement) => {
      if (glowEl === el) return;
      if (glowEl) removeGlow(glowEl);
      glowEl = el;
      if (!patched.has(el)) {
        const cs = getComputedStyle(el).transition;
        const base = cs && !cs.startsWith("all 0s") ? cs + ", " : "";
        el.style.transition = base + GLOW_TRANSITION;
        origBoxShadow.set(el, el.style.boxShadow);
        origBorderColor.set(el, el.style.borderColor);
        patched.add(el);
      }
      el.style.boxShadow = DEFAULT_GLOW_SHADOW;
      el.style.borderColor = DEFAULT_GLOW_BORDER;
    };

    const removeGlow = (el: HTMLElement) => {
      el.style.boxShadow = origBoxShadow.get(el) ?? "";
      el.style.borderColor = origBorderColor.get(el) ?? "";
      if (glowEl === el) glowEl = null;
    };

    // real cursor swap bookkeeping
    const origCursor = new WeakMap<HTMLElement, string>();
    let cursorEl: HTMLElement | null = null;

    const applyCursor = (el: HTMLElement, iconPath: string) => {
      if (cursorEl === el) return;
      if (cursorEl) resetCursor(cursorEl);
      cursorEl = el;
      if (!origCursor.has(el)) origCursor.set(el, el.style.cursor);
      el.style.cursor = `url(${iconPath}) 16 16, pointer`;
    };

    const resetCursor = (el: HTMLElement) => {
      el.style.cursor = origCursor.get(el) ?? "";
      if (cursorEl === el) cursorEl = null;
    };

    let mouseX = -9999, mouseY = -9999;
    let torchX = -9999, torchY = -9999;
    let dim = 1, targetDim = 1;
    let hasMoved = false;
    let rafId: number;
    const startTime = performance.now();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        torchX = mouseX; torchY = mouseY;
        hasMoved = true;
      }

      const el = e.target as Element | null;
      const iconEl = el?.closest?.(ICON_SELECTOR) as HTMLElement | null;
      const iconKey = iconEl?.getAttribute("data-cursor-icon") ?? null;
      const iconPath = iconKey ? CURSOR_ICON_MAP[iconKey] : undefined;

      if (iconEl && iconPath) {
        applyCursor(iconEl, iconPath);
      } else if (cursorEl) {
        resetCursor(cursorEl);
      }

      const interactiveEl = el?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;

      if (interactiveEl) {
        const skipsGlow = !!interactiveEl.closest(SKIP_GLOW_SELECTOR);
        if (skipsGlow) {
          if (glowEl) removeGlow(glowEl);
        } else {
          applyGlow(interactiveEl);
        }
        targetDim = 0.12;
      } else {
        if (glowEl) removeGlow(glowEl);
        const textEl = el?.closest?.(TEXT_SELECTOR);
        targetDim = textEl ? 0.55 : 1;
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      torchX = lerp(torchX, mouseX, LERP_FOLLOW);
      torchY = lerp(torchY, mouseY, LERP_FOLLOW);
      dim = lerp(dim, targetDim, LERP_DIM);

      const elapsed = (now - startTime) / 1000;
      const breathe = 1 + Math.sin(elapsed * 0.8) * 0.06;

      const torch = torchRef.current;
      if (torch) {
        torch.style.setProperty("--tx", `${torchX}px`);
        torch.style.setProperty("--ty", `${torchY}px`);
        torch.style.setProperty("--scale", `${breathe}`);
        torch.style.setProperty("--dim", `${dim}`);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      if (glowEl) removeGlow(glowEl);
      if (cursorEl) resetCursor(cursorEl);
    };
  }, [mounted, isActive, resolvedTheme]);

  useEffect(() => {
    if (!mounted) return;
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hoverMq.matches || motionMq.matches) {
      setIsActive(false);
      return;
    }
    setIsActive(true);
  }, [mounted]);

  if (!mounted || !isActive) return null;

  const isDark = resolvedTheme === "dark";
  const coreColor = isDark ? "255,200,120" : "210,165,215";
  const haloColor = isDark ? "245,158,11" : "190,140,190";
  const coreOpacity = isDark ? 0.5 : 0.3;
  const haloOpacity = isDark ? 0.22 : 0.16;
  const blendMode = isDark ? "screen" : "normal";

  return createPortal(
    <div
      ref={torchRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        opacity: "var(--dim, 1)",
        background: `
          radial-gradient(circle calc(${CORE_R}px * var(--scale, 1)) at var(--tx, -9999px) var(--ty, -9999px),
            rgba(${coreColor},${coreOpacity}),
            rgba(${coreColor},${coreOpacity * 0.3}) 45%,
            transparent 70%),
          radial-gradient(circle calc(${HALO_R}px * var(--scale, 1)) at var(--tx, -9999px) var(--ty, -9999px),
            rgba(${haloColor},${haloOpacity}),
            rgba(${haloColor},${haloOpacity * 0.25}) 40%,
            transparent 70%)
        `,
      }}
    />,
    document.body
  );
}
