import React, { useState } from "react";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    dob: "",
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

  // Destructure all fields for clarity
  const { firstName, lastName, age, sex, dob, email, phone, agreed } = formData;

  // Trim to remove extra spaces
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !age ||
    !sex ||
    !dob ||
    !email.trim() ||
    !phone.trim()
  ) {
    alert("⚠️ Please fill in all fields before registering.");
    return;
  }

  if (!agreed) {
    alert("⚠️ You must agree to the terms and conditions.");
    return;
  }

  // Everything is fine
  alert("✅ Patient registration successful!");
  console.log("Patient Registered:", formData);
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Patient Registration
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

          {/* Age and Sex */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />

          {/* Contact Info */}
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

          {/* Terms & Conditions */}
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
              <span className="text-blue-600 underline cursor-pointer">
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
                ? "bg-blue-600 hover:bg-blue-700"
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

export default PatientRegister;
