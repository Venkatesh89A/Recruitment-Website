import { Clock3 } from "lucide-react";

const activities = [
  {
    title: "Applied to Google",
    time: "2 hours ago",
  },
  {
    title: "Resume updated",
    time: "Yesterday",
  },
  {
    title: "Interview scheduled",
    time: "2 days ago",
  },
];

const ActivityTimeline = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock3 className="text-blue-600" size={18} />
            </div>

            <div>
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;