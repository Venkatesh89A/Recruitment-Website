import ApplicationCard from "./ApplicationCard";
import { applications } from "../../data/applications";

const ApplicationList = () => {
  return (
    <div className="space-y-5">
      {applications.map((item, index) => (
        <ApplicationCard
          key={index}
          company={item.company}
          role={item.role}
          appliedDate={item.appliedDate}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default ApplicationList;