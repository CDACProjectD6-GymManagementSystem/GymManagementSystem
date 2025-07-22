import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavbar"; // For logged-in user pages

// Generic pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Dashboards
import UserHomePage from "./pages/User/UserHome/UserHomePage";
 import TrainerDashboard from "./pages/Trainer/TrainerDashboard";
import Admin from "./pages/Admin/Admin";
import ReceptionDashboard from "./pages/Receptionist/ReceptionistDashboard";

// Plans/trainers
import Plans from "./Plans/Plans";
import Trainers from "./pages/Trainer/Trainer";

// User features
import ProfilePage from './pages/User/Profile/ProfilePage';
import MembershipPage from './pages/User/Membership/MembershipPage';
import WorkoutDietPage from './pages/User/WorkoutDiet/WorkoutDietPage';
import SchedulePage from './pages/User/Schedule/SchedulePage';
import FeedbackPage from './pages/User/Feedback/FeedbackPage';
import DietNutritionPage from './pages/User/DietNutritionPage/DietNutritionPage'; // Adjust path as needed

// --------------- SIMULATED AUTH (replace with your real logic)
const isUserLoggedIn = () => {
  // Example: Check localStorage or an AuthContext, Redux, etc.
  // return !!localStorage.getItem("userLoggedIn");
  return true; // <--- Set TRUE for demo/testing!
};
// --------------------------------------------------------------

const userPages = [
  "/user-dashboard",
  "/profile",
  "/membership",
  "/workout",
  "/schedule",
  "/feedback",
  "/diet-nutrition",
];

const AppContent = () => {
  const location = useLocation();

  const isUserPage = userPages.some((base) =>
    location.pathname.startsWith(base)
  );

  // Show UserNavbar ONLY for userPages and ONLY if logged in
  const showUserNavbar = isUserPage && isUserLoggedIn();
  // Show main Navbar for other pages only
  const showMainNavbar = !showUserNavbar && !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {showUserNavbar && <UserNavbar />}
      {showMainNavbar && <Navbar />}
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard pages */}
        <Route path="/user-dashboard" element={<UserHomePage />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/reception-dashboard" element={<ReceptionDashboard />} />

        {/* Plans & trainers */}
        <Route path="/plans" element={<Plans />} />
        <Route path="/trainers" element={<Trainers />} />

        {/* User features */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/workout" element={<WorkoutDietPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/diet-nutrition" element={<DietNutritionPage />} />
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
