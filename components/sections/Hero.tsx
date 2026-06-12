"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionOrbs from "@/components/SectionOrbs";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate">
      {/* Ambient orbs */}
      <SectionOrbs />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 w-full">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] md:gap-12 items-center">

          {/* Photo — top on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="hidden md:flex order-1 md:order-2 mb-10 md:mb-0 justify-center md:justify-end"
          >
            {/* Desktop: terminal-window frame with gradient border + glow */}
            <div
              className="hidden md:block relative rounded-2xl p-[1.5px]"
              style={{
                width: "320px",
                background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                boxShadow: "0 0 45px rgba(99,102,241,0.22)",
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  <span className="font-mono text-[11px] text-white/40 ml-2">~/abheesht.jpg</span>
                </div>
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src="/abheesht-portfolio.jpg"
                    alt="Abheesht Roy"
                    fill
                    priority
                    sizes="320px"
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, transparent 55%, rgba(19,19,31,0.5) 100%)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="order-2 md:order-1">

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold tracking-tight mb-6"
              style={{
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 50%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hi, I&apos;m Abheesht.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl md:text-2xl text-white/72 max-w-2xl mb-6 leading-relaxed"
            >
              Software engineer building at the intersection of{" "}
              <span className="text-white/90">reliable systems</span> and{" "}
              <span style={{ color: "#22d3ee" }}>applied AI</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base text-white/50 max-w-xl mb-12 leading-relaxed"
            >
              I care about correctness, scale, and the 3am incident that proves
              whether your architecture actually holds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-4"
            >
              <a
                href="#about"
                className="px-6 py-3 rounded-lg text-sm font-mono tracking-wide text-white transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                }}
              >
                see my work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg text-sm font-mono tracking-wide text-white/65 border border-white/10 hover:text-white/90 hover:border-white/20 transition-all duration-200"
              >
                get in touch
              </a>
              <div className="flex items-center gap-3 ml-2">
                <a
                  href="https://github.com/abheeshtroy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 hover:text-white/75 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/abheesht-roy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 hover:text-white/75 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 font-mono text-xs text-white/40 tracking-widest"
            >
              MS Computer Science · Arizona State University
            </motion.p>
          </div>

        </div>
      </div>

      {/* Scroll indicator — hidden on mobile (short viewports cause overlap with credential line) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-white/35 tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/35">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Accent stripe into About */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, #6366f1 0%, rgba(99,102,241,0.15) 60%, transparent 100%)",
          opacity: 0.5,
        }} />
      </div>
    </section>
  );
}
