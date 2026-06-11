"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionOrbs from "@/components/SectionOrbs";

const rolePrompts: Record<string, string> = {
  "agent-techs": "What did Abheesht own end-to-end at Agent-Techs?",
  "desknow": "What did the youngest engineer at DeskNow end up responsible for?",
  "samsung": "What did he actually own on the Samsung TCON project?",
  "atthah": "What did he own at Atthah while learning the whole stack?",
  "ncsm": "What was Abheesht's piece of the IEEE museum research?",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Highlight {
  metric: string;
  label: string;
}

interface Theme {
  cardBg: string;
  cardBgOpen: string;
  borderCollapsed: string;
  borderOpen: string;
  glowOpen: string;
  dotColor: string;
  dotGlow: string;
  connectorOpen: string;
  chipColor: string;
  chipBg: string;
  chipBorder: string;
  metricColor: string;
  highlightsBg: string;
  divider: string;
}

interface Role {
  id: string;
  companyNode: React.ReactNode;
  title: string;
  period: string;
  location: string;
  theme: Theme;
  shortBlurb: string;
  body: string[];
  highlights: Highlight[];
  tags: string[];
  HeaderSVG: React.FC<{ id: string }>;
  ExpandedSVG: React.FC<{ id: string }>;
}

// ─── Themes ───────────────────────────────────────────────────────────────────

const T: Record<string, Theme> = {
  samsung: {
    cardBg: "rgba(8,9,28,0.92)",
    cardBgOpen: "rgba(8,9,28,0.98)",
    borderCollapsed: "rgba(20,40,160,0.25)",
    borderOpen: "rgba(20,40,160,0.65)",
    glowOpen: "0 0 40px rgba(20,40,160,0.22), inset 0 1px 0 rgba(20,40,160,0.35)",
    dotColor: "#1428A0",
    dotGlow: "rgba(20,40,160,0.55)",
    connectorOpen: "rgba(20,40,160,0.4)",
    chipColor: "#5b8af5",
    chipBg: "rgba(20,40,160,0.15)",
    chipBorder: "rgba(20,40,160,0.35)",
    metricColor: "#4a7cf5",
    highlightsBg: "rgba(20,40,160,0.1)",
    divider: "rgba(20,40,160,0.22)",
  },
  agentTechs: {
    cardBg: "rgba(2,8,20,0.92)",
    cardBgOpen: "rgba(2,8,22,0.98)",
    borderCollapsed: "rgba(30,120,255,0.18)",
    borderOpen: "rgba(40,140,255,0.52)",
    glowOpen: "0 0 50px rgba(30,120,255,0.18), inset 0 1px 0 rgba(40,160,255,0.18)",
    dotColor: "#3b82f6",
    dotGlow: "rgba(59,130,246,0.65)",
    connectorOpen: "rgba(37,99,235,0.4)",
    chipColor: "#60a5fa",
    chipBg: "rgba(59,130,246,0.1)",
    chipBorder: "rgba(59,130,246,0.28)",
    metricColor: "#60a5fa",
    highlightsBg: "rgba(37,99,235,0.09)",
    divider: "rgba(37,99,235,0.18)",
  },
  desknow: {
    cardBg: "rgba(4,18,20,0.88)",
    cardBgOpen: "rgba(4,20,22,0.96)",
    borderCollapsed: "rgba(20,180,160,0.18)",
    borderOpen: "rgba(20,200,180,0.48)",
    glowOpen: "0 0 35px rgba(20,180,160,0.14), inset 0 1px 0 rgba(20,200,180,0.22)",
    dotColor: "#14b8a6",
    dotGlow: "rgba(20,184,166,0.6)",
    connectorOpen: "rgba(20,184,166,0.4)",
    chipColor: "#2dd4bf",
    chipBg: "rgba(20,184,166,0.1)",
    chipBorder: "rgba(20,184,166,0.28)",
    metricColor: "#2dd4bf",
    highlightsBg: "rgba(20,184,166,0.07)",
    divider: "rgba(20,184,166,0.18)",
  },
  atthah: {
    cardBg: "rgba(12,4,18,0.92)",
    cardBgOpen: "rgba(14,4,22,0.98)",
    borderCollapsed: "rgba(200,30,180,0.18)",
    borderOpen: "rgba(220,50,200,0.5)",
    glowOpen: "0 0 50px rgba(200,30,180,0.18), inset 0 1px 0 rgba(220,100,200,0.25)",
    dotColor: "#d946ef",
    dotGlow: "rgba(217,70,239,0.6)",
    connectorOpen: "rgba(217,70,239,0.4)",
    chipColor: "#e879f9",
    chipBg: "rgba(217,70,239,0.1)",
    chipBorder: "rgba(217,70,239,0.28)",
    metricColor: "#e879f9",
    highlightsBg: "rgba(217,70,239,0.07)",
    divider: "rgba(217,70,239,0.18)",
  },
  ncsm: {
    cardBg: "rgba(4,4,20,0.92)",
    cardBgOpen: "rgba(5,4,24,0.98)",
    borderCollapsed: "rgba(99,60,220,0.22)",
    borderOpen: "rgba(120,80,240,0.52)",
    glowOpen: "0 0 50px rgba(99,60,220,0.18), inset 0 1px 0 rgba(140,100,255,0.25)",
    dotColor: "#a78bfa",
    dotGlow: "rgba(167,139,250,0.6)",
    connectorOpen: "rgba(124,58,237,0.4)",
    chipColor: "#c4b5fd",
    chipBg: "rgba(139,92,246,0.1)",
    chipBorder: "rgba(139,92,246,0.28)",
    metricColor: "#a78bfa",
    highlightsBg: "rgba(109,40,217,0.09)",
    divider: "rgba(109,40,217,0.22)",
  },
};

// ─── SVG Overlays ─────────────────────────────────────────────────────────────

const SamsungHeaderSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 640 82" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-sh-l`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#08091c" stopOpacity="0.98" />
        <stop offset="48%" stopColor="#08091c" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-sh-b`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="55%" stopColor="#08091c" stopOpacity="0" />
        <stop offset="100%" stopColor="#08091c" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect x="340" y="4" width="293" height="74" rx="2" stroke="#1428A0" strokeWidth="0.8" strokeOpacity="0.4" />
    {[348, 389, 430, 471, 512].map((x, i) => (
      <rect key={i} x={x} y="11" width={i === 4 ? 113 : 37} height="46" rx="1"
        fill="#1428A0" fillOpacity="0.2" stroke="#1428A0" strokeWidth="0.55" strokeOpacity="0.45" />
    ))}
    <rect x="348" y="61" width="102" height="13" rx="1" fill="#1428A0" fillOpacity="0.28" stroke="#1428A0" strokeWidth="0.5" strokeOpacity="0.5" />
    {[454, 483, 512].map((x, i) => (
      <rect key={i} x={x} y="61" width="25" height="13"
        fill="#1428A0" fillOpacity="0.14" stroke="#1428A0" strokeWidth="0.4" strokeOpacity="0.35" />
    ))}
    <rect x="541" y="61" width="84" height="13" fill="#1428A0" fillOpacity="0.14" stroke="#1428A0" strokeWidth="0.4" strokeOpacity="0.35" />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-sh-l)`} />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-sh-b)`} />
  </svg>
);

const SamsungExpandedSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", top: 0, right: 0, width: "48%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 220 520" preserveAspectRatio="xMaxYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-se-f`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#08091c" stopOpacity="1" />
        <stop offset="38%" stopColor="#08091c" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="22" y="18" width="188" height="272" rx="2" stroke="#1428A0" strokeWidth="0.9" strokeOpacity="0.4" />
    {[30, 66, 102, 138, 174].map((x, i) => (
      <rect key={i} x={x} y="26" width={i === 4 ? 28 : 32} height="104" rx="1"
        fill="#1428A0" fillOpacity="0.2" stroke="#1428A0" strokeWidth="0.6" strokeOpacity="0.5" />
    ))}
    <rect x="30" y="136" width="102" height="146" rx="1" fill="#1428A0" fillOpacity="0.26" stroke="#1428A0" strokeWidth="0.7" strokeOpacity="0.55" />
    {[150, 165, 180, 196, 211].map((y) => (
      <line key={y} x1="36" y1={y} x2="126" y2={y} stroke="#1428A0" strokeWidth="0.45" strokeOpacity="0.32" />
    ))}
    {[70, 98].map((x) => (
      <line key={x} x1={x} y1="136" x2={x} y2="282" stroke="#1428A0" strokeWidth="0.4" strokeOpacity="0.28" />
    ))}
    <rect x="138" y="136" width="30" height="146" fill="#1428A0" fillOpacity="0.13" stroke="#1428A0" strokeWidth="0.5" strokeOpacity="0.35" />
    <rect x="172" y="136" width="30" height="146" fill="#1428A0" fillOpacity="0.13" stroke="#1428A0" strokeWidth="0.5" strokeOpacity="0.35" />
    {Array.from({ length: 13 }).map((_, i) => (
      <rect key={i} x={30 + i * 14} y="288" width="9" height="4" fill="#1428A0" fillOpacity="0.5" />
    ))}
    <rect x="0" y="0" width="220" height="520" fill={`url(#${id}-se-f)`} />
  </svg>
);

