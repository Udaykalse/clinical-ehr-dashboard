import {
  CalendarDays,
  Clock,
  UserRound,
  Stethoscope,
  Search,
  Filter,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import appointments from "../data/appointments.json";

function Appointments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [date, setDate] = useState("");
  const [appointmentList, setAppointmentList] = useState(appointments);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    doctorName: "",
    department: "",
    date: "",
    time: "",
    type: "Consultation",
    reason: "",
  });

  const filteredAppointments = appointmentList.filter((appointment) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchValue) ||
      appointment.doctorName.toLowerCase().includes(searchValue) ||
      appointment.patientId.toLowerCase().includes(searchValue);

    const matchesStatus = status === "All" || appointment.status === status;

    const matchesDate = !date || appointment.date === date;

    return matchesSearch && matchesStatus && matchesDate;
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: `A${String(appointmentList.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "Pending",
    };

    setAppointmentList((prev) => [newAppointment, ...prev]);

    setFormData({
      patientName: "",
      patientId: "",
      doctorName: "",
      department: "",
      date: "",
      time: "",
      type: "Consultation",
      reason: "",
    });

    setShowModal(false);
  };
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointmentList((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment,
      ),
    );

    setSelectedAppointment((prev) =>
      prev ? { ...prev, status: newStatus } : prev,
    );
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage patient appointments and schedules
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Appointment
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search patient, doctor or patient ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-48"
              >
                <option value="All">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Doctor
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date & Time
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reason
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    onClick={() => setSelectedAppointment(appointment)}
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <UserRound size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {appointment.patientName}
                          </p>

                          <p className="text-xs text-slate-400">
                            {appointment.patientId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope size={17} className="text-slate-400" />

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {appointment.doctorName}
                          </p>

                          <p className="text-xs text-slate-400">
                            {appointment.department}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={17} className="text-blue-500" />

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {appointment.date}
                          </p>

                          <div className="mt-1 flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" />

                            <span className="text-xs text-slate-400">
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {appointment.type}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {appointment.reason}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          appointment.status === "Confirmed"
                            ? "bg-green-50 text-green-600"
                            : appointment.status === "Pending"
                              ? "bg-yellow-50 text-yellow-600"
                              : appointment.status === "Completed"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-red-50 text-red-600"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  New Appointment
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Schedule a new patient appointment
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Patient Name
                  </label>

                  <input
                    required
                    type="text"
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        patientName: e.target.value,
                      })
                    }
                    placeholder="Enter patient name"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Patient ID
                  </label>

                  <input
                    required
                    type="text"
                    value={formData.patientId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        patientId: e.target.value,
                      })
                    }
                    placeholder="Example: P006"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Doctor
                  </label>

                  <input
                    required
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        doctorName: e.target.value,
                      })
                    }
                    placeholder="Doctor name"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Department
                  </label>

                  <select
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select department</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Date
                  </label>

                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Time
                  </label>

                  <input
                    required
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        time: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Appointment Type
                  </label>

                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Routine Checkup">Routine Checkup</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Reason
                  </label>

                  <input
                    required
                    type="text"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reason: e.target.value,
                      })
                    }
                    placeholder="Reason for appointment"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Appointment Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Appointment ID: {selectedAppointment.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                  {selectedAppointment.patientName?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {selectedAppointment.patientName}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedAppointment.patientId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">Doctor</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.doctorName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Department</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.department}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Date</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Time</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Appointment Type</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Status</p>

                  <span className="mt-1 inline-block rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600">
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400">Reason</p>

                <p className="mt-2 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedAppointment.reason || "No reason provided."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 px-6 py-4">
              {selectedAppointment.status === "Pending" && (
                <button
                  onClick={() =>
                    updateAppointmentStatus(selectedAppointment.id, "Confirmed")
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Confirm
                </button>
              )}

              {selectedAppointment.status === "Confirmed" && (
                <button
                  onClick={() =>
                    updateAppointmentStatus(selectedAppointment.id, "Completed")
                  }
                  className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Complete
                </button>
              )}

              {selectedAppointment.status !== "Completed" &&
                selectedAppointment.status !== "Cancelled" && (
                  <button
                    onClick={() =>
                      updateAppointmentStatus(
                        selectedAppointment.id,
                        "Cancelled",
                      )
                    }
                    className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                )}

              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
