"use client";

import { education } from "@/data/education";
import { useState } from "react";

interface EducationItem {
  id: number | string;
  degree: string;
  field: string;
  institution: string;
  duration: string;
  description: string;
}

function FlipCard({ item }: { item: EducationItem }) {
  const [flipped, setFlipped] = useState(false);

  const isTouchDevice = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleClick = () => {
    if (isTouchDevice()) setFlipped((f) => !f);
  };

  return (
    <div
      className="group relative w-full h-64 cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={handleClick}
    >
      {/* ── INNER ROTATING WRAPPER ──────────────────────────────
          willChange: "transform"  → tells browser "this will animate"
          so it creates a dedicated GPU layer BEFORE the flip starts.
          This is the main fix for mobile blur.                       */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out
                   md:group-hover:[transform:rotateY(180deg)]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : undefined,
          willChange: "transform", // ✅ FIX: pre-allocates GPU layer → no blur
        }}
      >

        {/* ── FRONT FACE ────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-4xl p-6 flex flex-col justify-between
                     bg-black/30 border border-white/10
                     shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden", // ✅ FIX: Safari/iOS needs this prefix
            // translateZ(0) forces its own compositing layer → crisp pixels
            transform: "translateZ(0)",          // ✅ FIX: prevents sub-pixel blur
            WebkitFontSmoothing: "antialiased",  // ✅ FIX: smooth text on retina
          }}
        >
          <span className="self-start text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full tracking-wider">
            {item.duration}
          </span>

          <div>
            <h3 className="text-xl font-bold text-white leading-snug mb-1">
              {item.degree}
            </h3>
            <p className="text-blue-500 font-medium text-sm">
              {item.field}
            </p>
          </div>

          <p className="text-gray-600 text-xs md:hidden">Tap to see details</p>
          <p className="text-gray-600 text-xs hidden md:block">Hover to see details</p>
        </div>

        {/* ── BACK FACE ─────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-4xl p-6 flex flex-col justify-between
                     bg-gradient-to-br from-blue-950/80 to-black/80
                     border border-blue-500/20
                     shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden", // ✅ FIX: Safari/iOS needs this prefix
            // rotateY(180deg) pre-faces it backward + translateZ(0) = crisp
            transform: "rotateY(180deg) translateZ(0)", // ✅ FIX: combined, no blur
            WebkitFontSmoothing: "antialiased",          // ✅ FIX: smooth text
          }}
        >
          <div>
           
            <p className="text-white font-semibold text-sm">
              {item.institution}
            </p>
          </div>

          <div>
            
            <p className="text-white text-sm font-medium">{item.degree}</p>
            <p className="text-blue-300 text-sm">{item.field}</p>
          </div>

          <div>
           
            <p className="text-white text-sm">{item.duration}</p>
          </div>

          <div>
           
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

const Education = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-2 lg:px-10 font-serif md:mt-20">
      <h2 className="text-4xl font-bold text-center mb-8">
        My Education
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {education.map((item) => (
          <FlipCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Education;