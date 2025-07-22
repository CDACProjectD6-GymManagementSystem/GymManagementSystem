import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaIdCard,
  FaHeartbeat,
  FaCalendarCheck,
  FaComments,
} from "react-icons/fa";

// Demo profile photo and name
const demoUser = {
  name: "Jane Doe",
  photo: "https://randomuser.me/api/portraits/women/44.jpg",
};

const cardData = [
  {
    path: "/profile",
    icon: <FaUserCircle size={38} className="mb-2" color="#f7c948" />,
    title: "Profile",
    desc: "View and update your personal info",
  },
  {
    path: "/membership",
    icon: <FaIdCard size={38} className="mb-2" color="#f7c948" />,
    title: "Membership",
    desc: "Check status, plans, renewals",
  },
  {
    path: "/workout",
    icon: <FaHeartbeat size={38} className="mb-2" color="#f7c948" />,
    title: "Workout & Diet",
    desc: "Access workout plans and diet charts",
  },
  {
    path: "/schedule",
    icon: <FaCalendarCheck size={38} className="mb-2" color="#f7c948" />,
    title: "Schedule",
    desc: "Check your training sessions and attendance",
  },
  {
    path: "/feedback",
    icon: <FaComments size={38} className="mb-2" color="#f7c948" />,
    title: "Support & Feedback",
    desc: "Submit issues or suggestions",
  },
];

// Live Clock
const LiveTime = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{ fontFamily: "monospace", fontSize: 16, color: "#f7c948" }}>
      {now.toLocaleTimeString()}
    </div>
  );
};

// User Panel Navbar (dark/yellow theme)
const UserNavbar = ({ user }) => (
  <nav
    className="navbar navbar-expand navbar-dark"
    style={{ background: "#23272b", borderBottom: "4px solid #f7c948" }}
  >
    <div className="container-fluid d-flex">
      <span className="navbar-brand fw-bold fs-4 d-flex align-items-center">
        <span style={{ color: "#f7c948" }}>GymMate User Panel</span>
      </span>
      <div className="ms-auto d-flex align-items-center gap-3">
        <LiveTime />
        <img
          src={user.photo}
          alt="Profile"
          className="rounded-circle border border-2"
          style={{
            width: 38,
            height: 38,
            objectFit: "cover",
            borderColor: "#f7c948",
          }}
        />
        <span
          className="fw-semibold"
          style={{ color: "#f7c948", letterSpacing: 0.2 }}
        >
          {user.name}
        </span>
      </div>
    </div>
  </nav>
);

const UserHomePage = () => {
  return (
    <div style={{ background: "#181a1b", minHeight: "100vh" }}>
      {/* Custom Navbar for user panel */}
      <UserNavbar user={demoUser} />

      <div className="container py-5">
        <h2
          className="text-center fw-bold mb-1"
          style={{
            color: "#f7c948",
            textShadow: "0 1px 24px #000b",
            letterSpacing: 1,
          }}
        >
          Welcome, <span style={{ color: "#fff" }}>{demoUser.name}</span>!
        </h2>
        <p
          className="text-center mb-5 fs-5"
          style={{
            color: "#dedede",
            fontWeight: 500,
          }}
        >
          Ready to make progress today? Check out your options below.
        </p>

        <div className="row g-4 justify-content-center">
          {cardData.map((card) => (
            <div className="col-md-4 col-sm-6" key={card.path}>
              <Link to={card.path} className="text-decoration-none">
                <div
                  className="card shadow h-100 home-card"
                  style={{
                    border: "2.5px solid #23272b",
                    borderRadius: 20,
                    transition: "transform .15s, box-shadow .15s, border .15s",
                    background:
                      "linear-gradient(132deg, #212428 70%, #282a36 100%)",
                    color: "#fff",
                  }}
                >
                  <div className="card-body text-center d-flex flex-column align-items-center">
                    {card.icon}
                    <h5
                      className="card-title fw-bold"
                      style={{ color: "#f7c948" }}
                    >
                      {card.title}
                    </h5>
                    <p className="card-text">{card.desc}</p>
                    <button
                      className="btn btn-outline-warning btn-sm mt-2"
                      style={{
                        color: "#f7c948",
                        borderColor: "#f7c948",
                        fontWeight: "bold",
                      }}
                      tabIndex={-1}
                    >
                      Go
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Inline hover style */}
      <style>
        {`
          .home-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 8px 32px 0 #f7c94833 !important;
            border: 2.5px solid #f7c948 !important;
            background: linear-gradient(140deg,#ffd70022 20%,#222 100%);
          }
        `}
      </style>
    </div>
  );
};

export default UserHomePage;
