// AdminNavbar.jsx (or similar file)
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/Admin.css";

const AdminNavbar = ({ items, current, onNav }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="admin-navbar">
      {items.map((i) => (
        <span
          key={i}
          className={"admin-navbar-item" + (current === i ? " active" : "")}
          onClick={() => onNav(i)}
        >
          {i}
        </span>
      ))}
      <button
        className="btn btn-primary"
        style={{ fontWeight: 700, float: "right" }}
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mb-1 me-1" /> Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
