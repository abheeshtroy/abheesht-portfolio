"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionOrbs from "@/components/SectionOrbs";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong.");
        setFormState("error");
        return;
      }
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("Network error. Please try again.");
      setFormState("error");
    }
  };

  const inputClasses = [
    "w-full rounded-2xl px-4 py-3.5",
    "bg-[var(--surface-overlay)]",
    "border border-[var(--glass-border)]",
    "text-[var(--text-primary)] placeholder-[var(--text-muted)]",
    "outline-none transition-all duration-300",
    "focus:border-[var(--border)] focus:bg-[var(--surface-overlay)]",
    "focus:shadow-[0_0_20px_color-mix(in_srgb,var(--indigo)_8%,transparent)]",
    "disabled:opacity-40",
  ].join(" ");

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Ambient orbs */}
      <SectionOrbs />

      {/* Content — z-10, above orbs */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
      >
          <p className="font-mono text-xs text-[var(--indigo)] tracking-widest uppercase mb-3">
            Get in touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight">
            Let&apos;s talk
          </h2>
          <p className="text-[var(--text-secondary)] text-base mt-3 max-w-lg leading-relaxed">
            Have a role, a project, or just want to argue about system design?
            I&apos;m all ears.
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-3 italic tracking-wide">
            If you&apos;re hiring, the timing is good.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-7 sm:p-9 light-card-shadow"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(40px) saturate(1.5)",
            WebkitBackdropFilter: "blur(40px) saturate(1.5)",
            border: "1px solid var(--glass-border)",
            boxShadow: "inset 0 1px 0 var(--surface-overlay)",
          }}
        >
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.15)",
                }}
              >
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Message sent
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-6 text-sm text-[var(--indigo)] hover:opacity-80 transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2 tracking-wide"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClasses}
                  disabled={formState === "sending"}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2 tracking-wide"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClasses}
                  disabled={formState === "sending"}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2 tracking-wide"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  className={`${inputClasses} resize-none`}
                  disabled={formState === "sending"}
                />
              </div>

              {formState === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errorMessage}
                </motion.p>
              )}

              <button
                type="submit"
                data-cursor-snap
                disabled={formState === "sending"}
                className="w-full py-3.5 px-6 rounded-2xl font-medium text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, var(--indigo), color-mix(in srgb, var(--indigo) 85%, #000))",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid color-mix(in srgb, var(--indigo) 40%, transparent)",
                  boxShadow:
                    "0 0 20px color-mix(in srgb, var(--indigo) 30%, transparent)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                {formState === "sending" ? (
                  <span className="relative flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <span className="relative">Send message</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
