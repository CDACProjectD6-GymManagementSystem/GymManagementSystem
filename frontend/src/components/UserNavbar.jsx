import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaDumbbell,
  FaUserCircle,
  FaAppleAlt,
} from "react-icons/fa";
import "../styles/Navbar.css";

const navLinks = [
  {
    label: "Dashboard",
    path: "/user-dashboard",
    icon: <FaHome className="me-1" />,
  },
  {
    label: "Workouts",
    path: "/workout",
    icon: <FaDumbbell className="me-1" />,
  },
  {
    label: "Diet & Nutrition",
    path: "/diet-nutrition",
    icon: <FaAppleAlt className="me-1" />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FaUserCircle className="me-1" />,
  },
];

const UserNavbar = () => {
  const location = useLocation();
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
      </div>
    </nav>
  );
};

export default UserNavbar;
