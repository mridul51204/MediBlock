import React from "react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        🧑‍⚕️ Patient Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Manage and view all your uploaded medical records securely.
      </p>
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/upload")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Upload Report
        </button>
        <button
          onClick={() => navigate("/history")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          View History
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
