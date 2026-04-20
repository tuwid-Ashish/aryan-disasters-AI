import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AppProviders({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("adai_token") || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("adai_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token));

  useEffect(() => {
    if (token) {
      localStorage.setItem("adai_token", token);
    } else {
      localStorage.removeItem("adai_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("adai_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("adai_user");
    }
  }, [user]);

  useEffect(() => {
    async function bootstrapSession() {
      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setUser(response.data.data.user);
      } catch {
        setToken("");
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrapSession();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isBootstrapping,
      login(nextToken, nextUser) {
        setToken(nextToken);
        setUser(nextUser);
      },
      logout() {
        setToken("");
        setUser(null);
      }
    }),
    [isBootstrapping, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AppProviders");
  }

  return context;
}
