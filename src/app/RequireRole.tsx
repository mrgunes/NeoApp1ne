import { Navigate, useLocation } from "react-router-dom";
import type { Role } from "@/lib/api/types";
import { useAuth } from "@/app/AuthProvider";
import type { ReactNode } from "react";


export default function RequireRole({
  children,
  allow,
}: {
  children: ReactNode;
  allow: Role[];
}) {
  const { user, isAuthed, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="text-slate-600">Checking session...</div>;

  if (!isAuthed) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, reason: "auth_required" }}
      />
    );
  }

  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
