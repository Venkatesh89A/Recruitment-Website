import { Camera, Pencil } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-6">

          <div className="relative">

            <img
              src="https://ui-avatars.com/api/?background=2563eb&color=fff&size=200&name=Amulya"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-100"
            />

            <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
              <Camera size={18} />
            </button>

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Amulya
            </h1>

            <p className="text-slate-500 mt-2">
              Frontend Applicant
            </p>

            <div className="mt-4 flex gap-2 flex-wrap">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                React
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                TypeScript
              </span>

              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                Frontend
              </span>

            </div>

          </div>

        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">

          <Pencil size={18} />

          Edit Profile

        </button>

      </div>

    </div>
  );
};

export default ProfileHeader;