import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";

/* ===== DASHBOARD (COMMON) ===== */
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

/* ===== MANAGEMENT PAGES ===== */
import GymManagement from "./pages/GymManagement";
import GymOwnerManagement from "./pages/GymOwnerManagement";
import TrainerManagement from "./pages/TrainerManagement";
import UserManagement from "./pages/UserManagement";

/* ===== OTHER PAGES ===== */
import MembershipPlans from "./pages/MembershipPlans";
import WorkoutPlans from "./pages/WorkoutPlans";
import DietPlans from "./pages/DietPlans";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Roles from "./pages/Roles";

/* =========================================================
   🔐 GUARD (Login + Role Protection)
   IDM compliant – no extra file
   ========================================================= */
const Guard = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role))
    return <h2 style={{ padding: 20 }}>Access Denied</h2>;

  return children;
};

export default function App() {
  return (
    <Routes>
      {/* ================= LOGIN ================= */}
      <Route path="/" element={<Login />} />

      {/* ================= DASHBOARD ================= */}
      {/* All roles land here, sidebar + guards decide access */}
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN", "GYM_OWNER", "TRAINER", "USER"]}>
              <SuperAdminDashboard />
            </Guard>
          </AppLayout>
        }
      />

      {/* ================= SUPER ADMIN ONLY ================= */}
      <Route
        path="/gyms"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN"]}>
              <GymManagement />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/gym-owners"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN"]}>
              <GymOwnerManagement />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/roles"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN"]}>
              <Roles />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN"]}>
              <Reports />
            </Guard>
          </AppLayout>
        }
      />

      {/* ================= SUPER ADMIN + GYM OWNER ================= */}
      <Route
        path="/trainers"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN", "GYM_OWNER"]}>
              <TrainerManagement />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/users"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN", "GYM_OWNER"]}>
              <UserManagement />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/payments"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN", "GYM_OWNER"]}>
              <Payments />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/membership-plans"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN", "GYM_OWNER"]}>
              <MembershipPlans />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <AppLayout>
            <Guard allowedRoles={["SUPER_ADMIN", "GYM_OWNER"]}>
              <Settings />
            </Guard>
          </AppLayout>
        }
      />

      {/* ================= GYM OWNER + TRAINER ================= */}
      <Route
        path="/workout-plans"
        element={
          <AppLayout>
            <Guard allowedRoles={["GYM_OWNER", "TRAINER"]}>
              <WorkoutPlans />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/diet-plans"
        element={
          <AppLayout>
            <Guard allowedRoles={["GYM_OWNER", "TRAINER"]}>
              <DietPlans />
            </Guard>
          </AppLayout>
        }
      />

      <Route
        path="/attendance"
        element={
          <AppLayout>
            <Guard allowedRoles={["GYM_OWNER", "TRAINER"]}>
              <Attendance />
            </Guard>
          </AppLayout>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
