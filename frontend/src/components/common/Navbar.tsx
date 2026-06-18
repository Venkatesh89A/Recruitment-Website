import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">
        Applicant Dashboard
      </h2>

      <div className="flex items-center gap-5">
        <Search className="cursor-pointer" />
        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Amulya"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold">
              Amulya
            </p>

            <p className="text-sm text-gray-500">
              Applicant
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;