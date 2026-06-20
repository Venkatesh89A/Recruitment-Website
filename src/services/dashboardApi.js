import { dashboardData } from "../data/mockData.js";

const API_BASE = import.meta.env.VITE_DASHBOARD_API_BASE || "";

const endpoints = {
  applicant: "/api/dashboard/applicant",
  admin: "/api/dashboard/admin",
  applications: "/api/applications",
  candidates: "/api/candidates",
  resume: "/api/resume",
};

async function requestJson(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Dashboard API failed with ${response.status}`);
  }

  return response.json();
}

function extractObject(payload, key, fallback) {
  if (payload?.[key] && typeof payload[key] === "object") return payload[key];
  if (payload?.data && typeof payload.data === "object" && !Array.isArray(payload.data)) return payload.data;
  if (payload && typeof payload === "object" && !Array.isArray(payload)) return payload;
  return fallback;
}

function extractList(payload, key, fallback) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data)) return payload.data;
  return fallback;
}

export async function loadDashboardBundle() {
  const results = await Promise.allSettled([
    requestJson(endpoints.applicant),
    requestJson(endpoints.admin),
    requestJson(endpoints.applications),
    requestJson(endpoints.candidates),
    requestJson(endpoints.resume),
  ]);

  const [applicant, admin, applications, candidates, resume] = results;
  const connected = results.some((result) => result.status === "fulfilled");

  return {
    connected,
    applicant:
      applicant.status === "fulfilled"
        ? { ...dashboardData.applicant, ...extractObject(applicant.value, "applicant", dashboardData.applicant) }
        : dashboardData.applicant,
    admin:
      admin.status === "fulfilled"
        ? { ...dashboardData.admin, ...extractObject(admin.value, "admin", dashboardData.admin) }
        : dashboardData.admin,
    applications:
      applications.status === "fulfilled"
        ? extractList(applications.value, "applications", dashboardData.applications)
        : dashboardData.applications,
    candidates:
      candidates.status === "fulfilled"
        ? extractList(candidates.value, "candidates", dashboardData.candidates)
        : dashboardData.candidates,
    resume:
      resume.status === "fulfilled"
        ? { ...dashboardData.resume, ...extractObject(resume.value, "resume", dashboardData.resume) }
        : dashboardData.resume,
  };
}

export async function updateApplicationStatus(applicationId, status) {
  return requestJson(`${endpoints.applications}/${applicationId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function uploadResume(candidateId, file) {
  const formData = new FormData();
  formData.append("candidateId", candidateId);
  formData.append("resume", file);

  const response = await fetch(`${API_BASE}${endpoints.resume}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Resume upload failed with ${response.status}`);
  }

  return response.json();
}
