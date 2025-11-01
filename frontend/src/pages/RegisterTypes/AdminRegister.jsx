import React, { useState } from "react";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    hospitalName: "",
    hospitalId: "",
    email: "",
    phone: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, hospitalName, hospitalId, email, phone, agreed } = formData;

    if (!firstName || !lastName || !hospitalName || !hospitalId || !email || !phone) {
      alert("Please fill in all fields!");
      return;
    }

    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    alert("Admin registered successfully! ✅");
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
          </div>

          {/* Other Info */}
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            value={formData.hospitalName}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="hospitalId"
            placeholder="Hospital ID"
            value={formData.hospitalId}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />

          {/* Terms */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mr-2"
            />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-purple-600 underline cursor-pointer">
                Terms and Conditions
              </span>
              .
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.agreed}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              formData.agreed
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
