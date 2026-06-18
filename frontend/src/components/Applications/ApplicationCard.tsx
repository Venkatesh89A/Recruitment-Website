import { BriefcaseBusiness } from "lucide-react";

interface Props {
  company: string;
  role: string;
  appliedDate: string;
  status: string;
}

const ApplicationCard = ({
  company,
  role,
  appliedDate,
  status,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex justify-between items-center">

      <div className="flex gap-5">

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
          <BriefcaseBusiness className="text-blue-600" size={24} />
        </div>

        <div>
          <h3 className="font-bold">{company}</h3>

          <p className="text-blue-600">{role}</p>

          <p className="text-sm text-slate-500 mt-2">
            Applied on {appliedDate}
          </p>
        </div>

      </div>

      <div className="text-right">

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          {status}
        </span>

        <button className="block mt-4 text-blue-600 hover:underline">
          View Details →
        </button>

      </div>

    </div>
  );
};

export default ApplicationCard;