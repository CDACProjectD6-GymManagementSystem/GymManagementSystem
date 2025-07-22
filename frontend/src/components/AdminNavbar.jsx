import React from "react";
import "../styles/Admin.css";

const Navbar = ({ items, current, onNav }) => (
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
  </div>
);

export default Navbar;




