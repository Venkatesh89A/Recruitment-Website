import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCheckCircle,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const panelItems = [
  "Complete your profile",
  "Upload your latest resume",
  "Apply to jobs instantly",
  "Track application status",
];

const stats = [
  { value: "250+", label: "Hiring Companies" },
  { value: "1200+", label: "Active Jobs" },
  { value: "15000+", label: "Registered Applicants" },
  { value: "95%", label: "Hiring Success" },
];

const MotionSection = motion.section;

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="auth-surface min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <MotionSection
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hidden overflow-hidden rounded-card bg-slate-950 text-white shadow-softDark ring-1 ring-white/10 lg:block"
          aria-label="Recruitment portal overview"
        >
          <div className="relative min-h-[620px] p-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.96),rgba(15,23,42,0.98)_48%,rgba(20,184,166,0.72))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.20),transparent_28%),radial-gradient(circle_at_90%_18%,rgba(96,165,250,0.28),transparent_30%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(15,23,42,0.95),transparent)]" />
            <div className="relative flex h-full min-h-[540px] flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-blue-50 ring-1 ring-white/20">
                  <FiBriefcase className="h-4 w-4" aria-hidden="true" />
                  Online Recruitment Suite
                </div>
                <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight">
                  Hire faster with secure applicant access.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-blue-50/90">
                  A professional authentication flow for candidates, recruiters,
                  and hiring teams managing job applications at scale.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-card bg-white/12 p-4 backdrop-blur ring-1 ring-white/15 transition hover:-translate-y-1 hover:bg-white/16"
                    >
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-xs font-medium text-blue-50/80">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-card bg-white/95 p-5 text-slate-950 shadow-soft backdrop-blur-xl ring-1 ring-white/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        Active pipeline
                      </p>
                      <p className="mt-1 text-2xl font-bold">
                        Software Engineer
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-emerald-50 text-emerald-600">
                      <FiArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {panelItems.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <FiCheckCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-5 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto w-full max-w-xl rounded-card border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/92 dark:shadow-softDark sm:p-8"
          aria-labelledby="auth-heading"
        >
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3 text-primary dark:text-blue-300">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-blue-50 dark:bg-blue-950">
                <FiShield className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">
                Secure Access
              </span>
            </div>
            <h2
              id="auth-heading"
              className="text-3xl font-bold tracking-normal text-slate-950 dark:text-white"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <FiUsers className="h-4 w-4 text-primary" aria-hidden="true" />
              Candidate-ready
            </div>
            <div className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-primary" aria-hidden="true" />
              JWT protected
            </div>
          </div>
        </MotionSection>
      </div>
    </main>
  );
}
