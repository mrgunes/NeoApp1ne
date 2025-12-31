import { useAuth } from "@/app/AuthProvider";

export default function Admin() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-slate-600">
        Restricted area. Current role: <span className="font-medium">{user?.role}</span>
      </p>

      <div className="rounded-2xl border p-5">
        <div className="text-sm text-slate-500">Admin actions</div>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Manage users (placeholder)</li>
          <li>System settings (placeholder)</li>
          <li>Audit logs (placeholder)</li>
        </ul>
      </div>
    </div>
  );
}
