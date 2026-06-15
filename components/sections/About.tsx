"use client";

import { motion } from "framer-motion";
import SectionOrbs from "@/components/SectionOrbs";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden isolate"
    >
      <SectionOrbs />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-3"
          >
            <div style={{ width: "28px", height: "1px", background: "#6366f1" }} />
            <p className="font-mono text-xs tracking-widest text-white/45">
              01 / about
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-semibold text-white/90 pl-9"
          >
            A bit about me
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — main copy */}
            <div className="space-y-6">
              <p className="text-2xl text-white/85 leading-relaxed font-light">
                I&apos;m a software engineer who&apos;s worked across systems,
                backends, and applied AI.
              </p>
              <p className="text-white/65 leading-relaxed">
                I&apos;ve built low-level systems software at Samsung
                Semiconductor, real-time backends at a European SaaS startup,
                and agentic AI pipelines for enterprise data infrastructure.
                Earlier on, I did IoT research that led to two IEEE
                publications.
              </p>
              <p className="text-white/65 leading-relaxed">
                I recently finished my MS in Computer Science at Arizona State,
                and I&apos;m currently based in San Francisco.
              </p>
            </div>

            {/* Right — quick facts */}
            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs tracking-widest text-white/40 mb-3">education</p>
                <p className="text-white/80">MS Computer Science · Arizona State University</p>
                <p className="text-white/45 text-sm mt-1">GPA 4.0 · May 2026</p>
                <p className="text-white/80 mt-2">BTech Inftion Technology · Manipal Institute of Technology</p>
                <p className="text-white/45 text-sm mt-1">2019 – 2023</p>
              </div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
              <div>
                <p className="font-mono text-xs tracking-widest text-white/40 mb-3">based in</p>
                <p className="text-white/80">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accent stripe into Projects */}
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
