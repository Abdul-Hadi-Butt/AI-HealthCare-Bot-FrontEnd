import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import NearbyHospitals from "./NearbyHospitals";
import Profile from "./Profile"; 
import EditProfile from "./EditProfile"; 
import AboutUs from "./AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/editprofile" element={<EditProfile />} /> 
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
