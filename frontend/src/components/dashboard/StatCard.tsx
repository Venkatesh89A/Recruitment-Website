interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

const StatCard = ({ title, value, color }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div
        className={`w-12 h-12 rounded-lg ${
          colorClasses[color] || "bg-gray-500"
        } mb-4`}
      ></div>

      <h3 className="text-gray-500 text-sm">{title}</h3>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default StatCard;