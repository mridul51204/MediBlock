// src/pages/PatientDashboard/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaPills, FaHistory, FaHospital, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/patient-dashboard/${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md px-6 py-3">
        <h1 className="text-2xl font-bold text-blue-700">MediBlock</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="doctor"
          className="w-48 h-48 mb-6"
        />
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Welcome, Patient 👋
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <FeatureCard
            icon={<MdMedicalServices size={40} className="text-blue-600" />}
            title="Appointments"
            onClick={() => handleNavigate("appointments")}
          />
          <FeatureCard
            icon={<FaPills size={40} className="text-green-600" />}
            title="Medicines"
            onClick={() => handleNavigate("medicines")}
          />
          <FeatureCard
            icon={<FaUserMd size={40} className="text-purple-600" />}
            title="Doctors"
            onClick={() => handleNavigate("doctors")}
          />
          <FeatureCard
            icon={<FaHistory size={40} className="text-orange-600" />}
            title="History"
            onClick={() => handleNavigate("history")}
          />
          <FeatureCard
            icon={<FaHospital size={40} className="text-red-600" />}
            title="Hospitals"
            onClick={() => handleNavigate("hospitals")}
          />
          <FeatureCard
            icon={<FaPhoneAlt size={40} className="text-teal-600" />}
            title="Contact"
            onClick={() => handleNavigate("contact")}
          />
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2 text-blue-700">
            <FaCalendarAlt /> Calendar
          </h3>
          <input
            type="date"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </main>
    </div>
  );
};

// Reusable Feature Card
const FeatureCard = ({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200"
  >
    {icon}
    <p className="mt-3 font-semibold text-gray-700">{title}</p>
  </div>
);

export default PatientDashboard;
