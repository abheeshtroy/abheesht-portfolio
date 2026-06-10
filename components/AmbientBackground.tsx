// Page-wide ambient color field. Sits behind all sections at -z-10.
// Any section with a transparent background will refract these orbs.
export default function AmbientBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div
        className="absolute"
        style={{
          width: 600, height: 600, top: "3%", left: "-8%",
          background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 520, height: 520, top: "20%", right: "-6%",
          background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 480, height: 480, top: "45%", left: "32%",
          background: "radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 560, height: 560, top: "68%", left: "-5%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 500, height: 500, top: "85%", right: "-8%",
          background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
