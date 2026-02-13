import { education } from "@/data/education";

const Education = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-2 lg:px-10 font-serif md:mt-20">
      <h2 className="text-3xl font-bold text-center mb-8 bg-black/50">
        My Education
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
        {education.map((item) => (
          <div
            key={item.id}
            className="bg-black/80 shadow-md rounded-xl p-6 hover:shadow-2xl transition duration-300 shadow  shadow-white rounded-4xl"
          >
            <h3 className="text-xl font-semibold mb-2">
              {item.degree}
            </h3>
            <p className="text-blue-700 font-medium">
              {item.field}
            </p>
            <p className="text-gray-400 text-sm">
              {item.institution}
            </p>
            <p className="text-blue-500 text-sm mt-2">
              {item.duration}
            </p>
            <p className="text-gray-400 mt-3 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
