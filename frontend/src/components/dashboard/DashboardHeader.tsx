import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = today.getHours();

  let greeting = "Good Morning ☀️";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon 🌤️";
  } else if (hour >= 17) {
    greeting = "Good Evening 🌙";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {greeting}, Amulya 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back! Here's an overview of your recruitment activities.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-5 lg:mt-0 bg-slate-100 px-4 py-2 rounded-xl">

        <CalendarDays className="text-blue-600" size={20} />

        <span className="text-slate-700 font-medium">
          {date}
        </span>

      </div>

    </div>
  );
};

export default DashboardHeader;