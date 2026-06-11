"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="relative font-mono text-xs tracking-widest transition-colors duration-200 pb-1"
      style={{
        color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
      }}
    >
      {link.label}
      {isActive ? (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, #6366f1, #22d3ee)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" as const }}
        />
      ) : null}
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const hasScrolled = useRef(false);

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
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu when resizing up to desktop (prevents locked scroll)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Escape closes the menu
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
        background: barSolid ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: barSolid ? "blur(12px)" : "none",
        WebkitBackdropFilter: barSolid ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled && !menuOpen ? "rgba(255,255,255,0.05)" : "transparent"}`,
        willChange: "background",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — AR with glowing ring */}
        <a
          href="#"
          className="group relative flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(99,102,241,0.5)",
            boxShadow: "0 0 10px rgba(99,102,241,0.25), 0 0 20px rgba(99,102,241,0.1), inset 0 0 10px rgba(99,102,241,0.05)",
            background: "rgba(99,102,241,0.06)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.8)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(99,102,241,0.4), 0 0 32px rgba(99,102,241,0.15), inset 0 0 12px rgba(99,102,241,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 10px rgba(99,102,241,0.25), 0 0 20px rgba(99,102,241,0.1), inset 0 0 10px rgba(99,102,241,0.05)";
          }}
        >
          <span className="font-mono text-sm tracking-widest text-white/80 group-hover:text-white transition-colors duration-200">
            AR
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              isActive={activeSection === link.id}
            />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative flex items-center justify-center"
          style={{ width: "40px", height: "40px" }}
        >
          <motion.span
            className="absolute"
            style={{ width: "20px", height: "1.5px", borderRadius: "2px", background: "rgba(255,255,255,0.8)" }}
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
          />
          <motion.span
            className="absolute"
            style={{ width: "20px", height: "1.5px", borderRadius: "2px", background: "rgba(255,255,255,0.8)" }}
            animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
          />
        </button>
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
              background: "rgba(10,10,15,0.95)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                    style={{
                      color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                    }}
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
                          background: "linear-gradient(180deg, #6366f1, #22d3ee)",
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" as const }}
                      />
                    ) : null}
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
