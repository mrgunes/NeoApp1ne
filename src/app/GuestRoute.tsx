import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/AuthProvider";
import type { ReactNode } from "react";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthed, isLoading } = useAuth();

  if (isLoading) return <div className="text-slate-600">Checking session...</div>;

  if (isAuthed) return <Navigate to="/dashboard" replace />;

  return children;
}
