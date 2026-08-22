import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function VitalsChart({ vitalsHistory = [] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-800">
          Vitals History
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Blood pressure and heart rate trends
        </p>
      </div>

      {vitalsHistory.length > 0 ? (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalsHistory}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="systolic"
                name="Systolic"
                stroke="#2563eb"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="diastolic"
                name="Diastolic"
                stroke="#7c3aed"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="heartRate"
                name="Heart Rate"
                stroke="#dc2626"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-80 items-center justify-center rounded-lg bg-slate-50">
          <p className="text-sm text-slate-500">
            No vitals history available.
          </p>
        </div>
      )}
    </div>
  );
}

export default VitalsChart;