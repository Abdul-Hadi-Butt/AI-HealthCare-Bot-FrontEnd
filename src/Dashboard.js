import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Modal for Nearby Hospitals
  const [showChatHistory, setShowChatHistory] = useState(false); // Modal for Chat History
  const [chatMessages, setChatMessages] = useState([]); // Chat messages in current conversation
  const [chatHistory, setChatHistory] = useState([]); // All previous conversations
  const [medicalHistory, setMedicalHistory] = useState([]); // Medical History
  const [messageInput, setMessageInput] = useState(''); // User input

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Handlers for modals
  const handleNearbyHospitalsClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleViewChatHistory = () => setShowChatHistory(true);
  const handleCloseChatHistory = () => setShowChatHistory(false);

  // Add a new message to the chat
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const userMessage = { type: 'user', content: messageInput };
    const botResponse = getBotResponse(messageInput);

    setChatMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { type: 'bot', content: botResponse.message },
    ]);

    // Add diagnosis to Medical History if detected
    if (botResponse.diagnosis) {
      setMedicalHistory((prevHistory) =>
        !prevHistory.includes(botResponse.diagnosis)
          ? [...prevHistory, botResponse.diagnosis]
          : prevHistory
      );
    }

    setMessageInput('');
  };

  // Simulated bot response
  const getBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes('headache')) {
      return {
        message: 'It might be due to stress or dehydration. Try drinking water and resting.',
        diagnosis: 'Headache',
      };
    } else if (userMessage.toLowerCase().includes('fever')) {
      return {
        message: 'Monitor your temperature and stay hydrated. Consult a doctor if it persists.',
        diagnosis: 'Fever',
      };
    }
    return { message: 'I am here to help! Please provide more details.', diagnosis: null };
  };

  // Move current chat to history
  const saveChatToHistory = () => {
    if (chatMessages.length > 0) {
      setChatHistory((prevHistory) => [...prevHistory, chatMessages]);
      setChatMessages([]); // Clear current chat
    }
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
          <button
            onClick={handleLogout}
            className="ml-4 text-white hover:underline"
          >
            Logout
          </button>
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
                {medicalHistory.length > 0 ? (
                  medicalHistory.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))
                ) : (
                  <li>No medical history available</li>
                )}
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
              <button
                onClick={saveChatToHistory}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Save to History
              </button>
            </div>
          </div>

          <div className="mt-2 text-gray-500 text-sm">
            <p>AI HealthCare Bot can make mistakes.</p>
          </div>

          {/* Get Nearby Hospitals Button */}
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
              {chatHistory.map((conversation, index) => (
                <li key={index} className="mb-2">
                  <strong>Conversation {index + 1}:</strong>
                  <ul>
                    {conversation.map((message, msgIndex) => (
                      <li key={msgIndex}>
                        <strong>{message.type === 'bot' ? 'Bot' : 'User'}:</strong>{' '}
                        {message.content}
                      </li>
                    ))}
                  </ul>
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
