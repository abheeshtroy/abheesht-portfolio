"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionOrbs from "@/components/SectionOrbs";

/* ─── Types ────────────────────────────────────────────────────────────────── */

type TabId = "readme" | "ai" | "languages" | "software" | "infrastructure" | "data";

interface Pill {
  name: string;
  bg: string;
  abbr: string;
  fg?: string;
  logo?: string;
}

interface ToolGroup {
  label: string;
  pills: Pill[];
}

/* ─── Tab config ───────────────────────────────────────────────────────────── */

const TABS: { id: TabId; label: string; cmd: string; icon: string }[] = [
  { id: "readme", label: "readme", cmd: "$ cat how-i-use-ai.md", icon: "ti-file-text" },
  { id: "ai", label: "ai", cmd: "$ ls ~/ai", icon: "ti-cpu" },
  { id: "languages", label: "languages", cmd: "$ ls ~/languages", icon: "ti-code" },
  { id: "software", label: "software", cmd: "$ ls ~/software", icon: "ti-world" },
  { id: "infrastructure", label: "infrastructure", cmd: "$ ls ~/infrastructure", icon: "ti-server" },
  { id: "data", label: "data", cmd: "$ ls ~/data", icon: "ti-database" },
];

/* ─── Pill data ────────────────────────────────────────────────────────────── */

const AI_TOOLS: ToolGroup[] = [
  {
    label: "agentic dev",
    pills: [
      { name: "Cursor", bg: "#2ea043", abbr: "Cu", logo: "/logos/cursor.jpeg" },
      { name: "Claude Code", bg: "#d97706", abbr: "CC", logo: "/logos/claude.png" },
      { name: "GitHub Copilot", bg: "#6e40c9", abbr: "Co", logo: "/logos/githubcopilot.svg" },
      { name: "v0", bg: "#222", abbr: "v0", logo: "/logos/v0.png" },
      { name: "CodeRabbit", bg: "#1a7f37", abbr: "CR", logo: "/logos/coderabbit.svg" },
    ],
  },
  {
    label: "llm engineering",
    pills: [
      { name: "Anthropic API", bg: "#d97706", abbr: "A", logo: "/logos/anthropic.svg" },
      { name: "OpenAI API", bg: "#10a37f", abbr: "O", logo: "/logos/openai.png" },
      { name: "Vercel AI SDK", bg: "#222", abbr: "▲", logo: "/logos/vercel.svg" },
      { name: "LangChain", bg: "#1a8870", abbr: "LC", logo: "/logos/langchain.jpeg" },
    ],
  },
  {
    label: "agents & retrieval",
    pills: [
      { name: "MCP", bg: "#6d28d9", abbr: "MC", logo: "/logos/mcp.png" },
      { name: "FAISS", bg: "#0891b2", abbr: "FA", logo: "/logos/meta.png" },
      { name: "Vector DBs", bg: "#0e7490", abbr: "VD", logo: "/logos/vectordb.jpeg" },
      { name: "RAG", bg: "#0d9488", abbr: "RG" },
    ],
  },
  {
    label: "ml frameworks",
    pills: [
      { name: "PyTorch", bg: "#ee4c2c", abbr: "Pt", logo: "/logos/pytorch.svg" },
      { name: "TensorFlow", bg: "#ff6f00", abbr: "TF", logo: "/logos/tensorflow.svg" },
      { name: "Ollama", bg: "#555", abbr: "Ol", logo: "/logos/ollama.svg" },
    ],
  },
  {
    label: "reliability",
    pills: [
      { name: "Evals", bg: "#dc2626", abbr: "Ev", logo: "/logos/evals.jpeg" },
      { name: "Langfuse", bg: "#2563eb", abbr: "Lf", logo: "/logos/langfuse.png" },
    ],
  },
];

