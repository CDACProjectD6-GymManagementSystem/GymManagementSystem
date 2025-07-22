import React from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaUsers,
  FaVideo,
  FaInfoCircle,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <FaDumbbell className="me-2 text-warning" size={24} />
        <span className="fw-bold fs-4 text-warning">GymMate</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <Link className="nav-link text-white nav-hover" to="/plans">
              <FaCheckCircle className="me-1" /> View Plans
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white nav-hover" to="/trainers">
              <FaUsers className="me-1" /> Our Trainers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white nav-hover" to="/about">
              <FaInfoCircle className="me-1" /> About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white nav-hover" to="/contact">
              <FaPhoneAlt className="me-1" /> Contact Us
            </Link>
          </li>
        </ul>

        <Link to="/login" className="btn btn-warning ms-4 fw-bold px-4 py-2">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
