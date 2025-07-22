import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import UserHomePage from "./UserHome/UserHomePage";
import ProfilePage from "./Profile/ProfilePage";
import MembershipPage from "./Membership/MembershipPage";
import WorkoutDietPage from "./WorkoutDiet/WorkoutDietPage";
import SchedulePage from "./Schedule/SchedulePage";
import FeedbackPage from "./Feedback/FeedbackPage";
import DietNutritionPage from "./DietNutritionPage/DietNutritionPage";

const sectionRoutes = [
  { name: "Dashboard", path: "", component: <UserHomePage /> },
  { name: "Profile", path: "profile", component: <ProfilePage /> },
  { name: "Membership", path: "membership", component: <MembershipPage /> },
  { name: "Workout & Diet", path: "workout", component: <WorkoutDietPage /> },
  { name: "Schedule", path: "schedule", component: <SchedulePage /> },
  { name: "Diet & Nutrition", path: "diet-nutrition", component: <DietNutritionPage /> },
  { name: "Support & Feedback", path: "feedback", component: <FeedbackPage /> },
];

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();

  // Find the current section from pathname for active nav highlight
  const parts = location.pathname.split("/");
  const activePath = parts.length > 2 ? parts[2] : ""; // e.g. /user/profile

  return (
    <div style={{ minHeight: "100vh", background: "#181a1b" }}>
      <UserNavbar
        items={sectionRoutes.map((r) => r.name)}
        current={
          sectionRoutes.find((r) => r.path === activePath || (r.path === "" && !activePath))?.name
        }
        onNav={(name) => {
          const route = sectionRoutes.find((r) => r.name === name);
          navigate(route?.path ? `/user/${route.path}` : "/user");
        }}
      />
      <main>
        <Routes>
          {/* Dashboard as index */}
          <Route index element={<UserHomePage />} />
          {/* All feature tabs */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="membership" element={<MembershipPage />} />
          <Route path="workout" element={<WorkoutDietPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="diet-nutrition" element={<DietNutritionPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          {/* Default to dashboard/home if unknown */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>
    </div>
  );
}
