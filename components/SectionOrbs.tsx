// Reusable ambient orb field. Drop inside any section that has
// `isolation: isolate` and content wrapped in `relative z-10`.
export default function SectionOrbs() {
  const orbs = [
    { c: "#6366f1", o: 0.2,  s: 600, top: "-6%",  left: "-6%" },
    { c: "#3b82f6", o: 0.14, s: 500, top: "8%",   left: "62%" },
    { c: "#a855f7", o: 0.12, s: 480, top: "30%",  left: "20%" },
    { c: "#22d3ee", o: 0.13, s: 460, top: "42%",  left: "68%" },
    { c: "#6366f1", o: 0.15, s: 540, top: "62%",  left: "-4%" },
    { c: "#22d3ee", o: 0.11, s: 500, top: "80%",  left: "60%" },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.s,
            height: orb.s,
            top: orb.top,
            left: orb.left,
            backgroundColor: orb.c,
            opacity: orb.o,
            filter: "blur(120px)",
          }}
        />
      ))}
    </div>
  );
}