const LANGUAGES: Pill[] = [
  { name: "Python", bg: "#3776ab", abbr: "Py", logo: "/logos/python.svg" },
  { name: "Java", bg: "#b07219", abbr: "Ja", logo: "/logos/java.svg" },
  { name: "C++", bg: "#f34b7d", abbr: "C+", logo: "/logos/cplusplus.svg" },
  { name: "TypeScript", bg: "#3178c6", abbr: "TS", logo: "/logos/typescript.svg" },
  { name: "JavaScript", bg: "#f1e05a", abbr: "JS", fg: "#333", logo: "/logos/javascript.svg" },
  { name: "Kotlin", bg: "#A97BFF", abbr: "Kt", logo: "/logos/kotlin.svg" },
  { name: "SQL", bg: "#336791", abbr: "SQ", logo: "/logos/sql.png" },
];

const SOFTWARE: ToolGroup[] = [
  {
    label: "frontend",
    pills: [
      { name: "React", bg: "#61dafb", abbr: "Re", fg: "#222", logo: "/logos/react.svg" },
      { name: "Next.js", bg: "#222", abbr: "N", logo: "/logos/nextjs.svg" },
      { name: "Angular", bg: "#dd0031", abbr: "Ng", logo: "/logos/angular.svg" },
      { name: "Tailwind", bg: "#38bdf8", abbr: "Tw", logo: "/logos/tailwind.svg" },
      { name: "Framer Motion", bg: "#e040fb", abbr: "FM", logo: "/logos/framer.svg" },
    ],
  },
  {
    label: "backend",
    pills: [
      { name: "Node.js", bg: "#539e43", abbr: "No", logo: "/logos/nodejs.svg" },
      { name: "Express.js", bg: "#444", abbr: "Ex", logo: "/logos/express.svg" },
      { name: "Socket.io", bg: "#25c2a0", abbr: "So", logo: "/logos/socketio.svg" },
      { name: "WebSockets", bg: "#333", abbr: "WS", logo: "/logos/websockets.jpeg" },
      { name: "WebRTC", bg: "#2ea44f", abbr: "WR", logo: "/logos/webrtc.png" },
      { name: "REST APIs", bg: "#009688", abbr: "AP" },
    ],
  },
];

const INFRA: ToolGroup[] = [
  {
    label: "cloud",
    pills: [
      { name: "AWS", bg: "#ff9900", abbr: "AW", fg: "#222", logo: "/logos/aws.png" },
      { name: "Azure", bg: "#0078d4", abbr: "Az", logo: "/logos/azure.svg" },
      { name: "GCP", bg: "#4285f4", abbr: "GC", logo: "/logos/gcp.png" },
      { name: "Vercel", bg: "#222", abbr: "▲", logo: "/logos/vercel.svg" },
    ],
  },
  {
    label: "devops",
    pills: [
      { name: "Docker", bg: "#2496ed", abbr: "Dk", logo: "/logos/docker.svg" },
      { name: "Kubernetes", bg: "#326ce5", abbr: "K8", logo: "/logos/kubernetes.svg" },
      { name: "GitLab CI/CD", bg: "#fc6d26", abbr: "GL", logo: "/logos/gitlab.svg" },
      { name: "Git", bg: "#f05032", abbr: "Gi", logo: "/logos/git.svg" },
      { name: "Jest", bg: "#c9510c", abbr: "Je", logo: "/logos/jest.svg" },
      { name: "Linux", bg: "#e95420", abbr: "Li", logo: "/logos/linux.svg" },
    ],
  },
];

