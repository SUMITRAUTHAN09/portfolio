"use client";
import Slider from "@/components/BgImageSlider";
import { useEffect, useState } from "react";

export default function Div1() {
  const techWords = [
    "Innovate",
    "Build",
    "Scale",
    "Optimize",
    "Secure",
    "Transform",
  ];

  const tagline = "Improving the Digital World";

  const [currentWord, setCurrentWord] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % techWords.length);
    }, 2000);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const speed = isDeleting ? 60 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < tagline.length) {
        setTypedText(tagline.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(tagline.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === tagline.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting]);

  return (
    <div className="relative w-full h-full p-3 sm:p-4 lg:p-6 overflow-hidden rounded-lg shadow shadow-lg shadow-red-400">
 
      {/* BACKGROUND SLIDER */}
      <Slider startIndex={0}  delay={5000}/>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-xl text-white">
        <h1 className="md:text-4xl font-bold">Welcome to</h1>
        <h2 className="text-xl sm:text-2xl md:text-5xl font-bold mt-2">Sumit's portfolio</h2>

        <p className="mt-3 md:text-xl font-medium h-7 text-red-800">
          <strong>{typedText}</strong>
          <span className="animate-pulse">|</span>
        </p>

        <p className="text-sm leading-relaxed mt-12 text-justify">
         Frontend and App Developer focused on building responsive, high-performance web and mobile applications with clean design and seamless user experience.
        </p>
      </div>

      {/* RIGHT WORDS */}
      <div className="absolute right-6 bottom-6 z-10 text-red-600">
        <div className="h-20 relative">
          {techWords.map((word, index) => (
            <h2
              key={index}
              className={`absolute right-0 text-xl sm:text-2xl md:text-5xl text-xl font-bold transition-all duration-1000 ${
                currentWord === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              }`}
            >
              {word}
            </h2>
          ))}
        </div>
      </div>

    </div>
  );
}
