import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-8 py-4 shadow-md flex justify-between items-center">
      {/* ===== Left Side: Brand ===== */}
      <Link to="/" className="text-2xl font-bold hover:text-blue-200">
        MediBlock
      </Link>

      {/* ===== Right Side: Links ===== */}
      <div className="flex items-center gap-6">
        {/* Always visible */}
        <Link to="/" className="hover:text-blue-200">
          Home
        </Link>

        {/* Show Login/Register only when NOT logged in */}
        {!token && (
          <>
            <Link to="/login" className="hover:text-blue-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-200">
              Register
            </Link>
          </>
        )}

        {/* Show Upload/History/Logout only when logged in */}
        {token && (
          <>
            <Link to="/upload" className="hover:text-blue-200">
              Upload
            </Link>
            <Link to="/history" className="hover:text-blue-200">
              History
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
