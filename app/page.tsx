import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <ContactSection />
    </main>
  );
}
