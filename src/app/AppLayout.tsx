import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/app/AuthProvider";

const navBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100";
const navActive = "bg-slate-100";

export default function AppLayout() {
  const { isAuthed, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Brand */}
          <div className="text-base font-semibold">Neo App</div>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navBase} ${isActive ? navActive : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navBase} ${isActive ? navActive : ""}`
              }
            >
              Dashboard
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? navActive : ""}`
                }
              >
                Admin
              </NavLink>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthed ? (
              <>
                <span className="text-sm text-slate-600">
                  {user?.email} <span className="text-slate-400">({user?.role})</span>
                </span>

                <button
                  onClick={logout}
                  className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
