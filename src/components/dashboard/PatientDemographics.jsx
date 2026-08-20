import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import patients from "../../data/patients.json";

function PatientDemographics() {
  const maleCount = patients.filter(
    (patient) => patient.gender === "Male"
  ).length;

  const femaleCount = patients.filter(
    (patient) => patient.gender === "Female"
  ).length;

  const chartData = [
    {
      name: "Male",
      value: maleCount,
    },
    {
      name: "Female",
      value: femaleCount,
    },
  ];

  const COLORS = ["#2563eb", "#ec4899"];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-800">
          Patient Demographics
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Patient distribution by gender
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PatientDemographics;