import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/AuthProvider";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthed, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="text-slate-600">Checking session...</div>;
  }

  if (!isAuthed) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, reason: "auth_required" }}
      />
    );
  }


  return children;
}
