import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Temporary demo flag. Set this to false when the authentication API is ready.
export const DEMO_MODE = true;
export const DEMO_MODE_MESSAGE =
  "Backend authentication is currently unavailable. This frontend is running in demonstration mode. API integration will automatically work once the backend becomes available.";

export const AUTH_TOKEN_KEY = "recruitment_auth_token";
export const AUTH_USER_KEY = "recruitment_auth_user";
export const REMEMBERED_EMAIL_KEY = "recruitment_remembered_email";
export const REMEMBER_ME_KEY = "recruitment_remember_me";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete apiClient.defaults.headers.common.Authorization;
};

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKEN_KEY)
      : null;

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrapResponse = (response) => response.data;

const toBase64Url = (value) =>
  window
    .btoa(JSON.stringify(value))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

// Temporary demo helpers. They keep local auth usable until the backend exists.
export const createMockJwtToken = (email) =>
  [
    toBase64Url({ alg: "HS256", typ: "JWT" }),
    toBase64Url({
      sub: email,
      fullName: "Demo Applicant",
      role: "Applicant",
      iat: Math.floor(Date.now() / 1000),
    }),
    "demo-signature",
  ].join(".");

export const createMockUser = (email) => ({
  fullName: "Demo Applicant",
  email,
  phone: "9876543210",
  role: "Applicant",
  createdAt: "2026-06-20",
});

export const isApiUnavailableError = (error) => {
  const status = error?.response?.status;

  return (
    error?.code === "ERR_NETWORK" ||
    error?.message === "Network Error" ||
    !error?.response ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
};

const authService = {
  login(payload) {
    return apiClient.post("/auth/login", payload).then(unwrapResponse);
  },

  register(payload) {
    return apiClient.post("/auth/register", payload).then(unwrapResponse);
  },

  forgotPassword(payload) {
    return apiClient
      .post("/auth/forgot-password", payload)
      .then(unwrapResponse);
  },

  getProfile() {
    return apiClient.get("/auth/profile").then(unwrapResponse);
  },

  logout() {
    return apiClient.post("/auth/logout").then(unwrapResponse);
  },
};

export default authService;
