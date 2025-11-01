import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    alert("Patient login successful!");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Patient Login
      </h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="border p-2 w-full mb-4 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Login
      </button>

      <p className="mt-4 text-center text-gray-600">
        New user?{" "}
        <button
          onClick={() => navigate("/register", { state: { role: "Patient" } })}
          className="text-blue-600 underline"
        >
          Register Now
        </button>
      </p>
    </div>
  );
};

export default PatientLogin;
