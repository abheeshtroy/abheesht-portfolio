import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Nav />
      <Hero />
    </main>
  );
}


