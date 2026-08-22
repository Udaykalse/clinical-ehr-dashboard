import {
  ArrowLeft,
  Phone,
  Mail,
  CalendarDays,
  MapPin,
  HeartPulse,
  Pill,
  AlertCircle,
  Activity,
  Thermometer,
  Weight,
  Ruler,
  Edit,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import patients from "../data/patients.json";
import VitalsChart from "./../components/chart/VitalsChart";
import { useState } from "react";

function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const patient = patients.find((patient) => patient.id === id);
  const openEditModal = () => {
    setEditForm({
      ...patient,
    });

    setShowEditModal(true);
  };
  if (!patient) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Patient not found
          </h2>

          <button
            onClick={() => navigate("/patients")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Patients
      </button>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-600">
            {patient.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-bold text-slate-800">
                {patient.name}
              </h1>

              <span
                className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                  patient.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {patient.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Patient ID: {patient.id}
            </p>
            <button
              onClick={openEditModal}
              className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Edit size={17} />
              Edit Patient
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-800">Personal Information</h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">Age</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {patient.age} years
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Gender</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {patient.gender}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Blood Group</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {patient.bloodGroup}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Date of Birth</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {patient.dateOfBirth || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-800">Contact Information</h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Phone size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Phone</p>

                <p className="text-sm font-medium text-slate-700">
                  {patient.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Mail size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Email</p>

                <p className="text-sm font-medium text-slate-700">
                  {patient.email || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <MapPin size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Address</p>

                <p className="text-sm font-medium text-slate-700">
                  {patient.address || "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <HeartPulse size={20} className="text-red-500" />

            <h2 className="font-semibold text-slate-800">Medical History</h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {patient.medicalHistory || "No medical history available."}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Pill size={20} className="text-blue-500" />

            <h2 className="font-semibold text-slate-800">Medications</h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {patient.medications || "No current medications."}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-500" />

            <h2 className="font-semibold text-slate-800">Allergies</h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {patient.allergies || "No known allergies."}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <HeartPulse size={20} className="text-blue-600" />

          <div>
            <h2 className="font-semibold text-slate-800">Current Vitals</h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest recorded patient measurements
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <HeartPulse size={18} className="text-red-500" />

              <p className="text-xs font-medium text-slate-500">
                Blood Pressure
              </p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.bloodPressure || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">mmHg</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <HeartPulse size={18} className="text-red-500" />

              <p className="text-xs font-medium text-slate-500">Heart Rate</p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.heartRate || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">bpm</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Thermometer size={18} className="text-orange-500" />

              <p className="text-xs font-medium text-slate-500">Temperature</p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.temperature || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">°F</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />

              <p className="text-xs font-medium text-slate-500">SpO₂</p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.spo2 || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">%</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Weight size={18} className="text-purple-500" />

              <p className="text-xs font-medium text-slate-500">Weight</p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.weight || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">kg</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Ruler size={18} className="text-indigo-500" />

              <p className="text-xs font-medium text-slate-500">Height</p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.height || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">cm</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-green-500" />

              <p className="text-xs font-medium text-slate-500">BMI</p>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-800">
              {patient.vitals?.bmi || "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-400">kg/m²</p>
          </div>
        </div>
        <div className="mt-6">
          <VitalsChart vitalsHistory={patient.vitalsHistory} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-blue-600" />

          <div>
            <h2 className="font-semibold text-slate-800">Medical Timeline</h2>

            <p className="mt-1 text-xs text-slate-500">
              Patient visit and clinical history
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {patient.visits?.length > 0 ? (
            patient.visits.map((visit, index) => (
              <div key={`${visit.date}-${index}`} className="relative pl-8">
                {index !== patient.visits.length - 1 && (
                  <div className="absolute left-[7px] top-5 h-full w-px bg-slate-200" />
                )}

                <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-blue-600 bg-white" />

                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {visit.reason}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {visit.doctor} · {visit.department}
                      </p>
                    </div>

                    <span className="text-xs font-medium text-blue-600">
                      {visit.date}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-400">Diagnosis</p>

                      <p className="mt-1 text-sm text-slate-700">
                        {visit.diagnosis}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Clinical Notes</p>

                      <p className="mt-1 text-sm text-slate-700">
                        {visit.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg bg-slate-50 p-5 text-center text-sm text-slate-500">
              No medical history available.
            </div>
          )}
        </div>
      </div>
      {showEditModal && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Edit Patient
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update patient information
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowEditModal(false);
              }}
              className="space-y-5 p-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        name: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Age
                  </label>

                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        age: Number(e.target.value),
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Gender
                  </label>

                  <select
                    value={editForm.gender}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        gender: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Blood Group
                  </label>

                  <select
                    value={editForm.bloodGroup}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        bloodGroup: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        phone: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        email: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Address
                </label>

                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      address: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Medical History
                </label>

                <textarea
                  rows="3"
                  value={editForm.medicalHistory}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      medicalHistory: e.target.value,
                    })
                  }
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Medications
                </label>

                <textarea
                  rows="3"
                  value={editForm.medications}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      medications: e.target.value,
                    })
                  }
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Allergies
                </label>

                <textarea
                  rows="3"
                  value={editForm.allergies}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      allergies: e.target.value,
                    })
                  }
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDetails;