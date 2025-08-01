import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaDumbbell, FaAppleAlt, FaSignOutAlt, FaUserCircle,
} from "react-icons/fa";

const navLinks = [
  { label: "Dashboard", path: "/user", icon: <FaHome className="me-1" /> },
  { label: "Workouts", path: "/user/workout", icon: <FaDumbbell className="me-1" /> },
  { label: "Diet & Nutrition", path: "/user/diet-nutrition", icon: <FaAppleAlt className="me-1" /> },
  // No "Profile" here
];

const UserNavbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("gymmateUserFirstName") || "";

  const handleLogout = () => {
    localStorage.removeItem("gymmateUserId");
    localStorage.removeItem("gymmateUserFirstName");
    localStorage.removeItem("gymmateUserEmail");
    localStorage.removeItem("gymmateUserPhoto");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3 user-navbar-custom">
      <Link className="navbar-brand d-flex align-items-center" to="/user-dashboard">
        <FaDumbbell className="me-2 text-warning" size={22} />
        <span className="fw-bold fs-4 text-warning">GymMate</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#userNavbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="userNavbarNav">
        <ul className="navbar-nav ms-auto gap-2">
          {navLinks.map(({ label, path, icon }) => (
            <li className="nav-item" key={label}>
              <Link className="nav-link user-navlink" to={path}>
                {icon}{label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="d-flex align-items-center ms-4">
          <Link
            to="/user/profile"
            className="d-flex align-items-center text-white fw-semibold me-4 text-decoration-none"
            style={{ fontWeight: "600", fontSize: "16px" }}
            title="Profile"
          >
            <FaUserCircle size={22} className="me-2" />
            {userName}
          </Link>
          <button
            className="btn btn-outline-warning user-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mb-1 me-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