const scatterPoints = [
  { cx: 68, cy: 28, r: 4.5, o: 0.68 }, { cx: 96, cy: 16, r: 3, o: 0.5 },
  { cx: 84, cy: 46, r: 3.5, o: 0.58 }, { cx: 112, cy: 34, r: 2.5, o: 0.4 },
  { cx: 128, cy: 14, r: 3, o: 0.5 }, { cx: 148, cy: 50, r: 5.5, o: 0.72 },
  { cx: 168, cy: 28, r: 3, o: 0.5 }, { cx: 178, cy: 60, r: 4, o: 0.55 },
  { cx: 158, cy: 74, r: 2.5, o: 0.4 }, { cx: 192, cy: 70, r: 3, o: 0.45 },
  { cx: 88, cy: 86, r: 4, o: 0.6 }, { cx: 110, cy: 74, r: 3, o: 0.45 },
  { cx: 130, cy: 94, r: 3.5, o: 0.5 }, { cx: 106, cy: 108, r: 2.5, o: 0.35 },
  { cx: 155, cy: 86, r: 3.5, o: 0.55 }, { cx: 175, cy: 100, r: 2.5, o: 0.4 },
  { cx: 62, cy: 66, r: 2, o: 0.28 }, { cx: 198, cy: 42, r: 2.5, o: 0.3 },
  { cx: 145, cy: 112, r: 2, o: 0.28 },
];
const scatterEdges = [
  [0,1],[0,2],[1,4],[2,3],[3,5],[5,6],[5,7],[7,8],[6,7],[8,9],
  [10,11],[11,13],[11,14],[12,15],[14,15],[3,10],[9,12],[16,10],[1,16],
];

const AgentHeaderSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 640 82" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-ah-l`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#02081a" stopOpacity="0.98" />
        <stop offset="28%" stopColor="#02081a" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-ah-b`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="50%" stopColor="#02081a" stopOpacity="0" />
        <stop offset="100%" stopColor="#02081a" stopOpacity="1" />
      </linearGradient>
    </defs>
    {scatterEdges.map(([a, b], i) => (
      <line key={i} x1={scatterPoints[a].cx * 3.2 + 80} y1={scatterPoints[a].cy * 0.62}
        x2={scatterPoints[b].cx * 3.2 + 80} y2={scatterPoints[b].cy * 0.62}
        stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.18" />
    ))}
    {scatterPoints.map((p, i) => (
      <circle key={i} cx={p.cx * 3.2 + 80} cy={p.cy * 0.62} r={p.r * 1.1}
        fill="#3b82f6" fillOpacity={p.cx < 90 ? p.o * 0.25 : p.o * 0.85} />
    ))}
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-ah-l)`} />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-ah-b)`} />
  </svg>
);

const AgentExpandedSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", top: 0, right: 0, width: "48%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 220 520" preserveAspectRatio="xMaxYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-ae-f`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#02081a" stopOpacity="1" />
        <stop offset="36%" stopColor="#02081a" stopOpacity="0" />
      </linearGradient>
    </defs>
    {scatterEdges.map(([a, b], i) => (
      <line key={i} x1={scatterPoints[a].cx} y1={scatterPoints[a].cy * 4.2}
        x2={scatterPoints[b].cx} y2={scatterPoints[b].cy * 4.2}
        stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.2" />
    ))}
    {scatterPoints.map((p, i) => (
      <circle key={i} cx={p.cx} cy={p.cy * 4.2} r={p.r} fill="#3b82f6" fillOpacity={p.o} />
    ))}
    <rect x="0" y="0" width="220" height="520" fill={`url(#${id}-ae-f)`} />
  </svg>
);

const DeskHeaderSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 640 82" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-dh-l`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#04121a" stopOpacity="0.98" />
        <stop offset="48%" stopColor="#04121a" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-dh-b`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="50%" stopColor="#04121a" stopOpacity="0" />
        <stop offset="100%" stopColor="#04121a" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect x="340" y="5" width="292" height="72" rx="1" stroke="#14b8a6" strokeWidth="0.7" strokeOpacity="0.3" />
    <line x1="490" y1="5" x2="490" y2="77" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.25" />
    <line x1="340" y1="44" x2="490" y2="44" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.25" />
    <line x1="490" y1="52" x2="632" y2="52" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.25" />
    {[[352,12],[376,12],[400,12],[424,12],[352,28],[376,28],[400,28],[424,28]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="18" height="10" rx="1"
        fill="#14b8a6" fillOpacity="0.12" stroke="#14b8a6" strokeWidth="0.45" strokeOpacity="0.38" />
    ))}
    {[[352,52],[376,52],[400,52],[424,52],[448,52]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="16" height="9" rx="1"
        fill="#14b8a6" fillOpacity="0.1" stroke="#14b8a6" strokeWidth="0.4" strokeOpacity="0.35" />
    ))}
    <rect x="504" y="10" width="82" height="38" rx="4"
      fill="#14b8a6" fillOpacity="0.06" stroke="#14b8a6" strokeWidth="0.45" strokeOpacity="0.3" />
    {[[508,8],[522,8],[536,8],[550,8],[564,8],[578,8],[584,20],[584,32],[508,50],[522,50],[536,50],[550,50],[564,50],[578,50]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="#14b8a6" fillOpacity="0.14" stroke="#14b8a6" strokeWidth="0.35" strokeOpacity="0.35" />
    ))}
    {[[596,58],[610,58],[624,58],[596,70],[610,70]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="14" height="8" rx="1"
        fill="#14b8a6" fillOpacity="0.1" stroke="#14b8a6" strokeWidth="0.4" strokeOpacity="0.32" />
    ))}
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-dh-l)`} />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-dh-b)`} />
  </svg>
);

const DeskExpandedSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", top: 0, right: 0, width: "48%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 220 520" preserveAspectRatio="xMaxYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-de-f`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#04121a" stopOpacity="1" />
        <stop offset="38%" stopColor="#04121a" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="18" y="18" width="192" height="484" rx="1" stroke="#14b8a6" strokeWidth="0.7" strokeOpacity="0.3" />
    <line x1="108" y1="18" x2="108" y2="300" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.25" />
    <line x1="18" y1="200" x2="108" y2="200" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.25" />
    <line x1="108" y1="300" x2="210" y2="300" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.25" />
    {[[26,28],[50,28],[74,28],[26,52],[50,52],[74,52],[26,76],[50,76],[74,76]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="18" height="12" rx="1"
        fill="#14b8a6" fillOpacity="0.12" stroke="#14b8a6" strokeWidth="0.45" strokeOpacity="0.38" />
    ))}
    {[[26,216],[50,216],[74,216],[26,236],[50,236],[74,236]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="16" height="10" rx="1"
        fill="#14b8a6" fillOpacity="0.1" stroke="#14b8a6" strokeWidth="0.4" strokeOpacity="0.34" />
    ))}
    <rect x="120" y="28" width="80" height="52" rx="4"
      fill="#14b8a6" fillOpacity="0.06" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.3" />
    {[[124,24],[138,24],[152,24],[166,24],[180,24],[194,24],[196,40],[196,58],[124,84],[138,84],[152,84],[166,84],[180,84],[194,84]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="4" fill="#14b8a6" fillOpacity="0.14" stroke="#14b8a6" strokeWidth="0.35" strokeOpacity="0.35" />
    ))}
    {[[120,316],[144,316],[168,316],[192,316],[120,336],[144,336],[168,336],[192,336],[120,400],[144,400],[168,400],[192,400]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="16" height="10" rx="1"
        fill="#14b8a6" fillOpacity="0.1" stroke="#14b8a6" strokeWidth="0.4" strokeOpacity="0.32" />
    ))}
    <rect x="0" y="0" width="220" height="520" fill={`url(#${id}-de-f)`} />
  </svg>
);

const AtthahHeaderSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 640 82" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-ath-l`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0c0412" stopOpacity="0.98" />
        <stop offset="42%" stopColor="#0c0412" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-ath-b`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="52%" stopColor="#0c0412" stopOpacity="0" />
        <stop offset="100%" stopColor="#0c0412" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect x="370" y="8" width="66" height="66" rx="1" stroke="#d946ef" strokeWidth="0.7" strokeOpacity="0.45" />
    <rect x="404" y="-8" width="66" height="66" rx="1" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.22" />
    <line x1="370" y1="8" x2="404" y2="-8" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.32" />
    <line x1="436" y1="8" x2="470" y2="-8" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.32" />
    <line x1="436" y1="74" x2="470" y2="58" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.32" />
    <line x1="370" y1="74" x2="404" y2="58" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.32" />
    <line x1="370" y1="8" x2="436" y2="74" stroke="#d946ef" strokeWidth="0.3" strokeOpacity="0.14" />
    <line x1="436" y1="8" x2="370" y2="74" stroke="#d946ef" strokeWidth="0.3" strokeOpacity="0.14" />
    <circle cx="403" cy="41" r="2.5" fill="#d946ef" fillOpacity="0.55" />
    <rect x="490" y="14" width="50" height="50" rx="1" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.3" />
    <rect x="516" y="2" width="50" height="50" rx="1" stroke="#d946ef" strokeWidth="0.4" strokeOpacity="0.16" />
    <line x1="490" y1="14" x2="516" y2="2" stroke="#d946ef" strokeWidth="0.4" strokeOpacity="0.22" />
    <line x1="540" y1="14" x2="566" y2="2" stroke="#d946ef" strokeWidth="0.4" strokeOpacity="0.22" />
    <line x1="540" y1="64" x2="566" y2="52" stroke="#d946ef" strokeWidth="0.4" strokeOpacity="0.22" />
    <line x1="490" y1="64" x2="516" y2="52" stroke="#d946ef" strokeWidth="0.4" strokeOpacity="0.22" />
    <line x1="630" y1="2" x2="403" y2="41" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="4 4" />
    <line x1="630" y1="60" x2="403" y2="41" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="4 4" />
    <circle cx="630" cy="31" r="3" fill="#d946ef" fillOpacity="0.35" />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-ath-l)`} />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-ath-b)`} />
  </svg>
);

const AtthahExpandedSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", top: 0, right: 0, width: "48%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 220 520" preserveAspectRatio="xMaxYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-ate-f`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0c0412" stopOpacity="1" />
        <stop offset="36%" stopColor="#0c0412" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="50" y="80" width="120" height="120" rx="1" stroke="#d946ef" strokeWidth="0.8" strokeOpacity="0.45" />
    <rect x="88" y="44" width="120" height="120" rx="1" stroke="#d946ef" strokeWidth="0.55" strokeOpacity="0.24" />
    <line x1="50" y1="80" x2="88" y2="44" stroke="#d946ef" strokeWidth="0.55" strokeOpacity="0.35" />
    <line x1="170" y1="80" x2="208" y2="44" stroke="#d946ef" strokeWidth="0.55" strokeOpacity="0.35" />
    <line x1="170" y1="200" x2="208" y2="164" stroke="#d946ef" strokeWidth="0.55" strokeOpacity="0.35" />
    <line x1="50" y1="200" x2="88" y2="164" stroke="#d946ef" strokeWidth="0.55" strokeOpacity="0.35" />
    <line x1="50" y1="80" x2="170" y2="200" stroke="#d946ef" strokeWidth="0.3" strokeOpacity="0.14" />
    <line x1="170" y1="80" x2="50" y2="200" stroke="#d946ef" strokeWidth="0.3" strokeOpacity="0.14" />
    <circle cx="110" cy="140" r="3.5" fill="#d946ef" fillOpacity="0.55" />
    <rect x="70" y="280" width="80" height="80" rx="1" stroke="#d946ef" strokeWidth="0.6" strokeOpacity="0.32" />
    <rect x="96" y="256" width="80" height="80" rx="1" stroke="#d946ef" strokeWidth="0.45" strokeOpacity="0.18" />
    <line x1="70" y1="280" x2="96" y2="256" stroke="#d946ef" strokeWidth="0.45" strokeOpacity="0.26" />
    <line x1="150" y1="280" x2="176" y2="256" stroke="#d946ef" strokeWidth="0.45" strokeOpacity="0.26" />
    <line x1="150" y1="360" x2="176" y2="336" stroke="#d946ef" strokeWidth="0.45" strokeOpacity="0.26" />
    <line x1="70" y1="360" x2="96" y2="336" stroke="#d946ef" strokeWidth="0.45" strokeOpacity="0.26" />
    <circle cx="110" cy="320" r="2.5" fill="#d946ef" fillOpacity="0.4" />
    <line x1="110" y1="200" x2="110" y2="280" stroke="#d946ef" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 4" />
    <rect x="0" y="0" width="220" height="520" fill={`url(#${id}-ate-f)`} />
  </svg>
);

const ncsmStars = [
  { cx: 88, cy: 15, r: 3.5, o: 0.72 }, { cx: 114, cy: 28, r: 2.2, o: 0.56 },
  { cx: 142, cy: 16, r: 2.8, o: 0.62 }, { cx: 162, cy: 42, r: 2, o: 0.5 },
  { cx: 130, cy: 52, r: 3.2, o: 0.68 }, { cx: 100, cy: 60, r: 1.8, o: 0.46 },
  { cx: 152, cy: 72, r: 2.4, o: 0.56 }, { cx: 175, cy: 58, r: 1.6, o: 0.42 },
  { cx: 120, cy: 80, r: 2, o: 0.46 }, { cx: 165, cy: 88, r: 3, o: 0.62 },
  { cx: 94, cy: 40, r: 1, o: 0.35 }, { cx: 128, cy: 10, r: 0.9, o: 0.3 },
  { cx: 180, cy: 24, r: 1.1, o: 0.3 }, { cx: 148, cy: 38, r: 0.9, o: 0.28 },
  { cx: 108, cy: 92, r: 1, o: 0.3 }, { cx: 178, cy: 80, r: 0.9, o: 0.28 },
];
const ncsmEdges = [[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,7],[6,9],[8,9],[5,8]];

const NCSMHeaderSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 640 82" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-nh-l`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#040414" stopOpacity="0.98" />
        <stop offset="40%" stopColor="#040414" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-nh-b`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="52%" stopColor="#040414" stopOpacity="0" />
        <stop offset="100%" stopColor="#040414" stopOpacity="1" />
      </linearGradient>
    </defs>
    {ncsmEdges.map(([a, b], i) => (
      <line key={i} x1={ncsmStars[a].cx * 3.6 + 60} y1={ncsmStars[a].cy * 0.82}
        x2={ncsmStars[b].cx * 3.6 + 60} y2={ncsmStars[b].cy * 0.82}
        stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.22" />
    ))}
    {ncsmStars.map((s, i) => (
      <circle key={i} cx={s.cx * 3.6 + 60} cy={s.cy * 0.82} r={s.r * 1.15}
        fill="#a78bfa" fillOpacity={s.cx < 80 ? s.o * 0.2 : s.o * 0.9} />
    ))}
    <ellipse cx={130 * 3.6 + 60} cy={52 * 0.82} rx="68" ry="22"
      stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="2 3" />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-nh-l)`} />
    <rect x="0" y="0" width="640" height="82" fill={`url(#${id}-nh-b)`} />
  </svg>
);

