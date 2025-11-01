import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Login as
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Patient Login */}
        <div
          onClick={() => navigate("/login/patient")}
          className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 hover:shadow-2xl transition cursor-pointer text-center border-t-4 border-blue-600"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="Patient"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Patient</h2>
        </div>

        {/* Doctor Login */}
        <div
          onClick={() => navigate("/login/doctor")}
          className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 hover:shadow-2xl transition cursor-pointer text-center border-t-4 border-green-600"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-green-700 mb-2">Doctor</h2>
        </div>

        {/* Admin Login */}
        <div
          onClick={() => navigate("/login/admin")}
          className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 hover:shadow-2xl transition cursor-pointer text-center border-t-4 border-purple-600"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/7542/7542574.png"
            alt="Admin"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Admin</h2>
        </div>
      </div>

      {/* Register Now link */}
      <p className="text-gray-700 text-center text-lg">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-700 font-semibold hover:underline cursor-pointer"
        >
          Register Now
        </span>
      </p>
    </div>
  );
};

export default Login;
