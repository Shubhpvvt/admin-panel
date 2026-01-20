import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const linkClass =
  "block px-3 py-2 rounded text-sm hover:bg-slate-800";

export default function Sidebar() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const syncRole = () => {
      setRole(localStorage.getItem("role"));
    };

    // sync on load
    syncRole();

    // sync on logout / login (storage change)
    window.addEventListener("storage", syncRole);
    return () => window.removeEventListener("storage", syncRole);
  }, []);

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">
        {role === "SUPER_ADMIN" && "Super Admin Panel"}
        {role === "GYM_OWNER" && "Gym Owner Panel"}
        {role === "TRAINER" && "Trainer Panel"}
        {role === "USER" && "User Panel"}
      </h2>

      <nav className="space-y-1">
        {/* ================= COMMON ================= */}
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        {/* ================= SUPER ADMIN ================= */}
        {role === "SUPER_ADMIN" && (
          <>
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
          </>
        )}

        {/* ================= GYM OWNER ================= */}
        {role === "GYM_OWNER" && (
          <>
            <NavLink to="/trainers" className={linkClass}>Trainers</NavLink>
            <NavLink to="/users" className={linkClass}>Users</NavLink>

            <hr className="border-slate-700 my-3" />

            <NavLink to="/membership-plans" className={linkClass}>Membership Plans</NavLink>
            <NavLink to="/workout-plans" className={linkClass}>Workout Plans</NavLink>
            <NavLink to="/diet-plans" className={linkClass}>Diet Plans</NavLink>
            <NavLink to="/attendance" className={linkClass}>Attendance</NavLink>
            <NavLink to="/payments" className={linkClass}>Payments</NavLink>
            <NavLink to="/settings" className={linkClass}>Settings</NavLink>
          </>
        )}

        {/* ================= TRAINER ================= */}
        {role === "TRAINER" && (
          <>
            <NavLink to="/workout-plans" className={linkClass}>Workout Plans</NavLink>
            <NavLink to="/diet-plans" className={linkClass}>Diet Plans</NavLink>
            <NavLink to="/attendance" className={linkClass}>Attendance</NavLink>
          </>
        )}

        {/* ================= USER ================= */}
        {role === "USER" && (
          <>
            <NavLink to="/workout-plans" className={linkClass}>My Workout</NavLink>
            <NavLink to="/diet-plans" className={linkClass}>My Diet</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
