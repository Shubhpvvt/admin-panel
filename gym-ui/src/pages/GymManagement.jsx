import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function GymManagement() {
  const [gyms, setGyms] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [editGym, setEditGym] = useState(null);

  const token = localStorage.getItem("token");

  /* ================= LOAD GYMS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gyms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGyms(res.data);
      })
      .catch((err) => {
        console.log("LOAD ERROR", err);
      });
  }, []);

  /* ================= ADD GYM ================= */
  const addGym = () => {
    if (!name.trim()) {
      alert("Gym name required");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/gyms",
        { name, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setGyms([res.data.gym, ...gyms]);
        setName("");
        setStatus("Active");
      })
      .catch((err) => {
        console.log("ADD ERROR", err.response?.data || err.message);
        alert("Add failed");
      });
  };

  /* ================= DELETE GYM ================= */
  const deleteGym = (id) => {
    axios
      .delete(`http://localhost:5000/api/gyms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setGyms(gyms.filter((g) => g._id !== id));
      })
      .catch((err) => {
        console.log("DELETE ERROR", err);
      });
  };

  /* ================= UPDATE GYM ================= */
  const updateGym = () => {
    axios
      .put(
        `http://localhost:5000/api/gyms/${editGym._id}`,
        {
          name: editGym.name,
          status: editGym.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setGyms(
          gyms.map((g) =>
            g._id === editGym._id ? res.data.gym : g
          )
        );
        setEditGym(null);
      })
      .catch((err) => {
        console.log("UPDATE ERROR", err);
      });
  };

  /* ================= SEARCH + FILTER ================= */
  const filteredGyms = gyms.filter((g) => {
    const matchName = g.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "All" || g.status === filterStatus;

    return matchName && matchStatus;
  });

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Gym Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage gyms and their operational status
        </p>
      </div>

      {/* ADD GYM */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Add New Gym
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Gym name"
            className="border rounded-md px-3 py-2"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={addGym}
            className="bg-slate-900 text-white rounded-md px-5 py-2"
          >
            Add Gym
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          placeholder="Search gym by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="All">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Registered Gyms
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b">
              <th className="pb-2">Gym Name</th>
              <th className="pb-2">Status</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredGyms.map((gym) => (
              <tr key={gym._id} className="border-b">
                <td className="py-3">{gym.name}</td>
                <td>{gym.status}</td>
                <td className="text-right">
                  <button
                    onClick={() => setEditGym(gym)}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteGym(gym._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredGyms.length === 0 && (
          <p className="text-center text-slate-400 mt-4">
            No gyms found
          </p>
        )}
      </div>

      {/* EDIT MODAL */}
      {editGym && (
        <Modal title="Edit Gym" onClose={() => setEditGym(null)}>
          <div className="space-y-4">
            <input
              value={editGym.name}
              onChange={(e) =>
                setEditGym({ ...editGym, name: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-full"
            />

            <select
              value={editGym.status}
              onChange={(e) =>
                setEditGym({ ...editGym, status: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-full"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              onClick={updateGym}
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
