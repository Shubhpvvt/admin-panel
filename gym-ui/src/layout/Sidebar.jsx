import { NavLink } from "react-router-dom";

const linkClass =
  "block px-3 py-2 rounded text-sm hover:bg-slate-800";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-1">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/gyms" className={linkClass}>Gyms</NavLink>
        <NavLink to="/gym-owners" className={linkClass}>Gym Owners</NavLink>
        <NavLink to="/trainers" className={linkClass}>Trainers</NavLink>
        <NavLink to="/users" className={linkClass}>Users</NavLink>

        <hr className="border-slate-700 my-3" />

        <NavLink to="/membership-plans" className={linkClass}>Membership Plans</NavLink>
        <NavLink to="/workout-plans" className={linkClass}>Workout Plans</NavLink>
        <NavLink to="/diet-plans" className={linkClass}>Diet Plans</NavLink>
        <NavLink to="/attendance" className={linkClass}>Attendance</NavLink>
        <NavLink to="/payments" className={linkClass}>Payments</NavLink>
        <NavLink to="/reports" className={linkClass}>Reports</NavLink>
        <NavLink to="/settings" className={linkClass}>Settings</NavLink>
        <NavLink to="/roles" className={linkClass}>Roles</NavLink>
      </nav>
    </aside>
  );
}
