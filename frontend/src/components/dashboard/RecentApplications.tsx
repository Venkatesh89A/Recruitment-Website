import {
  Building2,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const applications = [
  {
    company: "Google",
    role: "Frontend Developer",
    date: "15 Jun 2026",
    status: "Interview",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    date: "12 Jun 2026",
    status: "Pending",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    date: "10 Jun 2026",
    status: "Selected",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Interview":
      return "bg-blue-100 text-blue-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Selected":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentApplications = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Recent Applications
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Track the latest jobs you've applied for.
          </p>
        </div>

        <button className="text-blue-600 font-medium hover:text-blue-700">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {applications.map((app) => (

          <div
            key={app.company}
            className="border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
          >

            <div className="flex justify-between items-start">

              {/* Left */}
              <div className="flex gap-4">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

                  <Building2
                    size={28}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {app.company}
                  </h3>

                  <p className="text-slate-500">
                    {app.role}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">

                    <CalendarDays size={16} />

                    Applied on {app.date}

                  </div>

                </div>

              </div>

              {/* Right */}

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>

            </div>

            <div className="mt-5 flex justify-end">

              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">

                View Details

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentApplications;