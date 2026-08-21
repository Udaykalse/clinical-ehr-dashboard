import {
  Search,
  Plus,
  Filter,
  CalendarDays,
  X,
  Eye,
  Check,
  Ban,
} from "lucide-react";
import { useState } from "react";
import appointments from "./../data/appointments.json";
import doctors from "./../data/doctors.json";
import patients from "./../data/patients.json";
function Appointments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentList, setAppointmentList] = useState(appointments);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    type: "Consultation",
  });
  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };
  const filteredAppointments = appointmentList.filter((appointment) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchValue) ||
      appointment.id.toLowerCase().includes(searchValue) ||
      appointment.doctor.toLowerCase().includes(searchValue);

    const matchesStatus = status === "All" || appointment.status === status;

    const matchesDate = date === "" || appointment.date === date;

    return matchesSearch && matchesStatus && matchesDate;
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const patient = patients.find(
      (patient) => patient.id === formData.patientId,
    );

    const doctor = doctors.find((doctor) => doctor.id === formData.doctorId);

    const newAppointment = {
      id: `A${String(appointmentList.length + 1).padStart(3, "0")}`,
      patientId: patient.id,
      patientName: patient.name,
      doctor: doctor.name,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: "Pending",
    };

    setAppointmentList((currentAppointments) => [
      ...currentAppointments,
      newAppointment,
    ]);

    setShowModal(false);

    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      type: "Consultation",
    });
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointmentList((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment,
      ),
    );
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track patient appointments
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Appointment
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient, ID or doctor..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-800">
              Appointment Records
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredAppointments.length} appointments found
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Doctor
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Time
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                          {appointment.patientName.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {appointment.patientName}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {appointment.patientId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {appointment.doctor}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {appointment.date}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {appointment.time}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {appointment.type}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          appointment.status === "Completed"
                            ? "bg-green-50 text-green-600"
                            : appointment.status === "Pending"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          title="View appointment"
                          onClick={() => handleViewAppointment(appointment)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        >
                          <Eye size={16} />
                        </button>

                        {appointment.status === "Pending" && (
                          <>
                            <button
                              title="Complete appointment"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "Completed",
                                )
                              }
                              className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                            >
                              <Check size={16} />
                            </button>

                            <button
                              title="Cancel appointment"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "Cancelled",
                                )
                              }
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            >
                              <Ban size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-800">
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

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Patient
                </label>

                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select patient</option>

                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Doctor
                </label>

                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select doctor</option>

                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Appointment Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Telemedicine">Telemedicine</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
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
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-800">
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

            <div className="space-y-5 p-5">
              <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600">
                  {selectedAppointment.patientName.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {selectedAppointment.patientName}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Patient ID: {selectedAppointment.patientId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">Doctor</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.doctor}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Appointment Type</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedAppointment.type}
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
              </div>

              <div>
                <p className="text-xs text-slate-400">Status</p>

                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                    selectedAppointment.status === "Completed"
                      ? "bg-green-50 text-green-600"
                      : selectedAppointment.status === "Pending"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
