import React from 'react';
import { NavLink } from 'react-router-dom';

const TrainerNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <NavLink className="navbar-brand fw-bold text-uppercase" to="/trainer-dashboard">
        TrainerPanel
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#trainerNavbar"
        aria-controls="trainerNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="trainerNavbar">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/trainer-dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer/users" className="nav-link">
              Assigned Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer/equipments" className="nav-link">
              Equipments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer/profile" className="nav-link">
              My Profile
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link text-danger">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TrainerNavbar;
