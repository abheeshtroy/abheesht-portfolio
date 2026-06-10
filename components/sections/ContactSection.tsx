"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.07]";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-6 sm:px-10 max-w-2xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <p className="font-mono text-xs text-indigo-400/70 tracking-widest uppercase mb-3">
          Get in touch
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Let&apos;s talk
        </h2>
        <p className="text-white/40 text-base mt-3 max-w-lg leading-relaxed">
          Have a role, a project, or just want to argue about system design?
          I&apos;m all ears.
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8"
      >
        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
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
            <h3 className="text-xl font-semibold text-white mb-2">
              Message sent
            </h3>
            <p className="text-white/40 text-sm">
              I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setFormState("idle")}
              className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-white/60 mb-1.5"
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

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-white/60 mb-1.5"
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

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-white/60 mb-1.5"
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

            {/* Error */}
            {formState === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {errorMessage}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "sending"}
              className="w-full py-3 px-6 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === "sending" ? (
                <span className="flex items-center justify-center gap-2">
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
                "Send message"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
