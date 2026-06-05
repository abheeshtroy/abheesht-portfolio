"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          top: "-100px",
          right: "-150px",
          background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Staggered heading */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-3"
          >
            <div style={{ width: "28px", height: "1px", background: "#6366f1" }} />
            <p className="font-mono text-xs tracking-widest text-white/30">
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
              <p className="text-2xl text-white/80 leading-relaxed font-light">
                I've spent the last few years working at levels of the stack
                most engineers only read about.
              </p>
              <p className="text-white/50 leading-relaxed">
                Hardware diagnostics at Samsung. Real-time backends at a
                European startup. Production AI pipelines at a healthtech firm.
                IoT research that ended up in two IEEE publications.
              </p>
              <p className="text-white/50 leading-relaxed">
                That range isn't a résumé quirk — it's how I think. I'm drawn
                to problems that require understanding the full system, not just
                the layer you're hired to own.
              </p>
              <p className="text-white/50 leading-relaxed">
                Right now I'm most interested in roles where AI changes what a
                product can fundamentally do — not just automate what it already
                does. I want to be in the room where that architecture gets
                decided.
              </p>
            </div>

            {/* Right — quick facts */}
            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs tracking-widest text-white/25 mb-4">currently</p>
                <p className="text-white/70">MS Computer Science · Arizona State University</p>
                <p className="text-white/30 text-sm mt-1">GPA 4.0 · May 2026</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-white/25 mb-4">based in</p>
                <p className="text-white/70">San Francisco, CA</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-white/25 mb-4">looking for</p>
                <p className="text-white/70">SWE · AI Engineering</p>
                <p className="text-white/30 text-sm mt-1">anywhere</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-white/25 mb-4">published</p>
                <div className="space-y-2">
                  <a
                    href="https://ieeexplore.ieee.org/document/9573753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/50 hover:text-white/90 transition-colors duration-200 underline underline-offset-4 decoration-white/20"
                  >
                    IEEE RTEICT 2021
                  </a>
                  <a
                    href="https://ieeexplore.ieee.org/document/10101373"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/50 hover:text-white/90 transition-colors duration-200 underline underline-offset-4 decoration-white/20"
                  >
                    IEEE INCON 2023
                  </a>
                </div>
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