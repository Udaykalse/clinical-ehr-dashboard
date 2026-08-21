import { ArrowRight, Clock } from "lucide-react";
import appointments from "./../../data/appointments.json";

function UpcomingAppointments() {
  const upcomingAppointments = appointments
    .filter((appointment) => appointment.status === "Pending")
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-800">
            Upcoming Appointments
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Scheduled patient appointments
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                {appointment.patientName.charAt(0)}
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700">
                  {appointment.patientName}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {appointment.type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:text-right">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {appointment.date}
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:justify-end">
                  <Clock size={13} />
                  {appointment.time}
                </div>
              </div>

              <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600">
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingAppointments;
