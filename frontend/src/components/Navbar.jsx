import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MediBlock</h1>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          <li className="hover:text-blue-600 cursor-pointer">Login</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
