import {
  FileText,
  Clock3,
  CalendarCheck,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  color: "blue" | "orange" | "green" | "red";
}

const iconMap = {
  blue: <FileText size={28} />,
  orange: <Clock3 size={28} />,
  green: <CalendarCheck size={28} />,
  red: <BadgeCheck size={28} />,
};

const bgMap = {
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
};

const borderMap = {
  blue: "border-blue-500",
  orange: "border-orange-500",
  green: "border-green-500",
  red: "border-red-500",
};

const trendMap = {
  blue: "+3 Applications",
  orange: "+1 Pending",
  green: "+2 Interviews",
  red: "+1 Selected",
};

const StatCard = ({ title, value, color }: StatCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl border-t-4 ${borderMap[color]}
      shadow-sm hover:shadow-xl hover:-translate-y-2
      transition-all duration-300 p-6`}
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bgMap[color]}`}
        >
          {iconMap[color]}
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">

          <TrendingUp size={18} />

          {trendMap[color]}

        </div>

        <span className="text-xs text-slate-400">
          This Week
        </span>

      </div>

    </div>
  );
};

export default StatCard;