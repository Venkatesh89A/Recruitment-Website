import { Code2 } from "lucide-react";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Python",
  "Django",
  "Git",
  "GitHub",
];

const Skills = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center gap-3 mb-6">
        <Code2 className="text-blue-600" size={24} />

        <h2 className="text-2xl font-bold text-slate-800">
          Skills
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">

        {skills.map((skill) => (
          <span
            key={skill}
            className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
};

export default Skills;