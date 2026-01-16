import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white
          transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col relative">

        {/* HEADER (NO BORDER, NO BG, NO BOX) */}
        <header className="h-12 flex items-center px-4 sm:px-6">

          {/* LEFT: MENU (MOBILE ONLY) */}
          <span
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden cursor-pointer text-slate-700 font-semibold"
          >
            ☰
          </span>

          {/* RIGHT: ADMIN / LOGOUT (NAKED TEXT) */}
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-slate-800 font-medium">
              Admin
            </span>

            <span className="text-slate-400">/</span>

            <span
              onClick={logout}
              className="cursor-pointer text-slate-600 hover:text-red-600 transition"
              title="Logout"
            >
              Logout ↪
            </span>
          </div>
        </header>

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
