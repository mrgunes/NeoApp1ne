import React, { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, setToken, setSessionFlag } from "@/lib/http";
import { loginApi, meApi } from "@/lib/api/auth";
import type { AuthUser } from "@/lib/api/types";


type AuthContextValue = {
  user: AuthUser | null;
  isAuthed: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();

  // Session bootstrap: if token exists, verify it via /auth/me
const meQuery = useQuery({
  queryKey: ["auth", "me"],
  queryFn: meApi,
  enabled: Boolean(getToken()),
  retry: false,
});


  React.useEffect(() => {
    if (meQuery.isError && getToken()) {
      setToken(null);
      setSessionFlag("session_expired");
      qc.setQueryData(["auth", "me"], null);
      qc.removeQueries({ queryKey: ["auth", "me"] });
    }
  }, [meQuery.isError, qc]);


const loginMutation = useMutation({
  mutationFn: (vars: { email: string; password: string }) => loginApi(vars),
  onSuccess: async (data) => {
    setToken(data.token);
    setSessionFlag(null);
    await qc.invalidateQueries({ queryKey: ["auth", "me"] });
  },
});


  const logout = () => {
    setToken(null);
    qc.setQueryData(["auth", "me"], null);
    qc.removeQueries({ queryKey: ["auth", "me"] });
  };

  const value = useMemo<AuthContextValue>(() => {
    const user = (meQuery.data ?? null) as AuthUser | null;
    const token = getToken();

    // If token exists but /me failed, treat as logged out (token likely expired/invalid)
    const isAuthed = Boolean(token) && Boolean(user);

    const isLoading =
      // loading while checking /me (when token exists)
      (Boolean(token) && meQuery.isLoading) ||
      // loading while logging in
      loginMutation.isPending;

    return {
      user,
      isAuthed,
      isLoading,
      login: async (email: string, password: string) => {
        await loginMutation.mutateAsync({ email, password });
      },
      logout,
    };
  }, [meQuery.data, meQuery.isLoading, loginMutation.isPending]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
