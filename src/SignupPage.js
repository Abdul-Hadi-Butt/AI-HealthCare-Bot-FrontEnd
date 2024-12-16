import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import the CSS for the signup page

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // React Router hook

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !username || !password || !phone) {
      setError('Please fill out all fields.');
      return;
    }

    // Reset error message if form is valid
    setError('');
    alert('Form submitted successfully!');

    // Navigate to Login page
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="form-wrapper">
        <div className="signup-form">
          <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-purple-800 font-semibold mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-purple-800 font-semibold mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-purple-800 font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-purple-800 font-semibold mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Signup Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-purple-700 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-purple-900 font-semibold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
