import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'; // Import the Dashboard component
import NearbyHospitals from './NearbyHospitals'; // Import the NearbyHospitals component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitals />} /> {/* Add this */}
      </Routes>
    </Router>
  );
}

export default App;