const DATA_TOOLS: ToolGroup[] = [
  {
    label: "databases",
    pills: [
      { name: "PostgreSQL", bg: "#336791", abbr: "Pg", logo: "/logos/postgresql.svg" },
      { name: "MongoDB", bg: "#47a248", abbr: "Mg", logo: "/logos/mongodb.svg" },
      { name: "MySQL", bg: "#4479a1", abbr: "My", logo: "/logos/mysql.png" },
      { name: "Redis", bg: "#dc382d", abbr: "Rd", logo: "/logos/redis.svg" },
      { name: "Neo4j", bg: "#018bff", abbr: "N4", logo: "/logos/neo4j.svg" },
    ],
  },
  {
    label: "streaming",
    pills: [
      { name: "Kafka", bg: "#231f20", abbr: "Kf", logo: "/logos/kafka.svg" },
    ],
  },
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function PillBadge({ name, bg, abbr, fg, logo }: Pill) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-md font-mono text-[13px] whitespace-nowrap"
      style={{
        border: "1.2px solid #e5e5e5",
        color: "#222",
        background: "#fff",
        padding: "7px 14px 7px 8px",
      }}
    >
      {logo && !imgErr ? (
        <img
          src={logo}
          alt=""
          width={20}
          height={20}
          className="w-5 h-5 object-contain shrink-0"
          onError={() => setImgErr(true)}
        />
      ) : (
        <span
          className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center text-[10px] font-bold shrink-0"
          style={{ background: bg, color: fg || "#fff" }}
        >
          {abbr}
        </span>
      )}
      {name}
    </span>
  );
}

function DirLabel({ children }: { children: string }) {
  return (
    <p
      className="font-mono text-[11.5px] font-bold tracking-wider uppercase mb-2.5"
      style={{ color: "#222" }}
    >
      {children}/
    </p>
  );
}

