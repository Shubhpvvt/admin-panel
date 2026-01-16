export default function Payments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Payments</h1>
        <p className="text-sm text-slate-500 mt-1">
          View payment history (UI only)
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 text-slate-500">
        Payment records will be displayed here
      </div>
    </div>
  );
}
