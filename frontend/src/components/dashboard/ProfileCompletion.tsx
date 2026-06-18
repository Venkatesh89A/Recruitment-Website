import { CheckCircle2, ArrowRight } from "lucide-react";

const completion = 82;

const ProfileCompletion = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Profile Completion
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Complete your profile to attract recruiters.
          </p>
        </div>

        <CheckCircle2
          size={32}
          className="text-green-500"
        />

      </div>

      {/* Percentage */}

      <div className="text-center mb-6">

        <h1 className="text-5xl font-bold text-blue-600">
          {completion}%
        </h1>

        <p className="text-slate-500 mt-2">
          Completed
        </p>

      </div>

      {/* Progress Bar */}

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
          style={{ width: `${completion}%` }}
        ></div>

      </div>

      <div className="mt-6 space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Personal Information</span>
          <span className="text-green-600 font-medium">✓ Complete</span>
        </div>

        <div className="flex justify-between">
          <span>Resume Upload</span>
          <span className="text-green-600 font-medium">✓ Complete</span>
        </div>

        <div className="flex justify-between">
          <span>Skills</span>
          <span className="text-orange-500 font-medium">Pending</span>
        </div>

        <div className="flex justify-between">
          <span>Portfolio</span>
          <span className="text-orange-500 font-medium">Pending</span>
        </div>

      </div>

      <button className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl">

        Complete Profile

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default ProfileCompletion;