import { Search, Plus, Filter, Phone, Mail, Users } from "lucide-react";
import { useState } from "react";
import doctors from "./../data/doctors.json";

function Doctors() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");

  const specializations = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      doctor.name.toLowerCase().includes(searchValue) ||
      doctor.id.toLowerCase().includes(searchValue) ||
      doctor.specialization.toLowerCase().includes(searchValue);

    const matchesSpecialization =
      specialization === "All" || doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage healthcare providers and their availability
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          <Plus size={18} />
          Add Doctor
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor, ID or specialization..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Specializations" : item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600">
                    {doctor.name.replace("Dr. ", "").charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">
                      {doctor.name}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">{doctor.id}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    doctor.status === "Available"
                      ? "bg-green-50 text-green-600"
                      : doctor.status === "Busy"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {doctor.status}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-blue-600">
                  {doctor.specialization}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {doctor.department}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
                <div>
                  <p className="text-xs text-slate-400">Experience</p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {doctor.experience} years
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Patients</p>

                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <Users size={15} />
                    {doctor.patients}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone size={15} />
                  {doctor.phone}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={15} />
                  {doctor.email}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">
            No doctors found
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
