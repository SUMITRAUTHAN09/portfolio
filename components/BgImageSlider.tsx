"use client";
import { useEffect, useState } from "react";

interface SliderProps {
  startIndex?: number;
  delay?: number;
}

const images = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
];

export default function BgImageSlider({
  startIndex = 0,
  delay = 5000,
}: SliderProps) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>
  );
}
