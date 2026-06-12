// Page-wide ambient color field. Sits behind all sections at -z-10.
export default function AmbientBackground() {
  const orbs = [
    { r: 99,  g: 102, b: 241, o: 0.20, w: 600, h: 600, top: "3%",  left: "-8%",  right: undefined },
    { r: 34,  g: 211, b: 238, o: 0.15, w: 520, h: 520, top: "20%", left: undefined, right: "-6%" },
    { r: 168, g: 85,  b: 247, o: 0.13, w: 480, h: 480, top: "45%", left: "32%",  right: undefined },
    { r: 99,  g: 102, b: 241, o: 0.15, w: 560, h: 560, top: "68%", left: "-5%",  right: undefined },
    { r: 34,  g: 211, b: 238, o: 0.12, w: 500, h: 500, top: "85%", left: undefined, right: "-8%" },
  ];

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {orbs.map(({ r, g, b, o, w, h, top, left, right }, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: w,
            height: h,
            top,
            ...(left  != null ? { left  } : {}),
            ...(right != null ? { right } : {}),
            background: `radial-gradient(circle,
              rgba(${r},${g},${b},${o}) 0%,
              rgba(${r},${g},${b},${+(o * 0.55).toFixed(3)}) 30%,
              rgba(${r},${g},${b},${+(o * 0.18).toFixed(3)}) 58%,
              rgba(${r},${g},${b},0) 75%)`,
            filter: "blur(48px)",
          }}
        />
      ))}
    </div>
  );
}
