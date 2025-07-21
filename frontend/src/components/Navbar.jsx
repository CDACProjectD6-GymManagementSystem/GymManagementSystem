import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold" to="/">GymMate</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="#">View Plans</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Our Trainers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Workout Videos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
