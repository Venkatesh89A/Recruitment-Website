import { Bell, Briefcase, CalendarCheck, CheckCircle } from "lucide-react";

const notifications = [
  {
    icon: <Briefcase size={18} className="text-blue-600" />,
    title: "New job matching your profile",
    time: "10 min ago",
  },
  {
    icon: <CalendarCheck size={18} className="text-green-600" />,
    title: "Interview scheduled with Google",
    time: "2 hours ago",
  },
  {
    icon: <CheckCircle size={18} className="text-purple-600" />,
    title: "Application shortlisted",
    time: "Yesterday",
  },
];

const NotificationPanel = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Bell className="text-blue-600" size={22} />
        <h2 className="text-xl font-bold text-slate-800">
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 border-b last:border-0 pb-4"
          >
            <div className="bg-slate-100 rounded-lg p-2">
              {item.icon}
            </div>

            <div>
              <p className="font-medium text-slate-700">
                {item.title}
              </p>

              <p className="text-sm text-slate-500">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;