const NCSMExpandedSVG: React.FC<{ id: string }> = ({ id }) => (
  <svg style={{ position: "absolute", top: 0, right: 0, width: "48%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 220 520" preserveAspectRatio="xMaxYMid slice" fill="none" aria-hidden>
    <defs>
      <linearGradient id={`${id}-ne-f`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#040414" stopOpacity="1" />
        <stop offset="36%" stopColor="#040414" stopOpacity="0" />
      </linearGradient>
    </defs>
    {ncsmEdges.map(([a, b], i) => (
      <line key={i} x1={ncsmStars[a].cx} y1={ncsmStars[a].cy * 5.2}
        x2={ncsmStars[b].cx} y2={ncsmStars[b].cy * 5.2}
        stroke="#a78bfa" strokeWidth="0.6" strokeOpacity="0.24" />
    ))}
    {ncsmStars.map((s, i) => (
      <circle key={i} cx={s.cx} cy={s.cy * 5.2} r={s.r * 1.3} fill="#a78bfa" fillOpacity={s.o} />
    ))}
    <ellipse cx={130} cy={52 * 5.2} rx="38" ry="14"
      stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 3" />
    <rect x="0" y="0" width="220" height="520" fill={`url(#${id}-ne-f)`} />
  </svg>
);

// ─── Company name nodes ───────────────────────────────────────────────────────

const SamsungName = () => (
  <span style={{ fontFamily: "'Arial Narrow', Impact, 'Arial Black', sans-serif", fontWeight: 900, letterSpacing: "0.12em", fontSize: "15px", textTransform: "uppercase" as const }}>
    <span style={{ color: "white" }}>Samsung</span>
    <span style={{ color: "#5b8af5", opacity: 0.75 }}> Semiconductor</span>
  </span>
);

const PlainName = ({ name }: { name: string }) => (
  <span style={{ color: "white", fontSize: "15px", fontWeight: 600 }}>{name}</span>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const roles: Role[] = [
  {
    id: "agent-techs",
    companyNode: <PlainName name="Agent-Techs AI" />,
    title: "Applied AI Engineering Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Remote",
    theme: T.agentTechs,
    shortBlurb: "Built production multi-agent AI pipelines on GCP — FAISS vector search, LangChain orchestration, and a retrieval layer that cut query latency by 40%.",
    body: [
      "Joined a small applied AI team to build out their data harmonization pipeline from scratch. The core problem: heterogeneous health data coming in from multiple sources, none of it agreeing on schema, identifiers, or units.",
      "Designed and shipped a multi-agent orchestration system using LangChain — one agent for extraction, one for normalization, one for conflict resolution. Deployed on GCP Cloud Run with FAISS-backed semantic search for entity matching across documents.",
      "The retrieval layer was the interesting part. Off-the-shelf embeddings weren't precise enough for medical terminology, so I fine-tuned a domain adapter and combined it with a BM25 re-ranking pass. End result: 40% reduction in query latency and match accuracy that cleared the team's bar for production.",
    ],
    highlights: [
      { metric: "40%", label: "Query latency reduction" },
      { metric: "3×", label: "Pipeline throughput" },
      { metric: "Multi-agent", label: "LangChain orchestration" },
    ],
    tags: ["LangChain", "FAISS", "GCP Cloud Run", "Python", "Multi-agent"],
    HeaderSVG: AgentHeaderSVG,
    ExpandedSVG: AgentExpandedSVG,
  },
  {
    id: "desknow",
    companyNode: <PlainName name="DeskNow" />,
    title: "Software Engineer",
    period: "Sep 2023 – Jul 2024",
    location: "Remote",
    theme: T.desknow,
    shortBlurb: "Full-stack SWE at a European workspace booking platform — Node.js backend, PostgreSQL, 20+ enterprise clients, and a production incident that taught me more than any course.",
    body: [
      "DeskNow was a B2B workspace booking platform in scale-up mode when I joined. My work spanned the full stack: REST APIs in Node.js, a PostgreSQL data layer, and a React frontend for the admin dashboard.",
      "The work I'm most proud of wasn't a feature — it was an incident. A race condition in the booking service was causing double-reservations for high-demand slots under concurrent load. I traced it through the logs, reproduced it locally under simulated concurrency, and patched it with advisory locks and an idempotency key pattern.",
      "On the product side, I owned the integrations layer for enterprise clients — calendar sync, SSO, webhook delivery. By the time I left we were live with 20+ enterprise accounts.",
    ],
    highlights: [
      { metric: "20+", label: "Enterprise clients" },
      { metric: "Race condition", label: "Concurrent booking fix" },
      { metric: "SSO + webhooks", label: "Enterprise integrations" },
    ],
    tags: ["Node.js", "PostgreSQL", "React", "TypeScript", "REST APIs"],
    HeaderSVG: DeskHeaderSVG,
    ExpandedSVG: DeskExpandedSVG,
  },
  {
    id: "samsung",
    companyNode: <SamsungName />,
    title: "Embedded Systems Engineer",
    period: "Jan 2023 – Jul 2023",
    location: "Bangalore, India",
    theme: T.samsung,
    shortBlurb: "Hardware diagnostic tooling in C++/PyQt for chip validation across 3+ silicon variants — including a thread contention bug that only surfaced under one specific I2C sequence.",
    body: [
      "Embedded at Samsung Semiconductor's device diagnostics team, working on tooling for hardware validation engineers to test chip behavior across pre-release silicon variants.",
      "The main project was a cross-platform diagnostic GUI in C++ and PyQt — wrapping low-level I2C/SPI communication protocols behind a test runner interface that validation engineers could use without digging into register maps.",
      "The memorable moment: a thread contention bug that only surfaced on one of three chip variants under a specific I2C read sequence at high frequency. Root cause was an unguarded shared register access when two threads hit the same bus simultaneously. Fixed with a mutex scoped to the transaction. Three days of digging. Worth it.",
    ],
    highlights: [
      { metric: "3+", label: "Chip variants supported" },
      { metric: "C++ / PyQt", label: "Diagnostic GUI" },
      { metric: "I2C / SPI", label: "Low-level protocols" },
    ],
    tags: ["C++", "PyQt", "I2C / SPI", "Embedded Systems", "Multithreading"],
    HeaderSVG: SamsungHeaderSVG,
    ExpandedSVG: SamsungExpandedSVG,
  },
  {
    id: "atthah",
    companyNode: <PlainName name="Atthah Infomedia" />,
    title: "Backend Engineer",
    period: "May 2022 – Jul 2022",
    location: "Remote",
    theme: T.atthah,
    shortBlurb: "Real-time backend for an immersive experience studio — MERN stack, Socket.io, 500+ concurrent users, sub-200ms latency at peak broadcast load.",
    body: [
      "Atthah was a media-tech studio building live audience engagement infrastructure for spatial and immersive brand experiences. I came in to help shore up the backend before a major product launch.",
      "The core technical work was around the real-time layer — WebSocket connections via Socket.io on a Node.js backend, with MongoDB handling the event log and React on the frontend. The challenge was keeping latency under 200ms when concurrent user counts spiked during live broadcast windows.",
      "We got there through connection pooling tuning, event batching on the emitter side, and horizontal scaling behind a load balancer. Peak load hit 500+ concurrent users without the latency budgets blowing.",
    ],
    highlights: [
      { metric: "500+", label: "Concurrent users" },
      { metric: "<200ms", label: "Latency at peak load" },
      { metric: "Socket.io", label: "Real-time layer" },
    ],
    tags: ["Node.js", "Socket.io", "MongoDB", "React", "MERN"],
    HeaderSVG: AtthahHeaderSVG,
    ExpandedSVG: AtthahExpandedSVG,
  },
  {
    id: "ncsm",
    companyNode: <PlainName name="NCSM" />,
    title: "Research Intern",
    period: "May 2021 – Aug 2021",
    location: "Kolkata, India",
    theme: T.ncsm,
    shortBlurb: "IoT research at India's National Council of Science Museums — chatbot for museum accessibility, CNN crowd counting model, two IEEE publications.",
    body: [
      "My first research internship, at the National Council of Science Museums in Kolkata. The lab was working on making large public science spaces more accessible — visitors who can't read exhibit labels, staff trying to manage crowd density in real time.",
      "I built two things. A voice-accessible chatbot (Musoassist) that let visitors query exhibit information in natural language, deployed on Raspberry Pi hardware throughout the museum floor. And a Bayesian-enhanced CNN model for crowd density estimation from overhead camera feeds, trained on the ShanghaiTech dataset.",
      "Both projects made it to IEEE publications — RTEICT 2021 and INCON 2023. But more than the papers, this is where I got hooked on AI that operates in the real world, under real constraints, with real stakes. That thread runs through everything I've built since.",
    ],
    highlights: [
      { metric: "2×", label: "IEEE publications" },
      { metric: "CNN + Bayesian", label: "Crowd counting model" },
      { metric: "Raspberry Pi", label: "On-device deployment" },
    ],
    tags: ["Python", "TensorFlow", "IoT", "NLP", "IEEE"],
    HeaderSVG: NCSMHeaderSVG,
    ExpandedSVG: NCSMExpandedSVG,
  },
];

// ─── Timeline dot ─────────────────────────────────────────────────────────────

function TimelineDot({ theme, isActive }: { theme: Theme; isActive: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-4 h-4 mt-[18px]">
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 2.8, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ backgroundColor: theme.dotGlow }}
          />
        )}
      </AnimatePresence>
      <div
        className="w-4 h-4 rounded-full relative z-10 border-2 transition-all duration-300"
        style={{
          backgroundColor: isActive ? theme.dotColor : "#1c1c2a",
          borderColor: isActive ? theme.dotColor : "#2e2e3e",
          boxShadow: isActive ? `0 0 12px ${theme.dotGlow}` : "none",
        }}
      />
    </div>
  );
}

