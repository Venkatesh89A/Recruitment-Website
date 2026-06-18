import { Search } from "lucide-react";

const ApplicationFilters = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row justify-between gap-4">

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search applications..."
          className="pl-10 pr-4 py-2 border rounded-xl outline-none focus:border-blue-500"
        />
      </div>

      <select className="border rounded-xl px-4 py-2">
        <option>All Status</option>
        <option>Pending</option>
        <option>Reviewed</option>
        <option>Shortlisted</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

    </div>
  );
};

export default ApplicationFilters;