import { FiBriefcase } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/90 px-4 py-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-sm text-slate-600 dark:text-slate-300 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="inline-flex items-center justify-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
          <FiBriefcase className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>© 2026 RecruitPro</span>
        </div>
        <p>Online Recruitment & Job Application Management System</p>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Developed for Educational Purpose
        </p>
      </div>
    </footer>
  );
}
