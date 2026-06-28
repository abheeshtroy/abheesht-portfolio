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
            <div style={{ width: "28px", height: "1px", background: "var(--indigo)" }} />
            <p className="font-mono text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
              01 / about
            </p>
          </motion.div>
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-semibold pl-9"
            style={{ color: "var(--text-primary)" }}
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
            <div className="space-y-6">
              <p className="text-2xl leading-relaxed font-light" style={{ color: "var(--text-primary)", opacity: 0.9 }}>
                I&apos;m a software engineer who&apos;s worked across systems,
                backends, and applied AI.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                I&apos;ve built low-level systems software at Samsung
                Semiconductor, real-time backends at a European SaaS startup,
                and agentic AI pipelines for enterprise data infrastructure.
                Earlier on, I did IoT research that led to two IEEE
                publications.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                I recently finished my MS in Computer Science at Arizona State,
                and I&apos;m currently based in San Francisco.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                There&apos;s a lot going on outside the terminal window.
                I take that part just as seriously.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>education</p>
                <p style={{ color: "var(--text-primary)", opacity: 0.85 }}>MS Computer Science · Arizona State University</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>GPA 4.0 · May 2026</p>
                <p className="mt-2" style={{ color: "var(--text-primary)", opacity: 0.85 }}>BTech Information Technology · Manipal Institute of Technology</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>2019 – 2023</p>
              </div>
              <div style={{ height: "1px", background: "var(--border)" }} />
              <div>
                <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>based in</p>
                <p style={{ color: "var(--text-primary)", opacity: 0.85 }}>San Francisco, CA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, var(--indigo) 0%, color-mix(in srgb, var(--indigo) 15%, transparent) 60%, transparent 100%)",
          opacity: 0.5,
        }} />
      </div>
    </section>
  );
}
