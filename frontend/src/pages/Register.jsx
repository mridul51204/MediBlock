import React, { useState } from "react";
import { registerUser } from "../components/app";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password, "patient");
      navigate("/upload");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="w-80 bg-white shadow-md rounded p-6">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700"
        >
          Sign Up
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
