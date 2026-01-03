import React from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/app/AuthProvider";

type LocationState = { from?: string };

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from ?? "/dashboard";

  const { signup, isLoading } = useAuth();

  const [email, setEmail] = React.useState("newuser@neo.dev");
  const [password, setPassword] = React.useState("password123");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await signup(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  }

  return (
    <div className="max-w-md space-y-4 rounded-2xl border p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Create account</h2>
      <p className="text-sm text-slate-600">
        Sign up creates a user in Postgres and issues a session.
      </p>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
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
            autoComplete="new-password"
          />
        </label>

        <button
          disabled={isLoading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isLoading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <NavLink className="font-medium underline" to="/login">
          Sign in
        </NavLink>
      </p>
    </div>
  );
}
