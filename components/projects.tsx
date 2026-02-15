import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import SumnexTechMarquee from "./SumnexTechMarquee";

export default function Projects() {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-2 lg:px-10 font-serif mt-8">
      <h2 className="text-4xl font-bold text-center text-white md:mt-30">
        My Projects
      </h2>

      {/* MARQUEE – fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <SumnexTechMarquee />
      </motion.div>
      <div className="grid md:grid-cols-3  gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-black/40 rounded-4xl  hover:shadow-xl transition overflow-hidden shadow shadow-md shadow-blue-800"
          >
            {/* Project Image */}
            <div className="relative w-full h-48">
              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {project.name}
              </h3>

              <p className="text-gray-400 text-sm mb-4 text-justify">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-400 text-gray-900 px-2 py-1  shadow shadow-md shadow-blue-900 rounded-full hover:bg-black hover:text-white cursor-pointer"
                  >
                   <strong>{tech}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
