import { Link } from "react-router-dom";
import { useAuth } from "@/app/AuthProvider";

export default function Landing() {
  const { isAuthed } = useAuth();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Neo React Starter
        </h1>
        <p className="max-w-2xl text-slate-600">
          A reusable frontend baseline with React, TypeScript, Tailwind, routing,
          and auth-ready architecture.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {isAuthed ? (
            <Link
              to="/dashboard"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Login
            </Link>
          )}

          <a
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            href="https://vite.dev"
            target="_blank"
            rel="noreferrer"
          >
            Vite Docs
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-slate-500">Stack</div>
          <div className="mt-2 font-semibold">React + TS + Vite</div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-sm text-slate-500">UI</div>
          <div className="mt-2 font-semibold">Tailwind CSS</div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-sm text-slate-500">Architecture</div>
          <div className="mt-2 font-semibold">Router + Auth + Query</div>
        </div>
      </section>

      <section className="rounded-2xl border p-5">
        <h2 className="text-lg font-semibold">Next milestones</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>Protected routes (done) + role-based access</li>
          <li>API client + React Query data fetching</li>
          <li>Form validation + error states</li>
          <li>CI pipeline for lint/build checks</li>
        </ul>
      </section>
    </div>
  );
}
