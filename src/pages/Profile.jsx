import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiFileText,
  FiLogOut,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiUser,
  FiXCircle,
} from "react-icons/fi";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import {
  AUTH_USER_KEY,
  DEMO_MODE,
  DEMO_MODE_MESSAGE,
} from "../services/authService";

const DEMO_DASHBOARD_KEY = "recruitment_demo_dashboard";

const demoDashboardDefaults = {
  skills: ["React", "JavaScript", "UI/UX", "Node.js", "Communication"],
  resumeStatus: "Resume Uploaded",
  applicationStatus: "Actively Applying",
  stats: [
    { label: "Applications", value: "12", icon: FiBriefcase },
    { label: "Interviews", value: "3", icon: FiCalendar },
    { label: "Shortlisted", value: "5", icon: FiCheckCircle },
    { label: "Rejected", value: "2", icon: FiXCircle },
  ],
  recentActivity: [
    "Applied for Software Engineer at BluePeak Labs",
    "Resume reviewed by TalentBridge Hiring Team",
    "Interview scheduled for Frontend Developer role",
  ],
};

const getInitials = (name = "Candidate") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "C";

const readStoredProfile = () => {
  try {
    const storedUser = window.localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

// Temporary demo data source. Replace this localStorage seed with API data
// once the applicant dashboard endpoints are available.
const readDemoDashboard = () => {
  try {
    const storedDashboard = window.localStorage.getItem(DEMO_DASHBOARD_KEY);

    if (storedDashboard) {
      return {
        ...demoDashboardDefaults,
        ...JSON.parse(storedDashboard),
        stats: demoDashboardDefaults.stats,
      };
    }

    window.localStorage.setItem(
      DEMO_DASHBOARD_KEY,
      JSON.stringify({
        skills: demoDashboardDefaults.skills,
        resumeStatus: demoDashboardDefaults.resumeStatus,
        applicationStatus: demoDashboardDefaults.applicationStatus,
        recentActivity: demoDashboardDefaults.recentActivity,
      }),
    );
  } catch {
    return demoDashboardDefaults;
  }

  return demoDashboardDefaults;
};

const formatDate = (value) => {
  if (!value) {
    return "Member date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

function ProfileSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl"
      role="status"
      aria-label="Profile Loading..."
    >
      <div className="h-40 animate-pulse rounded-card bg-slate-200/80 dark:bg-slate-800" />
      <div className="mt-6 grid gap-5 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-card bg-slate-200/80 dark:bg-slate-800"
          />
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
        Profile Loading...
      </p>
    </div>
  );
}

export default function Profile() {
  const { user, logout, refreshProfile } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() =>
    DEMO_MODE ? readStoredProfile() || user : user,
  );
  const [dashboard, setDashboard] = useState(() => readDemoDashboard());
  const [isLoading, setIsLoading] = useState(!profile);
  const [notice, setNotice] = useState(DEMO_MODE ? DEMO_MODE_MESSAGE : "");

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      if (DEMO_MODE) {
        // Temporary demo flow: profile and dashboard are loaded from localStorage.
        setProfile(readStoredProfile() || user);
        setDashboard(readDemoDashboard());
        setNotice(DEMO_MODE_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!user) {
        setIsLoading(true);
      }

      try {
        const freshProfile = await refreshProfile();

        if (isActive) {
          setProfile(freshProfile);
          setNotice("");
        }
      } catch {
        if (isActive) {
          setProfile(user);
          setNotice(DEMO_MODE_MESSAGE);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [refreshProfile, user]);

  const displayProfile = profile || user || readStoredProfile();
  const memberSince = formatDate(displayProfile?.createdAt);
  const profileRows = useMemo(
    () => [
      {
        label: "Name",
        value: displayProfile?.fullName || "Candidate",
        icon: FiUser,
      },
      {
        label: "Email",
        value: displayProfile?.email || "Email unavailable",
        icon: FiMail,
      },
      {
        label: "Phone",
        value: displayProfile?.phone || "Phone not added",
        icon: FiPhone,
      },
      {
        label: "Role",
        value: displayProfile?.role || "Applicant",
        icon: FiBriefcase,
      },
      {
        label: "Member Since",
        value: memberSince,
        icon: FiCalendar,
      },
    ],
    [displayProfile, memberSince],
  );

  const handleLogout = async () => {
    window.localStorage.removeItem(DEMO_DASHBOARD_KEY);
    await logout();
    toast.info("You have been signed out.", "Logged out");
    navigate("/login", { replace: true });
  };

  const handleDemoAction = (action) => {
    toast.info(`${action} will connect to backend workflows later.`, "Demo Mode");
  };

  if (isLoading && !displayProfile) {
    return (
      <main className="auth-surface min-h-[calc(100vh-4rem)] px-4 py-10 sm:px-6 lg:px-8">
        <ProfileSkeleton />
      </main>
    );
  }

  return (
    <main className="auth-surface min-h-[calc(100vh-4rem)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 overflow-hidden rounded-card bg-slate-950 text-white shadow-softDark ring-1 ring-white/10">
          <div className="relative p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(59,130,246,0.42),transparent_32%),linear-gradient(135deg,rgba(37,99,235,0.88),rgba(15,23,42,0.98)_58%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {displayProfile?.avatar ? (
                  <img
                    src={displayProfile.avatar}
                    alt={`${displayProfile.fullName} profile`}
                    className="h-28 w-28 rounded-full object-cover ring-4 ring-white/20"
                  />
                ) : (
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white/15 text-4xl font-bold text-white shadow-xl ring-4 ring-white/20 backdrop-blur">
                    {getInitials(displayProfile?.fullName)}
                  </div>
                )}

                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-blue-100 ring-1 ring-white/15">
                    <FiShield className="h-4 w-4" aria-hidden="true" />
                    Protected Applicant Dashboard
                  </p>
                  <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                    {displayProfile?.fullName || "Demo Applicant"}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-50/90">
                    Track applications, profile readiness, and recruitment
                    activity from one secure RecruitPro workspace.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  variant="secondary"
                  icon={FiEdit3}
                  onClick={() => handleDemoAction("Edit Profile")}
                >
                  Edit Profile
                </Button>
                <Button variant="danger" icon={FiLogOut} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </section>

        {notice ? (
          <div
            className="mb-6 rounded-card border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100"
            role="status"
          >
            <div className="flex items-start gap-3">
              <FiRefreshCw className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-bold">Demo Mode</p>
                <p className="mt-1 font-medium">{notice}</p>
              </div>
            </div>
          </div>
        ) : null}

        <section
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Applicant statistics"
        >
          {dashboard.stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-card border border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-softDark"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-blue-50 text-primary dark:bg-blue-950 dark:text-blue-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-bold text-slate-950 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </article>
            );
          })}
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-card border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-softDark">
            <div className="mb-6">
              <p className="text-sm font-semibold text-primary dark:text-blue-300">
                Applicant Profile
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                Personal information
              </h2>
            </div>

            <div className="divide-y divide-slate-200 overflow-hidden rounded-card border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {profileRows.map((row) => {
                const Icon = row.icon;

                return (
                  <div
                    key={row.label}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-slate-100 text-primary dark:bg-slate-800 dark:text-blue-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {row.label}
                      </span>
                    </div>
                    <span className="break-words text-left text-sm font-bold text-slate-950 dark:text-white sm:text-right">
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/50">
                <div className="flex items-center gap-3">
                  <FiFileText className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  <div>
                    <p className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300">
                      Resume Status
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-950 dark:text-white">
                      {dashboard.resumeStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-card border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/50">
                <div className="flex items-center gap-3">
                  <FiTrendingUp className="h-5 w-5 text-primary dark:text-blue-300" />
                  <div>
                    <p className="text-xs font-bold uppercase text-primary dark:text-blue-300">
                      Application Status
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-950 dark:text-white">
                      {dashboard.applicationStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-card border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-softDark">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary dark:text-blue-300">
                    Profile Readiness
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                    Skills and quick actions
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <FiAward className="h-4 w-4" aria-hidden="true" />
                  86% Complete
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {dashboard.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-primary dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Button
                  variant="secondary"
                  icon={FiFileText}
                  onClick={() => handleDemoAction("Upload Resume")}
                >
                  Upload Resume
                </Button>
                <Button
                  variant="secondary"
                  icon={FiSearch}
                  onClick={() => handleDemoAction("Browse Jobs")}
                >
                  Browse Jobs
                </Button>
                <Button
                  variant="secondary"
                  icon={FiClock}
                  onClick={() => handleDemoAction("Track Applications")}
                >
                  Track Status
                </Button>
              </div>
            </div>

            <div className="rounded-card border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-softDark">
              <div className="mb-5">
                <p className="text-sm font-semibold text-primary dark:text-blue-300">
                  Recent Activity
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                  Application timeline
                </h2>
              </div>

              <div className="space-y-4">
                {dashboard.recentActivity.map((activity, index) => (
                  <div key={activity} className="flex gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary dark:bg-blue-950 dark:text-blue-300">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1 rounded-card border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {activity}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Updated recently in Demo Mode
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
