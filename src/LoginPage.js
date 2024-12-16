import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importing the CSS file for LoginPage

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // React Router hook

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill out all fields.');
      return;
    }

    // Reset error message if form is valid
    setError('');
    alert('Logged in successfully!');

    // Navigate to dashboard or another page after successful login
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="text-center text-purple-700 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-purple-900 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
