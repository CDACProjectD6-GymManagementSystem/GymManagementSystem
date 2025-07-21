import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDashboard from "./pages/User/UserDashboard";
import TrainerDashboard from "./pages/Trainer/TrainerDashboard";
import Admin from "./pages/Admin/Admin"
import ReceptionDashboard from "./pages/Receptionist/ReceptionistDashboard";

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/reception-dashboard" element={<ReceptionDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
