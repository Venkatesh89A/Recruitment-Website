import { Download, Upload, FileText } from "lucide-react";

const ResumeSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Resume
      </h2>

      <div className="border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-4">

          <div className="bg-blue-100 p-4 rounded-xl">
            <FileText className="text-blue-600" size={28} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Resume.pdf
            </h3>

            <p className="text-slate-500 text-sm">
              Last updated: 18 June 2026
            </p>
          </div>

        </div>

        <div className="flex gap-4">

          <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition">
            <Download size={18} />
            Download
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
            <Upload size={18} />
            Upload New
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResumeSection;