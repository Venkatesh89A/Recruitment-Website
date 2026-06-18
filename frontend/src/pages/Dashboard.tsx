import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Welcome Back, Amulya 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Here's an overview of your job applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard title="Applications" value="12" color="blue" />
        <StatCard title="Pending" value="5" color="orange" />
        <StatCard title="Interviews" value="2" color="green" />
        <StatCard title="Selected" value="1" color="red" />
      </div>
    </div>
  );
};

export default Dashboard;