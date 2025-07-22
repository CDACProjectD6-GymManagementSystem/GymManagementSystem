import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

// Generic/public pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Modular dashboards (User & Admin handled modularly!)
import User from "./pages/User/User";      // Modular User Dashboard
import Admin from "./pages/Admin/Admin";   // Modular Admin Dashboard (unchanged!)

// Other dashboards & utility pages
import TrainerDashboard from "./pages/Trainer/TrainerDashboard";
import ReceptionDashboard from "./pages/Receptionist/ReceptionistDashboard";
import Plans from "./Plans/Plans";
import Trainers from "./pages/Trainer/Trainer";
import PaymentPage from './pages/Payment/PaymentPage';

// These are the only routes/pages handled at top-level (all else is modular inside User or Admin)
const authPages = ["/login", "/register"];

function AppContent() {
  const location = useLocation();
  // Hide Navbar on login, register, modular user and admin dashboards
  const hideNavbar =
    authPages.includes(location.pathname) ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard (all features now modular in User.jsx) */}
        <Route path="/user/*" element={<User />} />

        {/* Admin dashboard -- load as-is with NO CHANGE */}
        <Route path="/admin-dashboard" element={<Admin />} />

        {/* Standalone dashboards & utility routes */}
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/reception-dashboard" element={<ReceptionDashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
