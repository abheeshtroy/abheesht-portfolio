"use client";

import { motion } from "framer-motion";
import SectionOrbs from "@/components/SectionOrbs";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate">
      {/* Ambient orbs */}
      <SectionOrbs />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/50 border border-white/10 rounded-full px-4 py-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)", animation: "pulse 2s infinite" }}
            />
            open to roles
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
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
          className="text-xl md:text-2xl text-white/60 max-w-2xl mb-6 leading-relaxed"
        >
          Software engineer building at the intersection of{" "}
          <span className="text-white/90">reliable systems</span> and{" "}
          <span style={{ color: "#22d3ee" }}>applied AI</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base text-white/35 max-w-xl mb-12 leading-relaxed"
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
            className="px-6 py-3 rounded-lg text-sm font-mono tracking-wide text-white/50 border border-white/10 hover:text-white/90 hover:border-white/20 transition-all duration-200"
          >
            get in touch
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 font-mono text-xs text-white/25 tracking-widest"
        >
          MS Computer Science · Arizona State University · GPA 4.0
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-white/20 tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
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