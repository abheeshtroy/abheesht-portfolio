import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/#projects"
          className="font-mono text-xs text-white/30 hover:text-white/70 transition-colors flex items-center gap-1.5 mb-12"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          back to projects
        </Link>

        {/* Terminal topbar */}
        <div
          className="rounded-t-xl flex items-center gap-2 px-4 py-2"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid var(--border)",
            borderBottom: "none",
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--border)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--border)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs text-white/25 ml-1">
            {project.filename}
          </span>
        </div>

        {/* Header card */}
        <div
          className="rounded-b-xl p-6 mb-10"
          style={{
            background: "var(--surface)",
            border: "0.5px solid var(--border)",
            borderLeft: `3px solid ${project.accentColor}`,
          }}
        >
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-2xl font-semibold text-white/90">
              {project.title}
            </h1>
            <span className="font-mono text-xs text-white/25">
              {project.year}
            </span>
          </div>
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs px-3 py-2.5 rounded-lg mb-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid var(--border)",
            }}
          >
            <span className="text-white/25">stack</span>
            <span style={{ color: "#60a5fa" }}>{project.stack}</span>
            {project.impact && (
              <>
                <span className="text-white/25">impact</span>
                <span style={{ color: "#4ade80" }}>{project.impact}</span>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-1 rounded"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid var(--border)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {project.overview && (
            <section>
              <p className="font-mono text-xs tracking-widest text-white/25 mb-3">
                overview
              </p>
              <p className="text-white/65 leading-relaxed">{project.overview}</p>
            </section>
          )}

          {project.problem && (
            <section>
              <p className="font-mono text-xs tracking-widest text-white/25 mb-3">
                the problem
              </p>
              <p className="text-white/65 leading-relaxed">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <p className="font-mono text-xs tracking-widest text-white/25 mb-3">
                the solution
              </p>
              <p className="text-white/65 leading-relaxed">{project.solution}</p>
            </section>
          )}

          {project.architecture && project.architecture.length > 0 && (
            <section>
              <p className="font-mono text-xs tracking-widest text-white/25 mb-3">
                architecture
              </p>
              <div className="space-y-2">
                {project.architecture.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className="font-mono text-xs mt-1 shrink-0"
                      style={{ color: project.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.results && project.results.length > 0 && (
            <section>
              <p className="font-mono text-xs tracking-widest text-white/25 mb-3">
                results
              </p>
              <div className="space-y-2">
                {project.results.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className="text-xs mt-1 shrink-0"
                      style={{ color: "#4ade80" }}
                    >
                      ✓
                    </span>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          {(project.github || project.live) && (
            <section
              className="pt-6"
              style={{ borderTop: "0.5px solid var(--border)" }}
            >
              <div className="flex gap-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/40 hover:text-white/80 transition-colors flex items-center gap-1.5"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    view on github
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/40 hover:text-white/80 transition-colors flex items-center gap-1.5"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    live demo
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}