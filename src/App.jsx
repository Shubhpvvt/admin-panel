import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<AppLayout><SuperAdminDashboard /></AppLayout>} />
      <Route path="/gyms" element={<AppLayout><GymManagement /></AppLayout>} />
      <Route path="/gym-owners" element={<AppLayout><GymOwnerManagement /></AppLayout>} />
      <Route path="/trainers" element={<AppLayout><TrainerManagement /></AppLayout>} />
      <Route path="/users" element={<AppLayout><UserManagement /></AppLayout>} />

      <Route path="/membership-plans" element={<AppLayout><MembershipPlans /></AppLayout>} />
      <Route path="/workout-plans" element={<AppLayout><WorkoutPlans /></AppLayout>} />
      <Route path="/diet-plans" element={<AppLayout><DietPlans /></AppLayout>} />
      <Route path="/attendance" element={<AppLayout><Attendance /></AppLayout>} />
      <Route path="/payments" element={<AppLayout><Payments /></AppLayout>} />
      <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
      <Route path="/roles" element={<AppLayout><Roles /></AppLayout>} />
    </Routes>
  );
}
