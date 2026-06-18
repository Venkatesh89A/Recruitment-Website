import {
  CalendarDays,
  Clock3,
  Video,
  Building2,
} from "lucide-react";

const interviews = [
  {
    company: "Google",
    role: "Frontend Developer",
    date: "22 Jun 2026",
    time: "10:00 AM",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    date: "25 Jun 2026",
    time: "2:30 PM",
  },
];

const UpcomingInterviews = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Upcoming Interviews
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Stay prepared for your scheduled interviews.
          </p>
        </div>

      </div>

      <div className="space-y-5">

        {interviews.map((interview) => (

          <div
            key={interview.company}
            className="border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
          >

            <div className="flex justify-between">

              <div className="flex gap-4">

                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">

                  <Building2
                    size={28}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {interview.company}
                  </h3>

                  <p className="text-slate-500">
                    {interview.role}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">

                    <CalendarDays size={16} />

                    {interview.date}

                  </div>

                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">

                    <Clock3 size={16} />

                    {interview.time}

                  </div>

                </div>

              </div>

            </div>

            <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl flex items-center justify-center gap-2">

              <Video size={18} />

              Join Meeting

            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default UpcomingInterviews;