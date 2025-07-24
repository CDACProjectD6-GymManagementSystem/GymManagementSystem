import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaIdCard,
  FaHeartbeat,
  FaCalendarCheck,
  FaComments,
} from "react-icons/fa";
import "./UserHomePage.css";

const demoUser = {
  name: "Jane Doe",
  photo: "https://randomuser.me/api/portraits/women/44.jpg",
};

const cardData = [
  {
    path: "/user/profile",
    icon: <FaUserCircle size={32} color="#000" />,
    title: "Profile",
    desc: "Update your info",
  },
  {
    path: "/user/membership",
    icon: <FaIdCard size={32} color="#000" />,
    title: "Membership",
    desc: "Plans & renewal",
  },
  {
    path: "/user/workout",
    icon: <FaHeartbeat size={32} color="#000" />,
    title: "Workout",
    desc: "Plans & diets",
  },
  {
    path: "/user/schedule",
    icon: <FaCalendarCheck size={32} color="#000" />,
    title: "Schedule",
    desc: "Sessions",
  },
  {
    path: "/user/feedback",
    icon: <FaComments size={32} color="#000" />,
    title: "Feedback",
    desc: "Help & support",
  },
];

const UserNavbar = ({ user }) => (
  <nav className="user-navbar">
    <span className="brand">GymMate</span>
    <div className="user-info">
      <img
        src={user.photo}
        alt="Profile"
        className="user-img"
      />
      <span className="user-name">{user.name}</span>
    </div>
  </nav>
);

const UserHomePage = () => (
  <div className="user-homepage-root">
    <UserNavbar user={demoUser} />
    <div className="content-container">
      <h2 className="welcome-heading">
        Welcome, <span className="username">{demoUser.name}</span>
      </h2>
      <div className="choose-text">
        Choose an option
      </div>
      <div className="card-wrapper">
        {cardData.map(card => (
          <Link to={card.path} key={card.path} className="home-card-link">
            <div className="home-card">
              {card.icon}
              <div className="card-title">{card.title}</div>
              <div className="card-desc">{card.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default UserHomePage;
