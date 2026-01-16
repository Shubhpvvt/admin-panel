import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between
                       h-12 px-6
                       border-b border-slate-200
                       bg-white">
      {/* LEFT: PAGE TITLE */}
      <h1 className="text-base font-semibold text-slate-800">
        {title}
      </h1>

      {/* RIGHT: PROFILE (NO CONTAINER) */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2
                     text-sm text-slate-700
                     hover:text-slate-900"
        >
          <span>Admin</span>

          <div
            className="h-7 w-7 rounded-full
                       bg-slate-900 text-white
                       flex items-center justify-center
                       text-xs font-semibold"
          >
            A
          </div>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-2 w-32
                       bg-white border border-slate-200
                       shadow-sm"
          >
            <button
              onClick={() => navigate("/")}
              className="w-full text-left
                         px-3 py-2 text-sm
                         text-slate-700
                         hover:bg-slate-100"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}