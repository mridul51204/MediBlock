import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// ===== Login & Register Pages =====
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientLogin from "./pages/LoginTypes/PatientLogin";
import DoctorLogin from "./pages/LoginTypes/DoctorLogin";
import AdminLogin from "./pages/LoginTypes/AdminLogin";
import PatientRegister from "./pages/RegisterTypes/PatientRegister";
import DoctorRegister from "./pages/RegisterTypes/DoctorRegister";
import AdminRegister from "./pages/RegisterTypes/AdminRegister";

// ===== Functional & Dashboard Pages =====
import Upload from "./components/Upload";
import History from "./pages/PatientDashboard/History";

// ===== Landing Page =====
function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow mt-20">
      <section className="text-center py-20 bg-gray-50 px-4">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          Welcome to MediBlock
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
          Your personal, secure space for all your medical records. Keep your reports
          safe, organized, and always accessible whenever you need them. Share files
          instantly with doctors you trust and stay worry-free knowing your health
          data is protected with top-level security and privacy.{" "}
          <strong>MediBlock</strong> — because your health records should always be
          in your hands.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>

          {/* Quick test buttons for Upload & History */}
          <button
            onClick={() => navigate("/upload")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Upload File
          </button>

          <button
            onClick={() => navigate("/history")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            View History
          </button>
        </div>
      </section>
    </main>
  );
}

// ===== Main App Component =====
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login/patient" element={<PatientLogin />} />
            <Route path="/login/doctor" element={<DoctorLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/register/patient" element={<PatientRegister />} />
            <Route path="/register/doctor" element={<DoctorRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />

            {/* Functional Pages (Phase 2) */}
            <Route path="/upload" element={<Upload />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
