import { Bell, Search } from "lucide-react";

const Navbar = () => {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  }

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm">

      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {greeting}
        </h2>

        <p className="text-slate-500 mt-1">
          Welcome back, <span className="font-semibold">Amulya</span> 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />

        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">

          <Bell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <img
            src="https://ui-avatars.com/api/?background=2563eb&color=fff&name=Amulya"
            alt="avatar"
            className="w-11 h-11 rounded-full shadow"
          />

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              Amulya
            </p>

            <p className="text-sm text-slate-500">
              Frontend Applicant
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;