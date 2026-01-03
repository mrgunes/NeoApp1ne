import { useAuth } from "@/app/AuthProvider";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
      {hint ? <div className="mt-1 text-sm text-slate-600">{hint}</div> : null}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-slate-600">
          Welcome{user?.email ? `, ${user.email}` : ""}. This page is protected.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Auth" value="Enabled" hint="Route is protected" />
        <StatCard label="Session" value="LocalStorage" hint="Mock token" />
        <StatCard label="Next" value="API Integration" hint="React Query" />
      </section>

      <section className="rounded-2xl border p-5">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Create Item (placeholder)
          </button>
          <button className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Sync Data (placeholder)
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          This is a template dashboard. Next, we’ll replace placeholders with a
          real API call using React Query and a typed API client.
        </div>
      </section>
    </div>
  );
}
