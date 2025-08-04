import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


// Generic/public pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Modular dashboards (User & Admin handled modularly!)
import User from "./pages/User/User";      // Modular User Dashboard
import Admin from "./pages/Admin/Admin";   // Modular Admin Dashboard (unchanged!)

//Trainer specific pages
import TrainerProfile from "./pages/Trainer/TrainerProfile.jsx";
import TrainerDashboard from "./pages/Trainer/TrainerDashboard";
import AssignedUsers from "./pages/Trainer/AssignedUsers.jsx";
import EquipmentsPage from "./pages/Trainer/EquipmentsPage.jsx";
import StrengthEquipments from "./pages/Trainer/StrengthEquipments.jsx";
import CardioEquipments from "./pages/Trainer/CardioEquipments.jsx";
import UserProfile from "./pages/Trainer/UserProfile.jsx";
import DietPlanEditor from "./pages/Trainer/DietPlanEditor.jsx";
import UserSchedule from "./pages/Trainer/UserSchedule.jsx";
import FlexibilityEquipments from "./pages/Trainer/FlexibiltyEquipments.jsx";
import FreeWeightsEquipments from "./pages/Trainer/FreeWeightsEquipments.jsx";
import ResistanceMachinesEquipments from "./pages/Trainer/ResistanceMachinesEquipments.jsx";

// Other dashboards & utility pages

import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import Trainers from "./pages/Trainer/Trainer";
import PaymentPage from './pages/Payment/PaymentPage';


 
// These are the only routes/pages handled at top-level (all else is modular inside User or Admin)
const authPages = ["/auth/signin", "/register"];

function AppContent() {
  const location = useLocation();
  // Hide Navbar on login, register, modular user and admin dashboards
  const hideNavbar =
    authPages.includes(location.pathname) ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/reception-dashboard") ||
    location.pathname.startsWith("/trainer-dashboard") ||
    location.pathname.startsWith("/trainer");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard (all features now modular in User.jsx) */}
        <Route path="/user/*" element={<User />} />

        {/* Admin dashboard -- load as-is with NO CHANGE */}
        <Route path="/admin-dashboard" element={<Admin />} />


        {/* Standalone dashboards & utility routes */}
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/reception-dashboard/*" element={<ReceptionistDashboard />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/trainer/profile" element={<TrainerProfile />} />
        <Route path="/trainer/users" element={<AssignedUsers />} />
        <Route path="/trainer/equipments" element={<EquipmentsPage />} />
        <Route path="/trainer/equipments/strength" element={<StrengthEquipments />} />
        <Route path="/trainer/equipments/cardio" element={<CardioEquipments />} />
        <Route path="/trainer/equipments/flexibility" element={<FlexibilityEquipments />} />
        <Route path="/trainer/equipments/free_weights" element={<FreeWeightsEquipments />} />
        <Route path="/trainer/equipments/resistance_machines" element={<ResistanceMachinesEquipments/>}/>
        <Route path="/trainer/user/:userId" element={<UserProfile />} />
        <Route path="/trainer/user/:userId/diet" element={<DietPlanEditor />} />
        <Route path="/trainer/user/:userId/schedule" element={<UserSchedule />} />
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
