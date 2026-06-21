import { useCallback, useEffect, useMemo, useState } from "react";
import authService, {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  DEMO_MODE,
  REMEMBERED_EMAIL_KEY,
  REMEMBER_ME_KEY,
  createMockJwtToken,
  createMockUser,
  isApiUnavailableError,
  setAuthHeader,
} from "../services/authService";
import { AuthContext } from "./AuthContextDefinition";

const readStoredUser = () => {
  try {
    const storedUser = window.localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const getTokenFromResponse = (response) => {
  const payload = response?.data || response || {};

  return (
    payload.token ||
    payload.accessToken ||
    payload.jwt ||
    payload.authToken ||
    response?.token ||
    null
  );
};

const normalizeUser = (rawUser = {}, fallbackEmail = "") => {
  const email = rawUser.email || fallbackEmail;
  const nameFromEmail = email ? email.split("@")[0].replace(/[._-]/g, " ") : "";
  const fullName =
    rawUser.fullName ||
    rawUser.name ||
    rawUser.displayName ||
    rawUser.username ||
    nameFromEmail ||
    "Candidate";

  return {
    ...rawUser,
    id: rawUser.id || rawUser._id || rawUser.userId || email,
    fullName,
    email,
    phone: rawUser.phone || rawUser.phoneNumber || rawUser.mobile || "",
    role: rawUser.role || rawUser.userRole || "Candidate",
    createdAt:
      rawUser.createdAt ||
      rawUser.createdDate ||
      rawUser.created_at ||
      rawUser.joinedAt ||
      "",
    avatar: rawUser.avatar || rawUser.profilePicture || rawUser.photoUrl || "",
  };
};

const getUserFromResponse = (response, fallbackEmail) => {
  const payload = response?.data || response || {};
  const rawUser =
    payload.user ||
    payload.profile ||
    payload.candidate ||
    payload.applicant ||
    payload.account ||
    (payload.email ? payload : null);

  return normalizeUser(rawUser || {}, fallbackEmail);
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKEN_KEY)
      : null,
  );
  const [user, setUser] = useState(() =>
    typeof window !== "undefined" ? readStoredUser() : null,
  );

  useEffect(() => {
    setAuthHeader(token);
  }, [token]);

  const persistSession = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    setAuthHeader(nextToken);
    window.localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
  }, []);

  const login = useCallback(
    async (credentials, rememberMe = false) => {
      const persistRememberMe = () => {
        if (rememberMe) {
          window.localStorage.setItem(REMEMBERED_EMAIL_KEY, credentials.email);
        } else {
          window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }

        window.localStorage.setItem(
          REMEMBER_ME_KEY,
          rememberMe ? "true" : "false",
        );
      };

      // Temporary demo flow. Remove this branch by setting DEMO_MODE to false
      // once the backend authentication API is available.
      const completeDemoLogin = () => {
        const nextToken = createMockJwtToken(credentials.email);
        const nextUser = createMockUser(credentials.email);

        persistSession(nextToken, nextUser);
        persistRememberMe();

        return { token: nextToken, user: nextUser, demoMode: true };
      };

      if (DEMO_MODE) {
        return completeDemoLogin();
      }

      try {
        const response = await authService.login({
          email: credentials.email,
          password: credentials.password,
        });
        const nextToken = getTokenFromResponse(response);

        if (!nextToken) {
          throw new Error("Login succeeded, but no token was returned.");
        }

        const nextUser = getUserFromResponse(response, credentials.email);
        persistSession(nextToken, nextUser);
        persistRememberMe();

        return { token: nextToken, user: nextUser, demoMode: false };
      } catch (error) {
        if (isApiUnavailableError(error)) {
          return completeDemoLogin();
        }

        throw error;
      }
    },
    [persistSession],
  );

  const refreshProfile = useCallback(async () => {
    const storedUser = readStoredUser();

    if (DEMO_MODE) {
      return storedUser;
    }

    const response = await authService.getProfile();
    const nextUser = getUserFromResponse(response, storedUser?.email);
    setUser(nextUser);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    return nextUser;
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthHeader(null);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(AUTH_USER_KEY);
    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    window.localStorage.removeItem(REMEMBER_ME_KEY);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (!DEMO_MODE) {
        await authService.logout();
      }
    } catch {
      // Clearing the client session is still correct if the server is offline.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      refreshProfile,
      isAuthenticated: Boolean(token),
    }),
    [user, token, login, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
