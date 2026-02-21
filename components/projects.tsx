"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useRef } from "react";
import SumnexTechMarquee from "./SumnexTechMarquee";

function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 1.5;
    const y = (e.clientY - rect.top) / rect.height - 1.5;

    el.style.transform = `
      perspective(900px)
      rotateX(${-y * 14}deg)
      rotateY(${x * 14}deg)
      scale(1.04)
    `;

    const glare = el.querySelector<HTMLDivElement>(".glare-layer");
    if (glare) {
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      glare.style.background = `radial-gradient(
        circle at ${xPct * 100}% ${yPct * 100}%,
        rgba(255,255,255,0.13) 0%,
        rgba(255,255,255,0.04) 40%,
        transparent 70%
      )`;
      glare.style.opacity = "1";
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    const glare = el.querySelector<HTMLDivElement>(".glare-layer");
    if (glare) glare.style.opacity = "0";
  };

  return { ref, onMouseMove, onMouseLeave };
}

interface Project {
  id: number | string;
  name: string;
  description: string;
  image: string;
  tech: string[];
}

function ProjectCard({ project }: { project: Project }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-4xl cursor-pointer transition-transform duration-200 ease-out"
      style={{
        // ✅ FIX 1: preserve-3d on ROOT — enables 3D space for all children
        transformStyle: "preserve-3d",
        background: "rgba(0,0,0,0.4)",
        boxShadow: "0 4px 32px rgba(30,80,200,0.25), 0 1px 8px rgba(0,0,0,0.5)",
        // ✅ FIX 2: NO overflow-hidden here — it destroys preserve-3d!
      }}
    >
      {/* ── IMAGE SECTION ──────────────────────────────────────── */}
      {/* ✅ FIX 3: preserve-3d on EVERY div between root and 3D children */}
      <div
        className="relative w-full h-48"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image gets its own leaf div WITH overflow-hidden — safe here
            because this div has no 3D children inside it             */}
        <div className="absolute inset-0 rounded-t-4xl overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-[1]" />
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>

        {/* DEPTH LAYER 1 — Name badge: floats above the image */}
        <div
          className="absolute bottom-3 left-4 z-10"
          style={{ transform: "translateZ(35px)" }}
        >
          <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
            {project.name}
          </h3>
        </div>
      </div>

      {/* ── CONTENT SECTION ────────────────────────────────────── */}
      {/* ✅ FIX 3 again: preserve-3d on this wrapper too          */}
      <div
        className="p-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* DEPTH LAYER 2 — Description: gentle mid-depth float */}
        <p
          className="text-gray-400 text-sm mb-4 text-justify"
          style={{ transform: "translateZ(15px)" }}
        >
          {project.description}
        </p>

        {/* DEPTH LAYER 3 — Tech badges: pop closest to viewer */}
        <div
          className="flex flex-wrap gap-2 mb-1"
          style={{ transform: "translateZ(40px)" }}
        >
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-400 text-gray-900 px-2 py-1 rounded-full
                         shadow shadow-blue-900 hover:bg-black hover:text-white
                         transition-colors duration-200 cursor-pointer"
            >
              <strong>{tech}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* ── GLARE LAYER — above everything ─────────────────────── */}
      <div
        className="glare-layer absolute inset-0 rounded-4xl pointer-events-none transition-opacity duration-200"
        style={{ opacity: 0, transform: "translateZ(50px)" }}
      />

      {/* ── BORDER GLOW ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-4xl pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(96,165,250,0.15)",
          transform: "translateZ(1px)",
        }}
      />
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full max-w-7xl mx-auto px-2 lg:px-10 font-serif mt-8"
    >
      <h2 className="text-4xl font-bold text-center text-white md:mt-30">
        My Projects
      </h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <SumnexTechMarquee />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}