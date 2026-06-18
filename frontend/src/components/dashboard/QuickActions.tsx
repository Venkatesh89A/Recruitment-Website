import {
  User,
  Briefcase,
  Upload,
  FileText,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Edit Profile",
    description: "Update your personal information",
    icon: User,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Browse Jobs",
    description: "Explore the latest opportunities",
    icon: Briefcase,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Upload Resume",
    description: "Keep your resume up to date",
    icon: Upload,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Applications",
    description: "Track your application history",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Access frequently used features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="text-left border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {action.description}
              </p>

              <div className="mt-5 flex items-center text-blue-600 font-medium">

                Open

                <ArrowRight
                  size={18}
                  className="ml-2"
                />

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
};

export default QuickActions;