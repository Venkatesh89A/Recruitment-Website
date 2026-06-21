import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
  FiUser,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

const navLinkBase =
  "relative inline-flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold transition duration-200";

const MotionSpan = motion.span;
const MotionDiv = motion.div;

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem(
      "recruitment-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const navItems = isAuthenticated
    ? [{ to: "/profile", label: "Profile", icon: FiUser }]
    : [
        { to: "/login", label: "Login", icon: FiLogIn },
        { to: "/register", label: "Register", icon: FiUserPlus },
      ];

  const handleLogout = async () => {
    await logout();
    toast.info("You have been signed out.", "Logged out");
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/82 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/82 dark:shadow-black/20">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <NavLink
          to={isAuthenticated ? "/profile" : "/login"}
          className="group inline-flex items-center gap-3 rounded-card"
          onClick={() => setIsMenuOpen(false)}
          aria-label="RecruitPro home"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-[linear-gradient(135deg,#2563EB,#3B82F6)] text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-blue-600/25">
            <FiBriefcase className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold text-slate-950 dark:text-white">
              RecruitPro
            </span>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              Hiring Portal
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-blue-50 text-primary shadow-sm dark:bg-blue-950 dark:text-blue-200"
                      : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-card text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <MotionSpan
                key={isDarkMode ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                {isDarkMode ? (
                  <FiSun className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FiMoon className="h-5 w-5" aria-hidden="true" />
                )}
              </MotionSpan>
            </AnimatePresence>
          </button>
          {isAuthenticated ? (
            <Button variant="secondary" icon={FiLogOut} onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-card text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <MotionSpan
                key={isDarkMode ? "mobile-sun" : "mobile-moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                {isDarkMode ? (
                  <FiSun className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FiMoon className="h-5 w-5" aria-hidden="true" />
                )}
              </MotionSpan>
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-card text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <FiX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FiMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <MotionDiv
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLinkBase} ${
                      isActive
                        ? "bg-blue-50 text-primary dark:bg-blue-950 dark:text-blue-200"
                        : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
            {isAuthenticated ? (
              <Button
                variant="secondary"
                icon={FiLogOut}
                fullWidth
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            ) : null}
          </div>
        </MotionDiv>
      ) : null}
    </header>
  );
}
