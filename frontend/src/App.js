// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientLogin from "./pages/LoginTypes/PatientLogin";
import DoctorLogin from "./pages/LoginTypes/DoctorLogin";
import AdminLogin from "./pages/LoginTypes/AdminLogin";
import PatientRegister from "./pages/RegisterTypes/PatientRegister";
import DoctorRegister from "./pages/RegisterTypes/DoctorRegister";
import AdminRegister from "./pages/RegisterTypes/AdminRegister";

// Create a separate LandingPage component for clarity
function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow mt-20">
      <section className="text-center py-20 bg-gray-50">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          Welcome to MediBlock
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Your personal, secure space for all your medical records. Keep your reports safe, organized, and always accessible whenever you need them. Share files instantly with doctors you trust and stay worry-free knowing your health data is protected with top-level security and privacy. MediBlock — because your health records should always be in your hands.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </section>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/register/patient" element={<PatientRegister />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;


