import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false); // Modal for Nearby Hospitals
  const [showChatHistory, setShowChatHistory] = useState(false); // Modal for Chat History
  const [chatMessages, setChatMessages] = useState([]); // Chat messages
  const [messageInput, setMessageInput] = useState(''); // User input

  // Handlers for modals
  const handleNearbyHospitalsClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleViewChatHistory = () => setShowChatHistory(true);
  const handleCloseChatHistory = () => setShowChatHistory(false);

  // Add a new message to the chat
  const handleSendMessage = () => {
    if (!messageInput.trim()) return; // Ignore empty messages

    const userMessage = { type: 'user', content: messageInput };
    const botResponse = { type: 'bot', content: getBotResponse(messageInput) };

    setChatMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
    setMessageInput(''); // Clear input
  };

  // Simulated bot response
  const getBotResponse = (userMessage) => {
    // Replace this logic with your AI bot integration
    if (userMessage.toLowerCase().includes('headache')) {
      return 'It might be due to stress or dehydration. Try drinking water and resting.';
    } else if (userMessage.toLowerCase().includes('fever')) {
      return 'Monitor your temperature and stay hydrated. Consult a doctor if it persists.';
    }
    return 'I am here to help! Please provide more details.';
  };

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
        <div className="w-1/4 bg-purple-50 p-4 flex flex-col justify-between">
          <div>
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
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <p>Medical History:</p>
              <ul>
                <li>Disease 1: Asthma</li>
                <li>Disease 2: Allergies</li>
                <li>Disease 3: Diabetes</li>
              </ul>
            </div>
          </div>

          {/* View Chat History Button */}
          <div className="mt-4">
            <button
              onClick={handleViewChatHistory}
              className="w-full bg-purple-900 text-white px-4 py-2 rounded-lg"
            >
              View Chat History
            </button>
          </div>
        </div>

        <div className="w-3/4 p-4 flex flex-col justify-center relative">
          <h2 className="font-bold text-lg mb-4">
            Chat with our AI Healthcare Bot
          </h2>
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col h-80">
            {/* Chat Messages */}
            <div
              className="flex flex-col h-64 overflow-y-auto p-2 border-b border-gray-200"
              id="chat-messages"
            >
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    message.type === 'bot' ? 'bot-bubble' : 'user-bubble'
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="mt-auto flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-900 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>

          <div className="mt-2 text-gray-500 text-sm">
            <p>AI HealthCare Bot can make mistakes.</p>
          </div>

          {/* Nearby Hospitals Button */}
          <div className="mt-4">
            <button
              onClick={handleNearbyHospitalsClick}
              className="bg-purple-900 text-white px-4 py-2 rounded-lg"
            >
              Get Nearby Hospitals
            </button>
          </div>
        </div>
      </div>

      {/* Chat History Modal */}
      {showChatHistory && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-purple-900">
              Chat History
            </h2>
            <ul className="mt-4 text-sm">
              {chatMessages.map((message, index) => (
                <li key={index}>
                  <strong>{message.type === 'bot' ? 'Bot' : 'User'}:</strong>{' '}
                  {message.content}
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseChatHistory}
              className="mt-6 bg-purple-900 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Nearby Hospitals Modal */}
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
