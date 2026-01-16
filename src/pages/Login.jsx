import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        {
          withCredentials: true
        }
      );

      // 🔥 IMPORTANT: token + user dono save karo
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "superAdmin") {
        navigate("/dashboard");
      } else if (role === "gymOwner") {
        navigate("/dashboard/gym-owner");
      } else if (role === "trainer") {
        navigate("/dashboard/trainer");
      } else {
        navigate("/dashboard/user");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-100">

      {/* LEFT BRAND */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Gym Management System
          </h1>

          <p className="mt-4 text-slate-300 max-w-md leading-relaxed">
            A centralized platform to manage gyms, trainers, members,
            diet plans, workouts and payments efficiently.
          </p>

          <ul className="mt-8 space-y-2 text-slate-300 text-sm">
            <li>• Role based access control</li>
            <li>• Secure & scalable system</li>
            <li>• Designed for admins & trainers</li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">
          © 2026 Gym Management System
        </p>
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex items-center justify-center px-8 sm:px-12">
        <div
          className="
            w-full max-w-md
            min-h-[420px] sm:min-h-[480px]
            bg-white rounded-xl shadow-lg
            p-8 sm:p-10
            flex flex-col justify-center
          "
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Sign in to your account
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Use your admin credentials to continue
          </p>

          <div className="h-px w-full bg-slate-200 my-6"></div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="
                w-full rounded-md border border-slate-300
                px-3 py-2 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-slate-900
                focus:border-slate-900
                disabled:bg-slate-100
              "
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="
                  w-full rounded-md border border-slate-300
                  px-3 py-2 pr-12 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-slate-900
                  focus:border-slate-900
                  disabled:bg-slate-100
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-sm font-medium text-slate-500
                  hover:text-slate-900
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full rounded-md
              bg-slate-900 hover:bg-slate-800
              text-white py-2.5 font-semibold
              shadow-md hover:shadow-lg
              transition-all duration-200
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-xs text-slate-400 text-center mt-6">
            Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
