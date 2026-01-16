import { useState } from "react";

export default function UserManagement() {
  // 🔹 Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          User Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Create and manage users across the platform
        </p>
      </div>

      {/* ================= ADD USER FORM ================= */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Add New User
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full rounded-md border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@email.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option>User</option>
              <option>Trainer</option>
              <option>Gym Owner</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <button
          className="mt-4 bg-slate-900 hover:bg-slate-800 text-white
                     px-5 py-2 rounded-md font-medium"
        >
          Add User
        </button>
      </div>

      {/* ================= USERS LIST ================= */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Registered Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              <tr className="border-b">
                <td className="py-2">Amit Sharma</td>
                <td>amit@gmail.com</td>
                <td>User</td>
                <td className="text-green-600 font-medium">Active</td>
              </tr>

              <tr>
                <td className="py-2">Rohit Verma</td>
                <td>rohit@gmail.com</td>
                <td>Trainer</td>
                <td className="text-red-600 font-medium">Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

