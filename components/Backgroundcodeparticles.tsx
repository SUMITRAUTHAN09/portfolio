"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  startY: number;
  text: string;
  fontSize: number;
  color: string;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
}

const CODE_SNIPPETS = [
  "01", "10", "00", "11",
  "const", "=>", "func", "def",
  "{}","[]","</>","<>",
  "&&","||","===","!==",
  "async","await","return",
  "null","void","true","false",
  "0x1A","0xFF","0b1010",
  "npm","git","ssh","curl",
  "API","HTTP","JSON","CSS",
  "/>","</","<!--","-->",
  "for","while","if","else",
  "import","export","from",
  "1","0","1","0","1","0", // extra weight to binary
  "101","010","110","001",
  "S","U","M","I","R","A","T","H","A","N",
];

export default function BackgroundCodeParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

{/*    const colors = [
      `rgba(0, 255, 80, opacity)`,
      `rgba(0, 200, 255, opacity)`,
      `rgba(255, 255, 255, opacity)`,
      `rgba(225, 0, 0, opacity)`,
    ]; */}
    const colors = [
  `rgba(34, 197, 94, opacity)`,    // Green (modern emerald)
  `rgba(59, 130, 246, opacity)`,   // Blue (professional tech blue)
  `rgba(255, 255, 255, opacity)`,  // White
  `rgba(239, 68, 68, opacity)`,    // Red (clean soft red)
];

    const count = 55;

    const generated: Particle[] = Array.from({ length: count }, (_, i) => {
      const opacity = (Math.random() * 0.2 + 0.06).toFixed(2);
      const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        x: Math.random() * 100,
        startY: Math.random() * 100,
        text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        fontSize: 10 + Math.floor(Math.random() * 12),
        color: colorTemplate.replace("opacity", opacity),
        duration: 14 + Math.random() * 20,
        delay: Math.random() * -25,
        opacity: parseFloat(opacity),
        rotate: (Math.random() - 0.5) * 20,
      };
    });

    setParticles(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes particleDrift {
          0%   { transform: translateY(0) rotate(var(--rotate)); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(calc(var(--rotate) + 15deg)); opacity: 0; }
        }
        .code-particle {
          position: absolute;
          font-family: 'Courier New', Courier, monospace;
          font-weight: 700;
          letter-spacing: 1px;
          white-space: nowrap;
          animation: particleDrift linear infinite;
          user-select: none;
        }

        /* Horizontal streaks */
        @keyframes streakSlide {
          0%   { transform: translateX(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        .streak {
          position: absolute;
          height: 1px;
          width: 80px;
          animation: streakSlide linear infinite;
        }
      `}</style>

      {/* Floating code particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="code-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.startY}%`,
            fontSize: `${p.fontSize}px`,
            color: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // @ts-ignore
            "--rotate": `${p.rotate}deg`,
          }}
        >
          {p.text}
        </div>
      ))}

      {/* Horizontal light streaks */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`streak-${i}`}
          className="streak"
          style={{
            top: `${15 + i * 17}%`,
            background: `linear-gradient(90deg, transparent, rgba(0,255,80,0.3), transparent)`,
            animationDuration: `${8 + i * 3}s`,
            animationDelay: `${i * -4}s`,
            width: `${60 + i * 20}px`,
          }}
        />
      ))}

      {/* Subtle radial glow at center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,40,0,0.15) 0%, transparent 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(0deg, rgba(0,0,0,0.5), transparent)",
        }}
      />
    </div>
  );
}