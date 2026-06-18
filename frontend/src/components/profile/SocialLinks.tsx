import { Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Social Links
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LinkedIn */}
        <a
          href="www.linkedin.com/in/amulya-thanda"
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition flex items-center gap-4"
        >
          <FaLinkedin className="text-blue-600 text-3xl" />

          <div>
            <h3 className="font-semibold">LinkedIn</h3>

            <p className="text-sm text-slate-500">
              View Profile
            </p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Amulya12102005"
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-xl p-5 hover:border-gray-700 hover:shadow-md transition flex items-center gap-4"
        >
          <FaGithub className="text-3xl" />

          <div>
            <h3 className="font-semibold">GitHub</h3>

            <p className="text-sm text-slate-500">
              View Repositories
            </p>
          </div>
        </a>

        {/* Portfolio */}
        <a
          href="#"
          className="border rounded-xl p-5 hover:border-green-500 hover:shadow-md transition flex items-center gap-4"
        >
          <Globe className="text-green-600" size={30} />

          <div>
            <h3 className="font-semibold">Portfolio</h3>

            <p className="text-sm text-slate-500">
              Visit Website
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;