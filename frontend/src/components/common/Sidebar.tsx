import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Applications", icon: FileText, path: "/applications" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-x1">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">
          RecruitPro
        </h1>
        <p className="text-sm text-slate-400">
          Applicant Portal
        </p>
      </div>

      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-6 py-4 border-t border-slate-700 hover:bg-red-600 transition">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;