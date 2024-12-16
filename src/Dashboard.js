import React, { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false); // Modal state

  // Handlers to show and hide the modal
  const handleNearbyHospitalsClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Bar */}
      <nav className="bg-purple-900 text-white flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center">
          <img
            src="HADI.jpg"
            alt="User DP"
            className="h-10 w-10 rounded-full mr-3"
          />
          <span className="font-semibold text-lg">Hi, Abdul Hadi</span>
        </div>
        <div>
          <a href="#" className="text-white hover:underline">
            User Profile
          </a>
          <a href="#" className="ml-4 text-white hover:underline">
            About Us
          </a>
          <a href="#" className="ml-4 text-white hover:underline">
            Logout
          </a>
        </div>
      </nav>

      {/* Sidebar and Content */}
      <div className="flex flex-grow">
        <div className="w-1/4 bg-purple-50 p-4">
          <div className="flex items-center mb-4">
            <button id="hamburger" className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h2 className="font-bold text-lg ml-2">Patient Record</h2>
          </div>
          <div
            id="patient-record"
            className="bg-white rounded-lg p-4 shadow-md hidden"
          >
            <p>Medical History:</p>
            <ul>
              <li>Disease 1: Asthma</li>
              <li>Disease 2: Allergies</li>
              <li>Disease 3: Diabetes</li>
            </ul>
          </div>

          <h2 className="font-bold text-lg mt-6 mb-4">Emergency Numbers</h2>
          <div
            id="emergency-numbers"
            className="bg-white rounded-lg p-4 shadow-md"
          >
            {/* Emergency numbers will be dynamically generated */}
          </div>
        </div>

        <div className="w-3/4 p-4 flex flex-col justify-center relative">
          <h2 className="font-bold text-lg mb-4">
            Chat with our AI Healthcare Bot
          </h2>
          <div className={`${showModal ? 'blur-sm' : ''}`}>
            <div className="bg-white rounded-lg p-4 shadow-md flex flex-col h-full">
              <div
                className="flex flex-col h-64 overflow-y-auto p-2"
                id="chat-messages"
              >
                <div className="chat-bubble bot-bubble">
                  Hello! How can I assist you today?
                </div>
                <div className="chat-bubble user-bubble">
                  I have a headache and feel dizzy.
                </div>
                <div className="chat-bubble bot-bubble">
                  Possible causes could be dehydration or tension headaches.
                  Have you been drinking enough water?
                </div>
              </div>
              <div className="mt-auto">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="mt-2 text-gray-500 text-sm">
              <p>AI HealthCare Bot can make mistakes.</p>
            </div>
          </div>

          <div>
            <button
              onClick={handleNearbyHospitalsClick}
              className="bg-purple-900 text-white px-4 py-2 rounded-lg"
            >
              Get Nearby Hospitals
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Nearby Hospitals */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-purple-900">
              Nearby Hospitals & Clinics
            </h2>
            <ul className="mt-4 text-sm">
              <li><strong>ABC Hospital</strong>: 2.5 km away</li>
              <li><strong>XYZ Clinic</strong>: 3.8 km away</li>
              <li><strong>General Hospital</strong>: 5.2 km away</li>
            </ul>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-purple-900 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
