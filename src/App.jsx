import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";

// Core pages
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import GymManagement from "./pages/GymManagement";
import GymOwnerManagement from "./pages/GymOwnerManagement";
import TrainerManagement from "./pages/TrainerManagement";
import UserManagement from "./pages/UserManagement";

// Pages 6–13
import MembershipPlans from "./pages/MembershipPlans";
import WorkoutPlans from "./pages/WorkoutPlans";
import DietPlans from "./pages/DietPlans";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Roles from "./pages/Roles";

/* 🔐 AUTH CHECK */
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/* 🔒 PROTECTED ROUTE WRAPPER */
const Protected = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* DASHBOARD & ALL PROTECTED PAGES */}
      <Route
        path="/dashboard"
        element={
          <Protected>
            <AppLayout>
              <SuperAdminDashboard />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/gyms"
        element={
          <Protected>
            <AppLayout>
              <GymManagement />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/gym-owners"
        element={
          <Protected>
            <AppLayout>
              <GymOwnerManagement />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/trainers"
        element={
          <Protected>
            <AppLayout>
              <TrainerManagement />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/users"
        element={
          <Protected>
            <AppLayout>
              <UserManagement />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/membership-plans"
        element={
          <Protected>
            <AppLayout>
              <MembershipPlans />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/workout-plans"
        element={
          <Protected>
            <AppLayout>
              <WorkoutPlans />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/diet-plans"
        element={
          <Protected>
            <AppLayout>
              <DietPlans />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/attendance"
        element={
          <Protected>
            <AppLayout>
              <Attendance />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/payments"
        element={
          <Protected>
            <AppLayout>
              <Payments />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/reports"
        element={
          <Protected>
            <AppLayout>
              <Reports />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/settings"
        element={
          <Protected>
            <AppLayout>
              <Settings />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/roles"
        element={
          <Protected>
            <AppLayout>
              <Roles />
            </AppLayout>
          </Protected>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
