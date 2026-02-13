"use client";

import { services } from "@/data/services";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section
      id="services"
      className="w-full py-20 relative font-serif max-w-7xl mx-auto px-3 lg:px-10 "
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-white mb-4">What I Offer
</h1>

        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-justify bg-black/50">
          I provide modern web and mobile application development services using
          React.js, Next.js, and React Native. I focus on building responsive,
          user-friendly, and high-performance digital solutions with clean
          design and smooth user experience.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8 ">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-4xl p-6 shadow-lg shadow-gray-300 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
          >
            {/* Icon */}
            <div className="text-4xl mb-4">{service.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-200 mb-3 group-hover:text-black">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {service.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow shadow-md shadow-blue-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
