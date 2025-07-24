import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

// Public pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Modular dashboards
import User from "./pages/User/User";      
import Admin from "./pages/Admin/Admin";

// Trainer dashboard & features
import TrainerDashboard from "./pages/Trainer/TrainerDashboard";
import AssignedUsers from "./pages/Trainer/AssignedUsers";
import UserProfile from "./pages/Trainer/UserProfile";
import UserSchedule from "./pages/Trainer/UserSchedule";
import DietPlanEditor from "./pages/Trainer/DietPlanEditor";
import EquipmentEditor from "./pages/Trainer/EquipmentEditor";
import TrainerProfile from "./pages/Trainer/TrainerProfile";
import EquipmentsPage from "./pages/Trainer/EquipmentsPage";
import CardioEquipments from "./pages/Trainer/CardioEquipments";
import StrengthEquipments from "./pages/Trainer/StrengthEquipments";

// Receptionist dashboard
import ReceptionDashboard from "./pages/Receptionist/ReceptionistDashboard";

// Plans, Payment, Trainers (optional)
import Plans from "./Plans/Plans";
import PaymentPage from "./pages/Payment/PaymentPage";

// OPTIONAL: Only import this if implemented
// import Trainers from "./pages/Trainer/Trainers";

const authPages = ["/login", "/register"];

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    authPages.includes(location.pathname) ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/trainer")
    ;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User/Admin dashboards */}
        <Route path="/user/*" element={<User />} />
        <Route path="/admin-dashboard" element={<Admin />} />

        {/* Trainer routes */}
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/trainer/users" element={<AssignedUsers />} />
        <Route path="/trainer/user/:userId" element={<UserProfile />} />
        <Route path="/trainer/user/:userId/schedule" element={<UserSchedule />} />
        <Route path="/trainer/user/:userId/diet" element={<DietPlanEditor />} />
        <Route path="/trainer/user/:userId/equipment" element={<EquipmentEditor />} />
        <Route path="/trainer/profile" element={<TrainerProfile />} />
        <Route path="/trainer/equipments" element={<EquipmentsPage />} />
        <Route path="/trainer/equipments/cardio" element={<CardioEquipments />} />
        <Route path="/trainer/equipments/strength" element={<StrengthEquipments />} />


        {/* Receptionist dashboard */}
        <Route path="/reception-dashboard" element={<ReceptionDashboard />} />

        {/* Other utility pages */}
        <Route path="/plans" element={<Plans />} />
        {/* <Route path="/trainers" element={<Trainers />} /> */}
        <Route path="/payment" element={<PaymentPage />} />

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
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
