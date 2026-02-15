"use client";

import { aboutParagraphs } from "@/app/constant";
import BackgroundCodeParticles from "@/components/Backgroundcodeparticles";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SumnexTechMarquee from "@/components/SumnexTechMarquee";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <>
    <BackgroundCodeParticles/>
      <Header />
      <section className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-black text-white font-serif">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-[260px] h-[300px] sm:w-[320px] sm:h-[400px] lg:w-[420px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />
              <Image
                src="/Profile.jpeg" 
                alt="Sumit Rauthan"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* ABOUT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              About Me
            </h1>

            <div className="space-y-6 ">
              {aboutParagraphs.map((text, index) => (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg text-justify"
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
          <div className="w-full justify-center align-center ">
          <SumnexTechMarquee />
        </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
