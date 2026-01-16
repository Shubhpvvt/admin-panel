import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function GymOwnerManagement() {
  const [owners, setOwners] = useState([]);
  const [editOwner, setEditOwner] = useState(null);

  // 🔧 FIXED FORM STATE (no comment inside object)
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const token = localStorage.getItem("token");

  /* LOAD OWNERS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/gym-owners", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOwners(res.data))
      .catch((err) => console.log("LOAD ERROR", err));
  }, [token]);

  /* ADD OWNER */
  const addOwner = () => {
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    axios
      .post(
        "http://localhost:5000/gym-owners",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setOwners([res.data.owner, ...owners]);
        setForm({ name: "", email: "", status: "Active" });
      })
      .catch((err) => {
        console.log("ADD ERROR", err);
        alert("Add failed");
      });
  };

  /* DELETE */
  const deleteOwner = (id) => {
    axios
      .delete(`http://localhost:5000/gym-owners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setOwners(owners.filter((o) => o._id !== id));
      });
  };

  /* UPDATE */
  const updateOwner = () => {
    axios
      .put(
        `http://localhost:5000/gym-owners/${editOwner._id}`,
        editOwner,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setOwners(
          owners.map((o) =>
            o._id === editOwner._id ? res.data.owner : o
          )
        );
        setEditOwner(null);
      });
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
    <div className="space-y-8 relative z-0 pointer-events-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Gym Owner Management</h1>
        <p className="text-sm text-slate-500">
          Manage gym owners and their account status
        </p>
      </div>

      {/* ADD OWNER */}
      <div className="bg-white p-6 rounded-xl shadow pointer-events-auto">
        <h2 className="text-lg font-semibold mb-4">Add Gym Owner</h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border px-3 py-2 rounded-md"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            type="button"
            onClick={addOwner}
            className="bg-slate-900 text-white px-5 py-2 rounded-md hover:bg-slate-800"
          >
            Add Owner
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded-md w-full"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="All">All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow pointer-events-auto">
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
