"use client";

import { motion, type Variants } from "framer-motion";
import { featuredProjects, secondaryProjects } from "@/lib/projects";
import SectionOrbs from "@/components/SectionOrbs";

const projectPrompts: Record<string, string> = {
  "agent-techs-pipeline": "What's the real story behind the data-matching pipeline — what went wrong?",
  "text2sql": "Tell me about the Text2SQL project — what was Abheesht's contribution?",
  "graph-pipeline": "Tell me about the graph data pipeline project",
  "samsung-diagnostic": "Tell me about the Samsung TCON tool — what was the hard part?",
  "agrichain": "Tell me about the AgriChain project",
  "context-monitoring": "Tell me about the context monitoring app",
  "air-passenger": "Tell me about the air passenger prediction project",
  "mushroom-classifier": "Tell me about the mushroom classifier project",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Ambient orbs */}
      <SectionOrbs />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Staggered heading */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-3"
          >
            <div style={{ width: "28px", height: "1px", background: "var(--indigo)" }} />
            <p className="font-mono text-xs tracking-widest text-[var(--text-muted)]">
              02 / projects
            </p>
          </motion.div>
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-semibold text-[var(--text-primary)] pl-9"
          >
            Things I&apos;ve built
          </motion.h2>
        </div>

        {/* Featured projects */}
        <div className="space-y-6 mb-16">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="rounded-xl overflow-hidden light-card-shadow"
                style={{
                  background: "var(--glass-bg)",
                  border: "0.5px solid var(--border)",
                  borderLeft: `3px solid ${project.accentColor}`,
                  backdropFilter: "blur(28px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(28px) saturate(1.4)",
                }}
              >
                {/* Terminal topbar */}
                <div
                  className="flex items-center gap-2 px-4 py-2"
                  style={{
                    background: "var(--surface-overlay)",
                    borderBottom: "0.5px solid var(--border)",
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--border)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--border)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--border)" }} />
                  <span className="font-mono text-xs text-[var(--text-muted)] ml-1">
                    {project.filename}
                  </span>
                  <span
                    className="ml-auto font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "var(--featured-bg)",
                      color: "var(--featured-text)",
                      border: "0.5px solid var(--featured-border)",
                    }}
                  >
                    featured
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium text-[var(--text-primary)]">{project.title}</h3>
                    <span className="font-mono text-xs text-[var(--text-muted)]">{project.year}</span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.description}</p>

                  {/* Meta block */}
                  <div
                    className="grid grid-cols-2 gap-x-4 gap-y-1 px-3 py-2.5 rounded-lg font-mono text-xs"
                    style={{
                      background: "var(--surface-overlay)",
                      border: "0.5px solid var(--border)",
                    }}
                  >
                    <span className="text-[var(--text-muted)]">stack</span>
                    <span style={{ color: "var(--color-stack)" }}>{project.stack}</span>
                    {project.impact && (
                      <>
                        <span className="text-[var(--text-muted)]">impact</span>
                        <span style={{ color: "var(--color-impact)" }}>{project.impact}</span>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          background: "var(--tag-bg)",
                          border: "0.5px solid var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center gap-4 pt-3"
                    style={{ borderTop: "0.5px solid var(--border)" }}
                  >
                    {project.github && (
                      <a
                        data-cursor-snap
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                      >
                        <GithubIcon /> github
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                      >
                        <ExternalIcon /> live
                      </a>
                    )}
                    {projectPrompts[project.slug] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new CustomEvent('open-chat', { detail: { message: projectPrompts[project.slug] } }));
                        }}
                        data-cursor-snap
                        className="font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        style={{ color: "var(--cyan)" }}
                      >
                        ask about this ↗
                      </button>
                    )}
                    <span
                      className="ml-auto font-mono text-xs flex items-center gap-1.5"
                      style={{ color: "rgba(255,255,255,0.30)" }}
                    >
                      demo coming soon
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="font-mono text-xs tracking-widest text-[var(--text-muted)] mb-6">
            other work
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -2 }}
              >
                <div
                  className="rounded-xl p-4 flex flex-col gap-2.5 h-full light-card-shadow"
                  style={{
                    background: "var(--glass-bg)",
                    border: "0.5px solid var(--border)",
                    borderLeft: "3px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(28px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(28px) saturate(1.4)",
                  }}
                >
                  <span className="text-sm font-medium text-[var(--text-primary)]">{project.title}</span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "var(--tag-bg)",
                          border: "0.5px solid var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 pt-1"
                      style={{ borderTop: "0.5px solid var(--border)" }}
                    >
                      <GithubIcon size={12} /> github
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="rounded-xl overflow-hidden light-card-shadow"
            style={{
              background: "var(--glass-bg)",
              border: "0.5px solid var(--border)",
              backdropFilter: "blur(28px) saturate(1.4)",
              WebkitBackdropFilter: "blur(28px) saturate(1.4)",
            }}
          >
            {/* Header bar */}
            <div
              className="flex items-center gap-2.5 px-5 py-3"
              style={{
                background: "var(--surface-overlay)",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
              <span className="font-mono text-xs text-[var(--text-secondary)]">published research</span>
              <span
                className="ml-auto font-mono text-xs px-2 py-0.5 rounded"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  color: "var(--indigo)",
                  border: "0.5px solid rgba(245,158,11,0.2)",
                }}
              >
                2 papers · IEEE
              </span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-5">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                My first real encounter with applied AI — building systems that
                actually shipped at a national science museum. Both papers came
                out of a summer at NCSM and ended up being the reason I went
                deeper into ML.
              </p>

              {/* Paper 1 */}
              <div className="flex flex-col gap-2 pl-4" style={{ borderLeft: "2px solid rgba(245,158,11,0.3)" }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs" style={{ color: "var(--indigo)" }}>IEEE RTEICT 2021</span>
                  <span className="text-[var(--text-muted)] text-xs">·</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">peer-reviewed</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  MusoAssist: An Interactive Virtual Bot for Museum Gallery Guidance
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Humanoid chatbot deployed at NCSM Kolkata. Non-monotonic conversation
                  chains, IoT-activated physical exhibits. 73% comprehension vs 78%
                  with a human guide.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <a href="https://ieeexplore.ieee.org/document/9573753" target="_blank" rel="noopener noreferrer"
                    data-cursor-snap
                    className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
                    <ExternalIcon size={13} /> IEEE
                  </a>
                  <a href="https://github.com/abheeshtroy/Musoassist-Chatbot" target="_blank" rel="noopener noreferrer"
                    data-cursor-snap
                    className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1.5">
                    <GithubIcon size={13} /> chatbot repo
                  </a>
                </div>
              </div>

              <div style={{ borderTop: "0.5px solid var(--border)" }} />

              {/* Paper 2 */}
              <div className="flex flex-col gap-2 pl-4" style={{ borderLeft: "2px solid rgba(245,158,11,0.3)" }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs" style={{ color: "var(--indigo)" }}>IEEE RTEICT 2021</span>
                  <span className="text-[var(--text-muted)] text-xs">·</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">peer-reviewed</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Low-Cost Crowd Counting for Museum Gallery Management
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  P2PNet CNN on existing surveillance cameras. Output drove a motorized
                  spotlight to the most-crowded exhibit in real time. Raspberry Pi +
                  ESP8266, no new hardware required.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <a href="https://ieeexplore.ieee.org/document/9573753" target="_blank" rel="noopener noreferrer"
                    data-cursor-snap
                    className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
                    <ExternalIcon size={13} /> IEEE
                  </a>
                  <a href="https://github.com/abheeshtroy/Bayesian-Crowd-Counting" target="_blank" rel="noopener noreferrer"
                    data-cursor-snap
                    className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1.5">
                    <GithubIcon size={13} /> crowd counting repo
                  </a>
                </div>
              </div>

              <div style={{ borderTop: "0.5px solid var(--border)" }} />

              {/* Paper 3 */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs" style={{ color: "var(--indigo)" }}>IEEE INCON 2023</span>
                  <span className="text-sm text-[var(--text-secondary)]">Smart IoT Infrastructure for Public Space Management</span>
                </div>
                <a href="https://ieeexplore.ieee.org/document/10101373" target="_blank" rel="noopener noreferrer"
                    data-cursor-snap
                  className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 shrink-0">
                  <ExternalIcon size={13} /> IEEE
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Accent stripe into Experience */}
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
