import { useState } from "react";

export default function WorkoutPlans() {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [trainer, setTrainer] = useState("");

  const addWorkout = () => {
    if (!name || !trainer) return;

    setWorkouts([...workouts, { name, trainer }]);
    setName("");
    setTrainer("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Workout Plans</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage workout routines
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Add Workout</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workout Name"
            className="border rounded-md px-3 py-2"
          />
          <input
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
            placeholder="Trainer"
            className="border rounded-md px-3 py-2"
          />
          <button
            onClick={addWorkout}
            className="bg-slate-900 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {workouts.length === 0 ? (
          <p className="text-slate-500">No workouts added</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {workouts.map((w, i) => (
              <li key={i}>
                <strong>{w.name}</strong> — {w.trainer}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