// ─── Role card ────────────────────────────────────────────────────────────────

function RoleCard({ role, index }: { role: Role; index: number }) {
   const [isOpen, setIsOpen] = useState(false);
   const cardRef = useRef<HTMLDivElement>(null);
   const { theme } = role;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <TimelineDot theme={theme} isActive={isOpen} />
        <div
          className="w-px flex-1 mt-2 min-h-8 transition-all duration-500"
          style={{
            backgroundColor: isOpen ? theme.connectorOpen : "rgba(255,255,255,0.05)",
          }}
        />
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <button
          onClick={() => {
            const opening = !isOpen;
            setIsOpen(opening);
            if (opening) {
                setTimeout(() => {
                    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
          }}
          className="w-full text-left"
          aria-expanded={isOpen}
        >
          <div
            className="rounded-xl border overflow-hidden relative transition-all duration-300"
            style={{
              borderColor: isOpen ? theme.borderOpen : theme.borderCollapsed,
              backgroundColor: isOpen ? theme.cardBgOpen : theme.cardBg,
              boxShadow: isOpen ? theme.glowOpen : "none",
            }}
          >
            {/* Collapsed: header SVG bleed */}
            <AnimatePresence initial={false}>
              {!isOpen && (
                <motion.div
                  key="header-svg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
                >
                  <role.HeaderSVG id={role.id} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded: right-half SVG */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="expanded-svg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
                >
                  <role.ExpandedSVG id={role.id} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="px-5 pt-5 pb-4 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-xs" style={{ color: theme.chipColor, opacity: 0.7 }}>
                      {role.period}
                    </span>
                    <span className="font-mono text-xs text-white/20">· {role.location}</span>
                  </div>
                  <h3 className="leading-snug">{role.companyNode}</h3>
                  <p className="font-mono text-xs mt-1" style={{ color: theme.chipColor, opacity: 0.65 }}>
                    {role.title}
                  </p>
                </div>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  width="15" height="15" viewBox="0 0 16 16" fill="none"
                  className="flex-shrink-0 mt-1 text-white/25"
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </div>

              <AnimatePresence initial={false}>
                {!isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-white/50 text-sm leading-relaxed mt-3"
                  >
                    {role.shortBlurb}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Expanded body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden relative z-10"
                >
                  <div className="mx-5 h-px" style={{ backgroundColor: theme.divider }} />
                  <div className="px-5 pt-4 pb-5 space-y-4">
                    {role.body.map((para, i) => (
                      <p key={i} className="text-white/60 text-sm leading-7" style={{ maxWidth: "58%" }}>
                        {para}
                      </p>
                    ))}
                    <div className="rounded-lg p-4 grid grid-cols-3 gap-4"
                      style={{ backgroundColor: theme.highlightsBg, maxWidth: "58%" }}>
                      {role.highlights.map((h) => (
                        <div key={h.label}>
                          <div className="font-mono font-bold text-sm" style={{ color: theme.metricColor }}>
                            {h.metric}
                          </div>
                          <div className="text-white/35 text-xs mt-0.5 leading-snug">{h.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {role.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded-full"
                          style={{ color: theme.chipColor, backgroundColor: theme.chipBg, border: `1px solid ${theme.chipBorder}` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 overflow-hidden isolate"
      
    >
      {/* Ambient orbs */}
      <SectionOrbs />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section heading — matches About/Projects pattern */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-3"
          >
            <div style={{ width: "28px", height: "1px", background: "#6366f1" }} />
            <p className="font-mono text-xs tracking-widest text-white/30">
              03 / experience
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-semibold text-white/90 pl-9"
          >
            Where I&apos;ve been
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/35 text-sm mt-3 pl-9 max-w-md leading-relaxed"
          >
            Five roles across research, embedded, full-stack, and applied AI.
            Click any card to read the full story.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl">
          {roles.map((role, index) => (
            <RoleCard key={role.id} role={role} index={index} />
          ))}
        </div>
      </div>

      {/* Accent stripe — same as other sections */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 10 }}>
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, #6366f1 0%, rgba(99,102,241,0.15) 60%, transparent 100%)",
          opacity: 0.5,
        }} />
      </div>
    </section>
  );
}