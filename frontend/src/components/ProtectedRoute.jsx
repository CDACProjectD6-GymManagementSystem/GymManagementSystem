import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Helper for JWT/session checking
function isLoggedIn() {
  const token = sessionStorage.getItem("gymmateAccessToken");
  return !!token;
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    // Optional: you can send a message via state for the login page
    return <Navigate to="/auth/signin" replace state={{ from: location, msg: "Please log in to access this page." }} />;
  }
  return children;
}
