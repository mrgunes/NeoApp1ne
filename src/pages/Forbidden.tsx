import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="space-y-3 rounded-2xl border p-6">
      <h1 className="text-2xl font-semibold">403 — Forbidden</h1>
      <p className="text-slate-600">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
      >
        Back to Home
      </Link>
    </div>
  );
}
