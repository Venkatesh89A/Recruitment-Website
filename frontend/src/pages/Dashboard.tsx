import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import ApplicationChart from "../components/dashboard/ApplicationChart";
import RecentApplications from "../components/dashboard/RecentApplications";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import QuickActions from "../components/dashboard/QuickActions";
import NotificationPanel from "../components/dashboard/NotificationPanel";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Applications" value="12" color="blue" />
        <StatCard title="Pending" value="5" color="orange" />
        <StatCard title="Interviews" value="2" color="green" />
        <StatCard title="Selected" value="1" color="red" />
      </div>

      {/* Analytics */}
      <ApplicationChart />

      {/* Recent Applications */}
      <RecentApplications />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 space-y-6">
          <UpcomingInterviews />
          <RecommendedJobs />
          <QuickActions />
        </div>

        <div className="space-y-6">
          <ProfileCompletion />
          <ActivityTimeline />
          <NotificationPanel />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;