import { NavLink } from "react-router-dom";

const linkClass =
  "block px-3 py-2 rounded text-sm hover:bg-slate-800";

export default function Sidebar({ closeSidebar }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-1">
        <NavLink to="/dashboard" onClick={closeSidebar} className={linkClass}>Dashboard</NavLink>
        <NavLink to="/gyms" onClick={closeSidebar} className={linkClass}>Gyms</NavLink>
        <NavLink to="/gym-owners" onClick={closeSidebar} className={linkClass}>Gym Owners</NavLink>
        <NavLink to="/trainers" onClick={closeSidebar} className={linkClass}>Trainers</NavLink>
        <NavLink to="/users" onClick={closeSidebar} className={linkClass}>Users</NavLink>

        <hr className="border-slate-700 my-3" />

        <NavLink to="/membership-plans" onClick={closeSidebar} className={linkClass}>Membership Plans</NavLink>
        <NavLink to="/workout-plans" onClick={closeSidebar} className={linkClass}>Workout Plans</NavLink>
        <NavLink to="/diet-plans" onClick={closeSidebar} className={linkClass}>Diet Plans</NavLink>
        <NavLink to="/attendance" onClick={closeSidebar} className={linkClass}>Attendance</NavLink>
        <NavLink to="/payments" onClick={closeSidebar} className={linkClass}>Payments</NavLink>
        <NavLink to="/reports" onClick={closeSidebar} className={linkClass}>Reports</NavLink>
        <NavLink to="/settings" onClick={closeSidebar} className={linkClass}>Settings</NavLink>
        <NavLink to="/roles" onClick={closeSidebar} className={linkClass}>Roles</NavLink>
      </nav>
    </aside>
  );
}
