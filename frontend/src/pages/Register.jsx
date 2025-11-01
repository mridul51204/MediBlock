import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Register as
      </h1>
      <p className="text-gray-700 mb-10 text-lg text-center">
        Choose your role to create an account
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient */}
        <div
          onClick={() => navigate("/register/patient")}
          className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 hover:shadow-2xl transition cursor-pointer text-center border-t-4 border-blue-600"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="Patient"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Patient</h2>
          <p className="text-gray-600 text-sm">
            Register as a patient to securely store and share your medical records.
          </p>
        </div>

        {/* Doctor */}
        <div
          onClick={() => navigate("/register/doctor")}
          className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 hover:shadow-2xl transition cursor-pointer text-center border-t-4 border-green-600"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-green-700 mb-2">Doctor</h2>
          <p className="text-gray-600 text-sm">
            Register as a doctor to access and verify patient data securely.
          </p>
        </div>

        {/* Admin */}
        <div
          onClick={() => navigate("/register/admin")}
          className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 hover:shadow-2xl transition cursor-pointer text-center border-t-4 border-purple-600"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/7542/7542574.png"
            alt="Admin"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Admin</h2>
          <p className="text-gray-600 text-sm">
            Register as an admin to manage hospitals and verify healthcare providers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
