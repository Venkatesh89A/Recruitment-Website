import { useMemo, useState } from "react";
import { Avatar } from "../components/common/Avatar.jsx";
import { Icon } from "../components/common/Icon.jsx";

const navSections = [
  {
    title: "Applicant",
    items: [
      { id: "applicant", label: "Dashboard", icon: "dashboard" },
      { id: "application-status", label: "Application Status", icon: "applications" },
      { id: "profile", label: "Profile", icon: "profile" },
      { id: "resume-upload", label: "Resume Upload", icon: "upload" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  },
  {
    title: "Admin",
    items: [
      { id: "admin", label: "Dashboard", icon: "admin" },
      { id: "manage-applications", label: "Manage Applications", icon: "applications" },
      { id: "candidate-details", label: "Candidate Details", icon: "profile" },
    ],
  },
];

const flatNavItems = navSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const notifications = [
  { title: "Resume Uploaded", detail: "AmulyaThanda_Resume.pdf is ready for recruiters." },
  { title: "Application Updated", detail: "CloudNova Systems moved to shortlist review." },
  { title: "Interview Scheduled", detail: "vinni scheduled the PixelCraft technical round." },
  { title: "New Candidate Applied", detail: "A fresh MERN Developer application needs review." },
];

export function AppLayout({
  activePage,
  onNavigate,
  applicant,
  apiConnected,
  applications = [],
  candidates = [],
  onViewCandidate,
  onToast,
  children,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNavItem = flatNavItems.find((item) => item.id === activePage) || flatNavItems[0];

  const searchResults = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();
    if (!value) return [];

    const appResults = applications
      .filter((application) =>
        [application.candidate, application.role, application.company, application.recruiter, application.status]
          .join(" ")
          .toLowerCase()
          .includes(value),
      )
      .slice(0, 3)
      .map((application) => ({
        id: application.id,
        title: application.candidate,
        subtitle: `${application.role} at ${application.company}`,
        action: () => {
          onViewCandidate(application.candidateId);
          setSearchTerm("");
        },
      }));

    const candidateResults = candidates
      .filter((candidate) =>
        [candidate.name, candidate.title, candidate.email, candidate.location].join(" ").toLowerCase().includes(value),
      )
      .slice(0, 3)
      .map((candidate) => ({
        id: candidate.id,
        title: candidate.name,
        subtitle: `${candidate.title} | ${candidate.location}`,
        action: () => {
          onViewCandidate(candidate.id);
          setSearchTerm("");
        },
      }));

    return [...appResults, ...candidateResults].slice(0, 5);
  }, [applications, candidates, onViewCandidate, searchTerm]);

  function handleNavigate(pageId) {
    onNavigate(pageId);
    setSidebarOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
  }

  function handleNotificationClick(notification) {
    setNotificationsOpen(false);
    onToast?.({ title: notification.title, message: notification.detail });
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Primary navigation">
        <button className="brand" type="button" onClick={() => handleNavigate("applicant")}>
          <span className="brand-mark">
            <Icon name="briefcase" />
          </span>
          <span>Recruitment</span>
        </button>

        <nav className="side-nav" aria-label="Dashboard navigation">
          {navSections.map((section) => (
            <section className="nav-section" key={section.title}>
              <p className="nav-section-title">{section.title}</p>
              <div className="nav-section-list">
                {section.items.map((item) => (
                  <button
                    className={`nav-link ${activePage === item.id ? "active" : ""}`}
                    type="button"
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    aria-current={activePage === item.id ? "page" : undefined}
                  >
                    <span className="nav-icon">
                      <Icon name={item.icon} />
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </nav>

        <div className="sidebar-profile">
          <Avatar name={applicant.name} />
          <div>
            <strong>{applicant.name}</strong>
            <span>{applicant.role}</span>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="content">
        <header className="topbar">
          <div className="topbar-heading">
            <button
              className="icon-button sidebar-toggle"
              type="button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <div>
              <p className="eyebrow">{activeNavItem.section} Module</p>
              <h2>{activeNavItem.label}</h2>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="header-search">
              <Icon name="search" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search candidates, roles, recruiters..."
                aria-label="Search dashboard"
              />
              {searchTerm && (
                <div className="search-popover">
                  {searchResults.length ? (
                    searchResults.map((result) => (
                      <button type="button" key={result.id} onClick={result.action}>
                        <strong>{result.title}</strong>
                        <span>{result.subtitle}</span>
                      </button>
                    ))
                  ) : (
                    <div className="empty-popover">
                      <strong>No matches</strong>
                      <p>Try a candidate name, role, company, or recruiter.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <span className={`api-status ${apiConnected ? "connected" : ""}`}>
              {apiConnected ? "Dashboard APIs connected" : "Dashboard API layer ready"}
            </span>

            <div className="popover-wrap">
              <button
                className={`icon-button ${notificationsOpen ? "active" : ""}`}
                type="button"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                onClick={() => setNotificationsOpen((current) => !current)}
              >
                <Icon name="bell" />
                <span className="notification-dot" />
              </button>
              {notificationsOpen && (
                <div className="notification-menu">
                  <div className="popover-title">
                    <strong>Notifications</strong>
                    <button type="button" onClick={() => setNotificationsOpen(false)}>Done</button>
                  </div>
                  {notifications.map((notification) => (
                    <button type="button" key={notification.title} onClick={() => handleNotificationClick(notification)}>
                      <span className="notification-pulse" />
                      <div>
                        <strong>{notification.title}</strong>
                        <p>{notification.detail}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="popover-wrap">
              <button
                className="user-menu"
                type="button"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((current) => !current)}
              >
                <Avatar name={applicant.name} size="sm" />
                <span>{applicant.name}</span>
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <strong>{applicant.name}</strong>
                  <span>{applicant.role}</span>
                  <button type="button" onClick={() => handleNavigate("profile")}>My Profile</button>
                  <button type="button" onClick={() => handleNavigate("resume-upload")}>Resume Upload</button>
                  <button type="button" onClick={() => handleNavigate("settings")}>Settings</button>
                  <button
                    type="button"
                    onClick={() => onToast?.({ title: "Signed out", message: "Logout is ready to connect to auth." })}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-transition">{children}</div>
      </main>
    </div>
  );
}
