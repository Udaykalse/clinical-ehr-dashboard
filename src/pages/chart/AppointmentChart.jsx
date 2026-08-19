import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import appointments from "./../../data/appointments.json";

function AppointmentChart() {
  const chartData = appointments.map((appointment) => ({
    date: appointment.date.slice(5),
    appointments: 1,
  }));

  const groupedData = chartData.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.date === item.date);

    if (existing) {
      existing.appointments += 1;
    } else {
      acc.push({
        date: item.date,
        appointments: 1,
      });
    }

    return acc;
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-800">
          Appointments Overview
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Appointment activity over the recent days
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="appointments"
              strokeWidth={2}
              stroke="#2563eb"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AppointmentChart;