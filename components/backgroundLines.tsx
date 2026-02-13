"use client";

import { useEffect, useState } from "react";

interface Column {
  id: number;
  left: number;
  chars: string;
  duration: number;
  delay: number;
  opacity: number;
  fontSize: number;
  color: string;
}

// ─── SPEED CONTROL ────────────────────────────────────────────────
// Increase BASE_DURATION to make columns fall slower.
// Each column gets BASE_DURATION + random variance seconds to fall.
//   Fast:   BASE = 8,  VARIANCE = 6   → 8–14s
//   Medium: BASE = 18, VARIANCE = 10  → 18–28s  ← default
//   Slow:   BASE = 30, VARIANCE = 15  → 30–45s
//   Crawl:  BASE = 50, VARIANCE = 20  → 50–70s
const BASE_DURATION = 25;   // ← change this number to control speed
const VARIANCE      = 12;   // ← random extra seconds added per column
// ──────────────────────────────────────────────────────────────────

function generateBinaryString(length: number) {
  // Math.random() returns 0–1, so > 0.5 gives true 50% of the time → mix of 1s and 0s
  return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join("\n");
}

export default function BackgroundBinaryRain() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const colors = [
      "rgba(0, 255, 80, VAL)",    // green
      "rgba(0, 200, 255, VAL)",   // cyan
      "rgba(255, 255, 255, VAL)", // white
      "rgba(255, 0, 0, VAL)",     // red accent
    ];

    const count = Math.floor(window.innerWidth / 28);

    const cols: Column[] = Array.from({ length: count }, (_, i) => {
      const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
      const opacity = (Math.random() * 0.25 + 0.08).toFixed(2);
      return {
        id: i,
        left: (i / count) * 100,
        chars: generateBinaryString(60 + Math.floor(Math.random() * 40)),
        duration: BASE_DURATION + Math.random() * VARIANCE,  // ← driven by constants above
        delay: Math.random() * -(BASE_DURATION / 2),         // stagger so columns start at different positions
        opacity: parseFloat(opacity),
        fontSize: 11 + Math.floor(Math.random() * 5),
        color: colorTemplate.replace("VAL", opacity),
      };
    });

    setColumns(cols);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes binaryFall {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .binary-col {
          animation: binaryFall linear infinite;
          white-space: pre;
          line-height: 1.6;
          font-family: 'Courier New', Courier, monospace;
          font-weight: 700;
          letter-spacing: 2px;
          position: absolute;
          top: 0;
          user-select: none;
        }
      `}</style>

      {columns.map((col) => (
        <div
          key={col.id}
          className="binary-col"
          style={{
            left: `${col.left}%`,
            color: col.color,
            fontSize: `${col.fontSize}px`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.chars}
        </div>
      ))}

      {/* Subtle vignette overlay so edges fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}