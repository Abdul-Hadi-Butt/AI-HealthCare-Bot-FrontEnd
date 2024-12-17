import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import NearbyHospitals from "./NearbyHospitals";
import UserProfile from "./UserProfile"; // Updated: Renamed UserProfile to Profile for consistency
import EditProfile from "./Editprofile"; // Fixed capitalization to match file name
import AboutUs from "./AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
        <Route path="/profile" element={<UserProfile />} /> {/* Updated path */}
        <Route path="/editprofile" element={<EditProfile />} /> {/* Corrected capitalization */}
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
