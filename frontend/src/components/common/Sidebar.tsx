import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Applications", icon: FileText, path: "/applications" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          RecruitPro
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Applicant Portal
        </p>
      </div>

      {/* User */}
      <div className="px-6 py-6 flex items-center gap-4 border-b border-slate-700">

        <img
          src="https://ui-avatars.com/api/?background=2563eb&color=fff&name=Amulya"
          className="w-14 h-14 rounded-full"
          alt="avatar"
        />

        <div>
          <h3 className="font-semibold text-lg">
            Amulya
          </h3>

          <p className="text-slate-400 text-sm">
            Frontend Applicant
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-3 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Profile Completion */}
      <div className="mx-5 mb-6 p-4 rounded-xl bg-slate-800">

        <p className="text-sm text-slate-400">
          Profile Completion
        </p>

        <div className="w-full h-2 bg-slate-700 rounded-full mt-3">

          <div className="w-4/5 h-2 bg-blue-500 rounded-full"></div>

        </div>

        <p className="mt-2 text-blue-400 font-semibold">
          82%
        </p>

      </div>

      {/* Logout */}
      <button className="mx-5 mb-8 flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
};

export default Sidebar;