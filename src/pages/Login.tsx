import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/AuthProvider";
import { getSessionFlag, setSessionFlag } from "@/lib/http";



type LocationState = { from?: string };



export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from ?? "/dashboard";

  const { login, isLoading } = useAuth();

  const [email, setEmail] = React.useState("boss@neo.dev");
  const [password, setPassword] = React.useState("1234");
  const [error, setError] = React.useState<string | null>(null);
  const flag = getSessionFlag();
  const reason = (state as any)?.reason as string | undefined;

  const banner =
    flag === "session_expired"
      ? "Your session expired. Please sign in again."
      : reason === "auth_required"
        ? "Please sign in to continue."
        : null;


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);

      // ✅ CLEAR any session-expired / auth-required flag here
      setSessionFlag(null);

      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }


  return (
    <div className="max-w-md space-y-4 rounded-2xl border p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Login</h2>
      <p className="text-sm text-slate-600">
        Real API auth (JWT). Default demo credentials are prefilled.
      </p>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {banner && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {banner}
        </div>
      )}


      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm font-medium">
          Email
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="block text-sm font-medium">
          Password
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button
          disabled={isLoading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
