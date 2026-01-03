import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/app/AppLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/app/ProtectedRoute";
import GuestRoute from "@/app/GuestRoute";
import Signup from "@/pages/Signup";
import Admin from "@/pages/Admin";
import Forbidden from "@/pages/Forbidden";
import RequireRole from "@/app/RequireRole";


export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireRole allow={["admin"]}>
              <Admin />
            </RequireRole>
          }
        />

        <Route path="/forbidden" element={<Forbidden />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
