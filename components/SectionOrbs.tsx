"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const darkOrbs = [
  { r: 99,  g: 102, b: 241, o: 0.22, s: 600, top: "-6%",  left: "-6%"  },
  { r: 59,  g: 130, b: 246, o: 0.16, s: 500, top: "8%",   left: "62%"  },
  { r: 168, g: 85,  b: 247, o: 0.14, s: 480, top: "30%",  left: "20%"  },
  { r: 34,  g: 211, b: 238, o: 0.15, s: 460, top: "42%",  left: "68%"  },
  { r: 99,  g: 102, b: 241, o: 0.17, s: 540, top: "62%",  left: "-4%"  },
  { r: 34,  g: 211, b: 238, o: 0.13, s: 500, top: "80%",  left: "60%"  },
];

const lightOrbs = [
  { r: 245, g: 225, b: 195, o: 0.35, s: 650, top: "-6%",  left: "-6%"  },
  { r: 235, g: 210, b: 185, o: 0.28, s: 550, top: "8%",   left: "62%"  },
  { r: 245, g: 225, b: 195, o: 0.25, s: 520, top: "30%",  left: "20%"  },
  { r: 235, g: 210, b: 185, o: 0.28, s: 500, top: "42%",  left: "68%"  },
  { r: 245, g: 225, b: 195, o: 0.32, s: 580, top: "62%",  left: "-4%"  },
  { r: 235, g: 210, b: 185, o: 0.25, s: 550, top: "80%",  left: "60%"  },
];

export default function SectionOrbs() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";
  const orbs = isLight ? lightOrbs : darkOrbs;
  const blend = isLight ? "normal" : "screen";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      {orbs.map(({ r, g, b, o, s, top, left }, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s,
            height: s,
            top,
            left,
            background: `radial-gradient(circle,
              rgba(${r},${g},${b},${o}) 0%,
              rgba(${r},${g},${b},${+(o * 0.55).toFixed(3)}) 30%,
              rgba(${r},${g},${b},${+(o * 0.18).toFixed(3)}) 58%,
              rgba(${r},${g},${b},0) 75%)`,
            filter: "blur(48px)",
            mixBlendMode: blend,
            transition: "background 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}
