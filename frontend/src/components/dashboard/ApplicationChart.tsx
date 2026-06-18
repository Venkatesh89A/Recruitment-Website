import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthlyApplications } from "../../data/dashboard";

const ApplicationChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Application Analytics
        </h2>

        <p className="text-slate-500 mt-1">
          Applications submitted over the last 6 months
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={monthlyApplications}>
          <defs>
            <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="applications"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#applications)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationChart;