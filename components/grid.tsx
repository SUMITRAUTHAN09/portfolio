import Div1 from "@/components/griddata/div1";
import Div2 from "@/components/griddata/Div2";
import Div3 from "@/components/griddata/Div3";
import Div4 from "@/components/griddata/Div4";
import Div5 from "@/components/griddata/Div5";

export default function Grid() {
  return (
    <section
      id="about"
      className="w-full flex justify-center items-start py-4 sm:py-8 lg:items-center p-1 sm:p-2 md:p-3 lg:p-4 font-serif mb-8"
    >
      <div
        className="w-full max-w-7xl mx-auto px-1lg:px-10 grid grid-cols-5 gap-0.5 mt-6
          min-h-[400px] sm:min-h-[500px] lg:min-h-[560px] xl:min-h-[620px] 2xl:min-h-[660px]
          max-h-[90vh]"
      >
        <div className="col-start-1 col-span-2 row-start-1 row-span-5 rounded-md sm:rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
          <Div1 />
        </div>

        <div className="col-start-3 col-span-2 row-start-1 row-span-3 rounded-md sm:rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
          <Div2 />
        </div>

        <div className="col-start-5 col-span-1 row-start-1 row-span-3 rounded-md sm:rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
          <Div3 />
        </div>

        <div className="col-start-3 col-span-1 row-start-4 row-span-2 rounded-md sm:rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
          <Div4 />
        </div>

        <div className="col-start-4 col-span-2 row-start-4 row-span-2 bg-green-400 rounded-md sm:rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
          <Div5 />
        </div>
      </div>
    </section>
  );
}