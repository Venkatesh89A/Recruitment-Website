import { MapPin, Briefcase } from "lucide-react";

const jobs = [
  {
    company: "Google",
    role: "Frontend Developer",
    location: "Remote",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    location: "Hyderabad",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    location: "Bangalore",
  },
];

const RecommendedJobs = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold mb-6">
        Recommended Jobs
      </h2>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:border-blue-500 transition"
          >
            <h3 className="font-semibold text-lg">
              {job.company}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-slate-600">
              <Briefcase size={16} />
              {job.role}
            </div>

            <div className="flex items-center gap-2 mt-1 text-slate-500">
              <MapPin size={16} />
              {job.location}
            </div>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;