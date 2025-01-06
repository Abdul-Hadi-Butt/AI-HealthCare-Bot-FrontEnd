import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css"; // For additional styling if needed

const EditProfile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Simulate saving user details (e.g., to a database or API)
    console.log("Updated user details:", userDetails);

    // Navigate back to the User Profile page
    navigate("/Profile");
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/ai.jpg)", // Background image
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSaveChanges}>
          {/* Name Field */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-purple-900 text-white px-4 py-2 rounded-md shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
