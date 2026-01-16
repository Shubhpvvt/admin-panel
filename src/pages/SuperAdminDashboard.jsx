import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StatCard from "../components/StatCard";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrainers: 0,
    totalGymOwners: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ❌ no token → login
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ CORRECT API CALL (ENV BASED)
    axios
      .get(`${import.meta.env.VITE_API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data && res.data.stats) {
          setStats({
            totalUsers: res.data.stats.totalUsers || 0,
            totalTrainers: res.data.stats.totalTrainers || 0,
            totalGymOwners: res.data.stats.totalGymOwners || 0,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("DASHBOARD ERROR 👉", err);
        setError("Failed to load dashboard");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Super Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of system performance and usage
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex gap-2">
          <button
            onClick={() => navigate("/gyms")}
            className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
          >
            Manage Gyms
          </button>
          <button
            onClick={() => navigate("/users")}
            className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Manage Users
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Trainers" value={stats.totalTrainers} />
        <StatCard title="Gym Owners" value={stats.totalGymOwners} />
        <StatCard title="Monthly Revenue" value="₹4.6L" />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Recent Activity
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b">
              <th className="pb-2">Type</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b">
              <td className="py-2">Gym</td>
              <td>Iron Core Fitness</td>
              <td>12 Sep 2026</td>
              <td className="text-green-600 font-medium">Active</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Trainer</td>
              <td>Rahul Sharma</td>
              <td>10 Sep 2026</td>
              <td className="text-green-600 font-medium">Approved</td>
            </tr>
            <tr>
              <td className="py-2">User</td>
              <td>Ankit Verma</td>
              <td>09 Sep 2026</td>
              <td className="text-yellow-600 font-medium">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
