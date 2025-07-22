// UserNavbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaDumbbell,
  FaUserCircle,
  FaAppleAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/Navbar.css";

const navLinks = [
  {
    label: "Dashboard",
    path: "/user",
    icon: <FaHome className="me-1" />,
  },
  {
    label: "Workouts",
    path: "/user/workout",
    icon: <FaDumbbell className="me-1" />,
  },
  {
    label: "Diet & Nutrition",
    path: "/user/diet-nutrition",
    icon: <FaAppleAlt className="me-1" />,
  },
  {
    label: "Profile",
    path: "/user/profile",
    icon: <FaUserCircle className="me-1" />,
  },
];

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would clear any localStorage/session values for user/session
    // localStorage.removeItem("userLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3">
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
              <Link
                className={
                  "nav-link text-white nav-hover" +
                  (location.pathname === path ? " active fw-bold text-warning" : "")
                }
                to={path}
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Logout button */}
        <button
          className="btn btn-outline-warning ms-4"
          style={{ fontWeight: 700 }}
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mb-1 me-1" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
