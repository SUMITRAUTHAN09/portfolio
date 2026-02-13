import Slider from "../BgImageSlider";

export default function Div3() {
  return (
    <div className="relative h-full w-full min-h-[140px] sm:min-h-[180px] lg:min-h-[300px] p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col justify-center overflow-hidden rounded-lg shadow-2xl shadow-green-400">

      {/* BACKGROUND SLIDER */}
      <Slider startIndex={4} delay={3500} />

      {/* OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* CONTENT */}
      <div className="relative z-10 text-white">
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4">
          Specialize
        </h2>

        <ul className="space-y-0.5 sm:space-y-1 md:space-y-2 text-[10px] sm:text-xs md:text-sm">
          <li>• Frontend Web Development</li>
          <li>• React.js & Next.js Applications</li>
          <li>• Mobile App Development (React Native)</li>
          <li>• React Native CLI & Expo CLI Projects</li>
          <li>• Responsive UI Design & Form Validation</li>
          <li>• Performance Optimization & Cross-Browser Compatibility</li>
        </ul>
      </div>
    </div>
  );
}
