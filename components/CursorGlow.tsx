'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const glow = glowRef.current;
    if (!glow) return;

    const handleMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.style.opacity = '1';
    };

    const handleLeave = () => { glow.style.opacity = '0'; };
    const handleEnter = () => { glow.style.opacity = '1'; };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-30 hidden sm:block"
      style={{
        width: 600,
        height: 600,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(34,211,238,0.03) 35%, transparent 70%)',
        filter: 'blur(60px)',
        transition: 'opacity 0.4s ease',
        opacity: 0,
      }}
      aria-hidden
    />
  );
}
