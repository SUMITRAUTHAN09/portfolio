"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeveloperModel from "./DeveloperModel";

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);

  const devWords = [
    "Web Experiences",
    "Scalable Apps",
    "Modern UI",
    "Clean Code",
    "Fast Websites",
    "Secure Systems",
    "Creative Solutions",
    "Digital Products",
  ];

  /* Word animation */
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % devWords.length);
    }, 2000);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section
      id="home"
      className="w-full flex justify-center items-start lg:items-center mt-8 px-1 font-serif "
    >
      <div className="w-full max-w-7xl mx-auto lg:px-10 grid md:grid-cols-1 lg:grid-cols-10 gap-4 min-h-[500px] lg:min-h-[560px] xl:min-h-[600px] bg-black/50 2xl:min-h-[640px] rounded-4xl shadow-md shadow-blue-500">
        {/* LEFT SECTION */}
        <div className="lg:col-span-6 rounded-4xl flex items-center p-6 sm:p-10 lg:p-16 ">
          <div className="max-w-3xl">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-500 mb-4">
              Hi, I'm Sumit Rauthan
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              I Build
            </h1>

            {/* Animated Developer Words */}
            <div className="h-16 sm:h-20 lg:h-24 mb-6 relative overflow-hidden">
              {devWords.map((word, index) => (
                <h2
                  key={index}
                  className={`absolute top-0 left-0 text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-700 transition-all duration-1000 ease-in-out 
                    ${
                      currentWord === index
                        ? "opacity-100 translate-y-0"
                        : index < currentWord
                          ? "opacity-0 -translate-y-full"
                          : "opacity-0 translate-y-full"
                    }
                  `}
                >
                  {word}
                </h2>
              ))}
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 leading-relaxed text-justify">
              Motivated Computer Science graduate with practical experience in
              Front-End development. I am skilled at building responsive and
              user-friendly web interfaces using modern technologies. I am
              looking for a Front-End Developer position where I can use my
              skills, keep learning, and help create high-quality user
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="px-6 py-3 bg-black text-gray-500 hover:text-black rounded-full font-semibold hover:bg-white transition shadow-lg shadow-gray-500 hover:shadow-black cursor-pointer"
              >
                Connect With Me
              </button>
              <button className="px-6 py-3 border-black rounded-full font-semibold hover:bg-black bg-white transition text-gray-800 hover:text-white shadow-lg shadow-black hover:shadow-white/50 cursor-pointer">
                <Link href="/about">About Me</Link>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-blue-700">5+</p>
                <p className="text-xs text-gray-300">Projects Developed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">6+</p>
                <p className="text-xs text-gray-300">Months Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">100%</p>
                <p className="text-xs text-gray-300">Clean Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-4 rounded-4xl shadow-lg relative overflow-hidden min-h-[350px]">
          <div className="absolute inset-0" />
          <DeveloperModel />
        </div>
      </div>
    </section>
  );
}