function GroupedTools({ groups }: { groups: ToolGroup[] }) {
  return (
    <>
      {groups.map((group, i) => (
        <div key={group.label} className={i > 0 ? "mt-6" : ""}>
          <DirLabel>{group.label}</DirLabel>
          <div className="flex flex-wrap gap-2">
            {group.pills.map((p) => (
              <PillBadge key={p.name} {...p} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ─── Window control button ────────────────────────────────────────────────── */

function WinBtn({
  children,
  hoverBg = "#3a3a3a",
  hoverColor,
}: {
  children: React.ReactNode;
  hoverBg?: string;
  hoverColor?: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center cursor-default transition-colors"
      style={{ width: "36px", height: "28px", color: "#999", borderRadius: "2px" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
        if (hoverColor) e.currentTarget.style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#999";
      }}
    >
      {children}
    </span>
  );
}

/* ─── Main ─────────────────────────────────────────────────────────────────── */

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<TabId>("readme");
  const currentCmd = TABS.find((t) => t.id === activeTab)?.cmd ?? "";

  return (
    <section id="tech-stack" className="relative py-32 px-6 overflow-hidden isolate">
      <SectionOrbs />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
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
              04 / what i use
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-semibold pl-9"
            style={{ color: "var(--text-primary)" }}
          >
            What I use
          </motion.h2>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="overflow-hidden"
            style={{
              border: "1px solid #333",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {/* ── Windows title bar ── */}
            <div
              className="flex items-center justify-between px-3"
              style={{ background: "#1e1e1e", height: "36px" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[12px]" style={{ color: "#aaa" }}>
                  abheesht@dev:~/abheesht-portfolio/tech-stack
                </span>
              </div>
              <div className="flex items-center">
                <WinBtn>
                  <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor">
                    <rect width="10" height="1" />
                  </svg>
                </WinBtn>
                <WinBtn>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="0.5" y="0.5" width="8" height="8" />
                  </svg>
                </WinBtn>
                <WinBtn hoverBg="#e81123" hoverColor="#fff">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <line x1="1" y1="1" x2="9" y2="9" />
                    <line x1="9" y1="1" x2="1" y2="9" />
                  </svg>
                </WinBtn>
              </div>
            </div>

            {/* ── Mobile tab bar ── */}
            <div
              className="flex md:hidden overflow-x-auto scrollbar-none"
              style={{ borderBottom: "1.5px solid #e5e5e5" }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-3 font-mono text-[13px] transition-colors"
                  style={{
                    background: activeTab === tab.id ? "#111" : "transparent",
                    color: activeTab === tab.id ? "#fff" : "#888",
                  }}
                >
                  <i className={`ti ${tab.icon}`} style={{ fontSize: "14px" }} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Split pane ── */}
            <div className="flex min-h-[510px]">
              {/* Sidebar (desktop) */}
              <div
                className="hidden md:flex flex-col shrink-0"
                style={{ width: "185px", borderRight: "1.5px solid #e5e5e5" }}
              >
                {TABS.map((tab, i) => (
                  <div key={tab.id}>
                    {i === 1 && (
                      <div className="mx-4 my-1" style={{ height: "1px", background: "#e5e5e5" }} />
                    )}
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-2.5 text-left font-mono text-[13.5px] transition-colors"
                      style={{
                        padding: "14px 18px",
                        background: activeTab === tab.id ? "#111" : "transparent",
                        color: activeTab === tab.id ? "#fff" : "#777",
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab.id) e.currentTarget.style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab.id) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        className="text-[11px]"
                        style={{ opacity: activeTab === tab.id ? 1 : 0, marginRight: "1px" }}
                      >
                        {">"}
                      </span>
                      <i
                        className={`ti ${tab.icon}`}
                        style={{ fontSize: "15px", opacity: activeTab === tab.id ? 1 : 0.55 }}
                      />
                      {tab.label}
                    </button>
                  </div>
                ))}
                <div className="flex-1" />
              </div>

              {/* Content */}
              <div className="flex-1 p-5 md:p-7 overflow-y-auto">
                <p className="font-mono text-[13.5px] mb-5" style={{ color: "#444" }}>
                  {currentCmd}{" "}
                  <span
                    className="inline-block w-[9px] h-[16px] align-[-2px] ml-1 terminal-cursor"
                    style={{ background: "#444" }}
                  />
                </p>

                {/* Readme */}
                {activeTab === "readme" && (
                  <div>
                    <h3 className="font-mono text-[17px] font-semibold mb-4" style={{ color: "#111" }}>
                      # how i use ai
                    </h3>
                    <div className="space-y-3.5 text-[14.5px] leading-[1.75]" style={{ color: "#444" }}>
                      <p>
                        AI is embedded in how I build.{" "}
                        <strong style={{ color: "#111", fontWeight: 600 }}>Cursor</strong> and{" "}
                        <strong style={{ color: "#111", fontWeight: 600 }}>Claude Code</strong> are my primary
                        development environment for architectural reasoning, multi-file refactors, and debugging — not
                        just autocomplete. I use{" "}
                        <strong style={{ color: "#111", fontWeight: 600 }}>v0</strong> for rapid component scaffolding
                        and{" "}
                        <strong style={{ color: "#111", fontWeight: 600 }}>CodeRabbit</strong> for automated review,
                        even on solo projects.
                      </p>
                      <p>
                        I also build AI directly into products. The chat widget on this site streams responses from an
                        edge runtime, uses prompt caching to reduce token cost, applies Redis-based rate limiting, and is
                        grounded in a curated knowledge base to prevent hallucinated facts about me. I chose a smaller,
                        faster model deliberately because model selection is a latency, cost, and reliability decision.
                      </p>
                      <p>
                        At <strong style={{ color: "#111", fontWeight: 600 }}>Agent-Techs</strong>, I built multi-agent
                        orchestration and RAG pipelines using{" "}
                        <strong style={{ color: "#111", fontWeight: 600 }}>LangChain</strong>,{" "}
                        <strong style={{ color: "#111", fontWeight: 600 }}>FAISS</strong>, and dense embeddings for
                        entity resolution across healthcare, finance, and supply-chain data, with human-in-the-loop
                        checkpoints for regulated domains.
                      </p>
                      <p>
                        I treat AI reliability like system reliability: evals, observability, guardrails,
                        prompt-injection defenses, and the assumption that models will sometimes be confidently wrong.
                        The skill is not just prompting — it is knowing what good output looks like and catching failures
                        before users do.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "ai" && <GroupedTools groups={AI_TOOLS} />}

                {activeTab === "languages" && (
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((p) => (
                      <PillBadge key={p.name} {...p} />
                    ))}
                  </div>
                )}

                {activeTab === "software" && <GroupedTools groups={SOFTWARE} />}
                {activeTab === "infrastructure" && <GroupedTools groups={INFRA} />}
                {activeTab === "data" && <GroupedTools groups={DATA_TOOLS} />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}