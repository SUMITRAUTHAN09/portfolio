import Slider from "../BgImageSlider";

export default function Div2() {
  return (
    <div className="relative h-full w-full min-h-[140px] sm:min-h-[180px] lg:min-h-[300px] p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col justify-between overflow-hidden rounded-lg shadow-2xl shadow-purple-400">

      {/* BACKGROUND SLIDER */}
      <Slider startIndex={1} delay={4500} />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* CONTENT */}
      <div className="relative z-10 text-white text-justify">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
          Technical Skills
        </h2>

        <p className="text-[10px] sm:text-xs md:text-sm italic mb-2">
          Frontend Development: React.js, Next.js, HTML, CSS, JavaScript,
          Tailwind CSS, ShadCN UI
        </p>

        <p className="text-[10px] sm:text-xs md:text-sm italic mb-2">
          App Development: React Native, React Native CLI, Expo CLI
        </p>

        <p className="text-[10px] sm:text-xs md:text-sm mb-2">
          Form Handling: Formik & Yup Validation
        </p>

        <p className="text-[10px] sm:text-xs md:text-sm mb-2">
          Tools: Git, GitHub, VS Code, Browser Developer Tools
        </p>

        <p className="text-[10px] sm:text-xs md:text-sm">
          Programming: JavaScript, Python, Java, C, C++, SQL
        </p>
      </div>
    </div>
  );
}
