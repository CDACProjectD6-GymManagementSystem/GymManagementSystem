import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaDumbbell, FaUserFriends, FaHeartbeat, FaRunning, FaBiking, FaYinYang, FaUserShield,
  FaChild, FaBox, FaClock, FaMobileAlt, FaShower, FaLeaf, FaGift
} from "react-icons/fa";
import trainer1 from "../../../public/images/Trainer1.png";
import trainer2 from "../../../public/images/Trainer2.png";
import trainer3 from "../../../public/images/Trainer3.png";
import trainer4 from "../../../public/images/Trainer4.png";

const trainers = [
  {
    id: 1,
    name: "Alex Turner",
    expertise: "Strength Training, HIIT",
    certifications: ["ACE Certified", "CPR & AED"],
    photo: trainer1,
  },
  {
    id: 2,
    name: "Sophia Lee",
    expertise: "Yoga, Pilates",
    certifications: ["RYT 500", "Nutrition Specialist"],
    photo: trainer2,
  },
  {
    id: 3,
    name: "Michael Chen",
    expertise: "Bodybuilding, Powerlifting",
    certifications: ["NSCA-CPT", "ISSA"],
    photo: trainer3,
  },
  {
    id: 4,
    name: "Priya Sharma",
    expertise: "Zumba, Functional Training",
    certifications: ["ZIN License", "Functional Movement Certified"],
    photo: trainer4,
  }
];

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    axios.get("http://localhost:8080/subscriptions")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const accentColor = "#007bff";
  const mainFontColor = "#222";
  const cardBorder = "#e5e5e5";
  const cardShadow = "0 3px 18px #ececec";
  const iconColor = "#222";


  const formatAccessLabel = (access) => {
  if (!access) return "";
  return access
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

  const cardStyle = {
    background: "#fff",
    color: mainFontColor,
    borderRadius: 14,
    border: `1px solid ${cardBorder}`,
    boxShadow: cardShadow,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };

  const outlineBtnStyle = {
    border: `2px solid ${accentColor}`,
    background: "#fff",
    color: accentColor,
    fontWeight: "bold",
    borderRadius: "22px",
    padding: "0.5rem 1.5rem",
    transition: "all 0.12s",
    fontSize: "1.02rem",
    outline: "none",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: "0.4em"
  };

  const outlineBtnHoverStyle = {
    ...outlineBtnStyle,
    background: accentColor,
    color: "#fff"
  };

  const titleStyle = {
    color: mainFontColor,
    letterSpacing: "1.2px",
    fontSize: isMobile ? "1.7rem" : "2.2rem",
    fontWeight: 800,
    margin: "0.4em 0"
  };

  const sectionTitleStyle = {
    color: mainFontColor,
    borderLeft: `4px solid ${accentColor}`,
    paddingLeft: isMobile ? 8 : 14,
    textTransform: "uppercase",
    fontSize: isMobile ? "1.05rem" : "1.4rem",
    letterSpacing: "1px",
    fontWeight: 700,
    marginBottom: isMobile ? "1.2rem" : "2rem",
    marginTop: "0"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: mainFontColor, fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: isMobile ? 14 : 36 }}>

        {/* Welcome Section */}
        <div style={{ textAlign: "center", marginBottom: "2.4rem" }}>
          <h1 style={titleStyle}>
            Welcome to <span style={{ color: accentColor, borderBottom: `3px solid ${accentColor}`, padding: "0 0.25em" }}>GymMate Fitness Club</span>
          </h1>
          <p style={{ fontSize: isMobile ? "1.08rem" : "1.16rem", color: "#555", fontWeight: 500 }}>
            <FaDumbbell style={{ marginRight: 8, color: iconColor, fontSize: "1.15em" }} />
            A complete fitness ecosystem where you build your body and mind.
          </p>
        </div>

        {/* Membership Plans */}
        <section id="plans" style={{ marginBottom: "2.3rem" }}>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>Our Membership Plans</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {plans.map((plan, idx) => {
              const isHovered = hoveredCard === idx;
              const scaleStyle = {
                transform: isHovered ? "translateY(-7px) scale(1.018)" : "none",
                boxShadow: isHovered ? "0 6px 20px #eee" : "0 1px 10px #f2f2f2",
                transition: "transform 0.16s, box-shadow 0.2s"
              };
              return (
                <div
                  key={plan.id}
                  style={{
                    flex: "1 1 300px",
                    maxWidth: 390,
                    minWidth: 240,
                    ...scaleStyle
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={cardStyle}>
                    <div style={{ padding: isMobile ? "1.1rem" : "1.45rem" }}>
                      <h4 style={{ color: accentColor, fontWeight: 700, fontSize: "1.17rem" }}>{plan.name}</h4>
                      <p>{plan.description}</p>
                      <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95em", color: "#353535" }}>
                        <li><strong>Access:</strong> {formatAccessLabel(plan.access)}</li>
                        <li><strong>Diet Consultation:</strong> {plan.dietConsultation ? "Yes" : "No"}</li>
                        <li><strong>Sauna:</strong> {plan.sauna ? "Yes" : "No"}</li>
                        <li><strong>Duration:</strong> {plan.duration} month(s)</li>
                        <li><strong>Price:</strong> ₹{plan.price}</li>
                        <li><strong>Discount:</strong> {plan.discount}%</li>
                      </ul>
                    </div>
                    <div style={{ textAlign: "center", padding: "0.6em 1em" }}>
                      <Link
                        to={`/auth/signin`}
                        style={isHovered ? outlineBtnHoverStyle : outlineBtnStyle}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>Meet Our Trainers</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                style={{
                  flex: isMobile ? "1 1 100%" : "1 1 200px",
                  maxWidth: isMobile ? "99%" : 220,
                  margin: "0 1rem 1.2rem 0",
                  minWidth: "180px",
                  ...cardStyle,
                  background: "#fafafa"
                }}
              >
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  style={{
                    height: 160,
                    width: "100%",
                    objectFit: "cover",
                    borderBottom: "2px solid #ededed",
                    borderRadius: "0 0 14px 14px"
                  }}
                />
                <div style={{ padding: "0.80em 1em 0.94em 1em" }}>
                  <h5 style={{ margin: 0, fontWeight: 700 }}>{trainer.name}</h5>
                  <div style={{ color: "#666", fontSize: "0.98em" }}>{trainer.expertise}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.93em", color: "#333" }}>
                    {trainer.certifications.map((cert, i) => <li key={i}>✅ {cert}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
