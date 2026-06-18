import { GraduationCap, Calendar, BookOpen } from "lucide-react";

const Education = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Education
      </h2>

      <div className="border rounded-xl p-6 hover:border-blue-500 transition">

        <div className="flex items-center gap-4">

          <div className="bg-blue-100 p-3 rounded-xl">
            <GraduationCap className="text-blue-600" size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Bachelor of Technology (B.Tech)
            </h3>

            <p className="text-slate-500">
              Electronics & Communication Engineering
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <div className="flex items-center gap-3">

            <BookOpen className="text-green-600" size={20} />

            <div>
              <p className="text-sm text-slate-500">
                College
              </p>

              <h4 className="font-semibold">
                Malla Reddy College of Engineering & Technology
              </h4>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Calendar className="text-orange-600" size={20} />

            <div>
              <p className="text-sm text-slate-500">
                Graduation
              </p>

              <h4 className="font-semibold">
                2027 (Expected)
              </h4>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Education;