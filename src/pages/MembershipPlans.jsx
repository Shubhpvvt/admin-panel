import { useState } from "react";

export default function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const addPlan = () => {
    if (!name || !price || !duration) return;

    setPlans([
      ...plans,
      { name, price, duration, status: "Active" }
    ]);

    setName("");
    setPrice("");
    setDuration("");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Membership Plans</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage gym membership pricing
        </p>
      </div>

      {/* ADD PLAN */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Add New Plan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Plan Name"
            className="border rounded-md px-3 py-2"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (₹)"
            className="border rounded-md px-3 py-2"
          />

          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (months)"
            className="border rounded-md px-3 py-2"
          />

          <button
            onClick={addPlan}
            className="bg-slate-900 text-white rounded-md"
          >
            Add Plan
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Plans List</h2>

        {plans.length === 0 ? (
          <p className="text-slate-500">No plans added</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="text-left py-2">Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.duration} months</td>
                  <td className="text-green-600">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
