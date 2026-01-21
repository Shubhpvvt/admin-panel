import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

/* ================= API ================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function GymOwnerManagement() {
  const navigate = useNavigate();

  /* 🔐 ROLE + TOKEN GUARD (MAIN FIX) */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/");
      return;
    }

    if (role !== "SUPER_ADMIN") {
      navigate("/"); // ⛔ only super admin allowed
    }
  }, [navigate]);

  const [owners, setOwners] = useState([]);
  const [editOwner, setEditOwner] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  /* ================= LOAD OWNERS ================= */
  useEffect(() => {
    api
      .get("/gym-owners")
      .then((res) => setOwners(res.data))
      .catch((err) =>
        console.log("LOAD ERROR", err.response?.data || err.message)
      );
  }, []);

  /* ================= ADD OWNER ================= */
  const addOwner = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Name, Email and Password required");
      return;
    }

    api
      .post("/gym-owners", {
        name: form.name,
        email: form.email,
        password: form.password,
        status: form.status,
      })
      .then((res) => {
        setOwners([res.data.owner, ...owners]);
        setForm({
          name: "",
          email: "",
          password: "",
          status: "Active",
        });
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Add failed");
      });
  };

  /* ================= DELETE ================= */
  const deleteOwner = (id) => {
    api
      .delete(`/gym-owners/${id}`)
      .then(() => {
        setOwners(owners.filter((o) => o._id !== id));
      })
      .catch(() => alert("Delete failed"));
  };

  /* ================= UPDATE ================= */
  const updateOwner = () => {
    const { name, email, status } = editOwner;

    api
      .put(`/gym-owners/${editOwner._id}`, {
        name,
        email,
        status,
      })
      .then((res) => {
        setOwners(
          owners.map((o) =>
            o._id === editOwner._id ? res.data.owner : o
          )
        );
        setEditOwner(null);
      })
      .catch(() => alert("Update failed"));
  };

  const filteredOwners = owners.filter((o) => {
    const matchText =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "All" || o.status === filterStatus;

    return matchText && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Gym Owner Management</h1>
        <p className="text-sm text-slate-500">
          Manage gym owners and their account status
        </p>
      </div>

      {/* ADD OWNER */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Add Gym Owner</h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="border px-3 py-2 rounded-md"
          />

          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email address"
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="Password"
            className="border px-3 py-2 rounded-md"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            className="border px-3 py-2 rounded-md"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={addOwner}
            className="bg-slate-900 text-white px-5 py-2 rounded-md"
          >
            Add Owner
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOwners.map((o) => (
              <tr key={o._id} className="border-b">
                <td className="py-3">{o.name}</td>
                <td>{o.email}</td>
                <td>{o.status}</td>
                <td className="text-right">
                  <button
                    onClick={() => setEditOwner(o)}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOwner(o._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {editOwner && (
        <Modal title="Edit Gym Owner" onClose={() => setEditOwner(null)}>
          <div className="space-y-4">
            <input
              value={editOwner.name}
              onChange={(e) =>
                setEditOwner({ ...editOwner, name: e.target.value })
              }
              className="border px-3 py-2 w-full"
            />

            <input
              value={editOwner.email}
              onChange={(e) =>
                setEditOwner({ ...editOwner, email: e.target.value })
              }
              className="border px-3 py-2 w-full"
            />

            <select
              value={editOwner.status}
              onChange={(e) =>
                setEditOwner({ ...editOwner, status: e.target.value })
              }
              className="border px-3 py-2 w-full"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              onClick={updateOwner}
              className="bg-slate-900 text-white px-5 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
