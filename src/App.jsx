import { useEffect, useMemo, useState } from "react";
import { DashboardSkeleton } from "./components/common/Skeleton.jsx";
import { Toast } from "./components/common/Toast.jsx";
import { dashboardData } from "./data/mockData.js";
import { AppLayout } from "./layout/AppLayout.jsx";
import { AdminDashboard } from "./modules/admin/pages/AdminDashboard.jsx";
import { CandidateDetailsPage } from "./modules/admin/pages/CandidateDetailsPage.jsx";
import { ManageApplicationsPage } from "./modules/admin/pages/ManageApplicationsPage.jsx";
import { ApplicantDashboard } from "./modules/applicant/pages/ApplicantDashboard.jsx";
import { ApplicationStatus } from "./modules/applicant/pages/ApplicationStatus.jsx";
import { ProfilePage } from "./modules/applicant/pages/ProfilePage.jsx";
import { ResumeUploadPage } from "./modules/applicant/pages/ResumeUploadPage.jsx";
import { SettingsPage } from "./modules/applicant/pages/SettingsPage.jsx";
import { loadDashboardBundle, updateApplicationStatus, uploadResume } from "./services/dashboardApi.js";

const statusFlow = ["Applied", "Reviewed", "Shortlisted", "Interview", "Offer"];

export default function App() {
  const [activePage, setActivePage] = useState(() => window.location.hash.replace("#", "") || "applicant");
  const [apiConnected, setApiConnected] = useState(false);
  const [applicant, setApplicant] = useState(dashboardData.applicant);
  const [admin, setAdmin] = useState(dashboardData.admin);
  const [applications, setApplications] = useState(dashboardData.applications);
  const [candidates, setCandidates] = useState(dashboardData.candidates);
  const [resume, setResume] = useState(dashboardData.resume);
  const [selectedCandidateId, setSelectedCandidateId] = useState(dashboardData.applicant.id);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let isMounted = true;
    loadDashboardBundle().then((bundle) => {
      if (!isMounted) return;
      setApiConnected(bundle.connected);
      setApplicant(bundle.applicant);
      setAdmin(bundle.admin);
      setApplications(bundle.applications);
      setCandidates(bundle.candidates);
      setResume(bundle.resume);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(window.location.hash.replace("#", "") || "applicant");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const pages = useMemo(
    () => ({
      applicant: (
        <ApplicantDashboard applicant={applicant} applications={applications} onNavigate={navigate} />
      ),
      "application-status": <ApplicationStatus applicant={applicant} applications={applications} />,
      profile: (
        <ProfilePage
          applicant={applicant}
          resume={resume}
          onNavigate={navigate}
          onResumeUpload={handleResumeUpload}
          onToast={showToast}
        />
      ),
      "resume-upload": (
        <ResumeUploadPage
          applicant={applicant}
          resume={resume}
          onResumeUpload={handleResumeUpload}
          onToast={showToast}
        />
      ),
      settings: <SettingsPage applicant={applicant} onToast={showToast} />,
      admin: <AdminDashboard admin={admin} applications={applications} onNavigate={navigate} />,
      "manage-applications": (
        <ManageApplicationsPage
          applications={applications}
          onAdvanceStatus={handleAdvanceStatus}
          onViewCandidate={(candidateId) => {
            setSelectedCandidateId(candidateId);
            navigate("candidate-details");
          }}
        />
      ),
      "candidate-details": (
        <CandidateDetailsPage
          applications={applications}
          candidates={candidates}
          selectedCandidateId={selectedCandidateId}
          onSelectCandidate={setSelectedCandidateId}
        />
      ),
    }),
    [admin, applicant, applications, candidates, resume, selectedCandidateId],
  );

  function showToast(nextToast) {
    setToast(nextToast);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 3600);
  }

  function navigate(pageId) {
    window.location.hash = pageId;
    setActivePage(pageId);
  }

  async function handleAdvanceStatus(applicationId) {
    const application = applications.find((item) => item.id === applicationId);
    if (!application) return;
    const currentIndex = statusFlow.indexOf(application.status);
    const nextStatus = statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)] || "Reviewed";

    try {
      await updateApplicationStatus(applicationId, nextStatus);
      setApiConnected(true);
    } catch {
      setApiConnected(false);
    }

    setApplications((current) =>
      current.map((item) =>
        item.id === applicationId
          ? { ...item, status: nextStatus, stage: `${nextStatus} Stage`, lastUpdate: "19 Jun 2026" }
          : item,
      ),
    );
    showToast({
      title: "Application updated",
      message: `${application.candidate} moved to ${nextStatus}.`,
      type: "success",
    });
  }

  async function handleResumeUpload(file) {
    const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!allowed || file.size > 5 * 1024 * 1024) {
      showToast({
        title: "Resume not uploaded",
        message: "Use PDF, DOC, or DOCX under 5MB.",
        type: "error",
      });
      return;
    }

    try {
      const payload = await uploadResume(applicant.id, file);
      setResume((current) => {
        const apiResume = payload.resume || payload.data || payload;
        const nextResume = {
          ...current,
          ...apiResume,
          fileName: apiResume.fileName || file.name,
          uploadedAt: apiResume.uploadedAt || "19 Jun 2026",
          size: apiResume.size || `${Math.max(1, Math.round(file.size / 1024))} KB`,
          format: apiResume.format || file.name.split(".").pop().toUpperCase(),
        };
        return {
          ...nextResume,
          history: [
            { fileName: nextResume.fileName, uploadedAt: nextResume.uploadedAt, status: "Uploaded" },
            ...(current.history || []),
          ].slice(0, 4),
        };
      });
      setApiConnected(true);
      showToast({ title: "Resume Uploaded Successfully", message: "The candidate resume is synced with the API." });
    } catch {
      setResume((current) => {
        const nextResume = {
          ...current,
          fileName: file.name,
          uploadedAt: "19 Jun 2026",
          size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
          format: file.name.split(".").pop().toUpperCase(),
        };
        return {
          ...nextResume,
          history: [
            { fileName: nextResume.fileName, uploadedAt: nextResume.uploadedAt, status: "Selected" },
            ...(current.history || []),
          ].slice(0, 4),
        };
      });
      setApiConnected(false);
      showToast({ title: "Resume Uploaded Successfully", message: "The resume is ready for API upload." });
    }
  }

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={navigate}
      applicant={applicant}
      apiConnected={apiConnected}
      applications={applications}
      candidates={candidates}
      onToast={showToast}
      onViewCandidate={(candidateId) => {
        setSelectedCandidateId(candidateId);
        navigate("candidate-details");
      }}
    >
      {loading ? <DashboardSkeleton /> : pages[activePage] || pages.applicant}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </AppLayout>
  );
}
