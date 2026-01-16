import { useState } from "react";

export default function DietPlans() {
  const [diets, setDiets] = useState([]);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  const addDiet = () => {
    if (!name || !calories) return;

    setDiets([...diets, { name, calories }]);
    setName("");
    setCalories("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Diet Plans</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage nutrition plans
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Add Diet Plan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Diet Name"
            className="border rounded-md px-3 py-2"
          />
          <input
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories"
            className="border rounded-md px-3 py-2"
          />
          <button
            onClick={addDiet}
            className="bg-slate-900 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {diets.length === 0 ? (
          <p className="text-slate-500">No diet plans added</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {diets.map((d, i) => (
              <li key={i}>
                <strong>{d.name}</strong> — {d.calories} kcal
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
