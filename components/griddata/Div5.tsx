import Slider from "../BgImageSlider";

export default function Div5() {
  return (
    <div className="relative h-full w-full min-h-[140px] sm:min-h-[180px] lg:min-h-[300px] p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col justify-center overflow-hidden rounded-lg shadow-2xl shadow-blue-400">
    
      {/* BACKGROUND SLIDER */}
      <Slider startIndex={2} delay={3000} />
    
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />
    
      {/* CONTENT */}
      <div className="relative z-10 text-white">
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4">
          My Development Approach
        </h2>
    
        <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-justify">
          I focus on building responsive and user-friendly web and mobile applications.
          I use modern technologies like React.js, Next.js, and React Native to create
          clean, scalable, and high-performance digital solutions. My goal is to design
          simple, smooth, and reliable user experiences.
        </p>
      </div>
    
    </div>
  );
}
