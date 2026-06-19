"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "about", href: "#about", id: "about" },
  { label: "projects", href: "#projects", id: "projects" },
  { label: "experience", href: "#experience", id: "experience" },
  { label: "contact", href: "#contact", id: "contact" },
];

type NavLinkItem = (typeof navLinks)[number];

function NavLink({ link, isActive }: { link: NavLinkItem; isActive: boolean }) {
  return (
    <a
      href={link.href}
      data-cursor-snap
      className={`relative font-mono text-xs tracking-widest transition-colors duration-200 pb-1 ${
        !isActive ? "nav-link" : ""
      }`}
      style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      {link.label}
      {isActive ? (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, var(--indigo), var(--cyan))",
          }}
          transition={{ duration: 0.25, ease: "easeOut" as const }}
        />
      ) : null}
    </a>
  );
}

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const hasScrolled = useRef(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transitioning");
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 80) {
        hasScrolled.current = true;
      } else {
        hasScrolled.current = false;
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Nav: could not find #${id}`);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasScrolled.current) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const barSolid = scrolled || menuOpen;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: barSolid ? "var(--nav-bg)" : "transparent",
        backdropFilter: barSolid ? "blur(12px)" : "none",
        WebkitBackdropFilter: barSolid ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled && !menuOpen ? "var(--nav-border)" : "transparent"}`,
        willChange: "background",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="group relative flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--indigo) 50%, transparent)",
            boxShadow: "0 0 10px color-mix(in srgb, var(--indigo) 25%, transparent), 0 0 20px color-mix(in srgb, var(--indigo) 10%, transparent), inset 0 0 10px color-mix(in srgb, var(--indigo) 5%, transparent)",
            background: "color-mix(in srgb, var(--indigo) 6%, transparent)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--indigo) 80%, transparent)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px color-mix(in srgb, var(--indigo) 40%, transparent), 0 0 32px color-mix(in srgb, var(--indigo) 15%, transparent), inset 0 0 12px color-mix(in srgb, var(--indigo) 8%, transparent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--indigo) 50%, transparent)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 10px color-mix(in srgb, var(--indigo) 25%, transparent), 0 0 20px color-mix(in srgb, var(--indigo) 10%, transparent), inset 0 0 10px color-mix(in srgb, var(--indigo) 5%, transparent)";
          }}
        >
          <span
            className="font-mono text-sm tracking-widest transition-colors duration-200"
            style={{ color: "var(--text-primary)", opacity: 0.8 }}
          >
            AR
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} isActive={activeSection === link.id} />
          ))}
          <a
            href="/Abheesht_Roy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-snap
            className="relative font-mono text-xs tracking-widest transition-colors duration-200 pb-1 nav-link"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
          >
            resume
          </a>
          {mounted && (
            <button
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
              data-cursor-snap
              className="flex items-center justify-center transition-colors duration-200"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                background: "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <button
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
              className="flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex items-center justify-center"
            style={{ width: "40px", height: "40px" }}
          >
            <motion.span
              className="absolute"
              style={{ width: "20px", height: "1.5px", borderRadius: "2px", background: "var(--text-primary)", opacity: 0.8 }}
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
            />
            <motion.span
              className="absolute"
              style={{ width: "20px", height: "1.5px", borderRadius: "2px", background: "var(--text-primary)", opacity: 0.8 }}
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="md:hidden overflow-hidden"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--nav-border)",
            }}
          >
            <div className="px-6 py-3 flex flex-col">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.25, ease: "easeOut" as const }}
                    className="relative font-mono text-sm tracking-widest py-3 pl-4"
                    style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator-mobile"
                        className="absolute left-0 top-1/2"
                        style={{
                          width: "2px",
                          height: "18px",
                          marginTop: "-9px",
                          borderRadius: "2px",
                          background: "linear-gradient(180deg, var(--indigo), var(--cyan))",
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" as const }}
                      />
                    ) : null}
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="/Abheesht_Roy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.25, ease: "easeOut" as const }}
                className="relative font-mono text-sm tracking-widest py-3 pl-4"
                style={{ color: "var(--text-muted)" }}
              >
                resume
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
