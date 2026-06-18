import ApplicationHeader from "../components/Applications/ApplicationHeader";
import ApplicationFilters from "../components/Applications/ApplicationFilters";
import ApplicationList from "../components/Applications/ApplicationList";

const Applications = () => {
  return (
    <div className="space-y-6">
      <ApplicationHeader />

      <ApplicationFilters />

      <ApplicationList />
    </div>
  );
};

export default Applications;