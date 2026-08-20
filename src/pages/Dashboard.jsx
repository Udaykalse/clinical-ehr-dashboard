import {
  Plus,
  CalendarPlus,
  Users,
  CalendarDays,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import patients from "../data/patients.json";
import appointments from "../data/appointments.json";

import AppointmentChart from "../components/dashboard/AppointmentChart";
import PatientDemographics from "../components/dashboard/PatientDemographics";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";

const today = new Date().toISOString().split("T")[0];

const todayAppointments = appointments.filter(
  (appointment) => appointment.date === today,
);

const pendingAppointments = appointments.filter(
  (appointment) => appointment.status === "Pending",
);

const completedAppointments = appointments.filter(
  (appointment) => appointment.status === "Completed",
);

const stats = [
  {
    title: "Total Patients",
    value: patients.length,
    icon: Users,
    description: "Registered patients",
  },
  {
    title: "Today's Appointments",
    value: todayAppointments.length,
    icon: CalendarDays,
    description: "Scheduled today",
  },
  {
    title: "Pending Appointments",
    value: pendingAppointments.length,
    icon: Clock,
    description: "Waiting for consultation",
  },
  {
    title: "Completed Visits",
    value: completedAppointments.length,
    icon: CheckCircle,
    description: "Completed visits",
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your healthcare management system
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
            <CalendarPlus size={18} />
            New Appointment
          </button>

          <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
            <Plus size={18} />
            Add Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    {stat.value}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-800">Recent Patients</h2>

            <p className="mt-1 text-xs text-slate-500">
              Recently registered patients
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient ID
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Age
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Gender
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Blood Group
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                        {patient.name.charAt(0)}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {patient.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {patient.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {patient.age}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {patient.gender}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {patient.bloodGroup}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        patient.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpcomingAppointments />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AppointmentChart />
        <PatientDemographics />
      </div>
    </div>
  );
}

export default Dashboard;
