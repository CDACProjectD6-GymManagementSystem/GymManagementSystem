import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaDumbbell,
  FaCrown,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Home.css";


const trainers = [
  {
    id: 1,
    name: "Vaibhav Shinde",
    expertise: "Strength & Conditioning",
    certifications: ["NSCA-CSCS", "ACE Certified"],
    photo: "../../../public/images/VaibhavTrainer.jpg",
  },
  {
    id: 2,
    name: "Nehal Malshikare",
    expertise: "Bodybuilding, Nutrition",
    certifications: ["ISSA Master Trainer", "IFBB Pro"],
    photo: "../../../public/images/NehalTrainer.jpg",
  },
  {
    id: 3,
    name: "Pratik Pawar",
    expertise: "Muscle Building, Fat Loss",
    certifications: ["NASM CPT", "S&C Specialist"],
    photo: "../../../public/images/PratikTrainer.jpg",
  },
  {
    id: 4,
    name: "Anurag Kashyap",
    expertise: "Powerlifting, Men's Physique",
    certifications: ["Personal Trainer", "CPR AED"],
        photo: "../../../public/images/AnuragTrainer.png",
  }
];

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/subscriptions")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const formatAccessLabel = (access) =>
    access
      ? access
          .toLowerCase()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  return (
    <div className="home__container">
      {/* HERO */}
      <header className="hero-section">
        <div>
          <h1 className="home__title">
            <span className="accent">GymMate</span> Fitness
          </h1>
          <div className="home__subtitle">
            <FaDumbbell
              style={{
                marginRight: 10,
                fontSize: "1.12em",
                color: "#1976D2",
              }}
            />
            Build strength, confidence, and community. Your fitness, your journey.
          </div>
          <Link to="/auth/signin" className="cta-btn">
            Get Started
          </Link>
        </div>
      </header>

      {/* PLANS */}
      <section id="plans" style={{ marginBottom: "2.7rem" }}>
        <h2 className="home__section-title">Membership Plans</h2>
        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              className="plan-card"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(-1)}
              tabIndex={0}
            >
              {idx === 1 && (
                <span className="plan-badge">
                  <FaCrown style={{ marginRight: 6, color: "#1766c2" }} /> Most Popular
                </span>
              )}
              <div className="plan-title">{plan.name}</div>
              <div className="plan-desc">{plan.description}</div>
              <ul className="plan-features">
                <li>
                  <span className="dot" /> <b>Access</b>: {formatAccessLabel(plan.access)}
                </li>
                <li>
                  <span className="dot" /> <b>Trainer</b>: {plan.trainerAvailable ? "Yes" : "No"}
                </li>
                <li>
                  <span className="dot" /> <b>Diet</b>: {plan.dietConsultation ? "Yes" : "No"}
                </li>
                <li>
                  <span className="dot" /> <b>Sauna</b>: {plan.sauna ? "Yes" : "No"}
                </li>
                <li>
                  <span className="dot" /> <b>Classes</b>: {plan.groupClasses ? "Yes" : "No"}
                </li>
                <li>
                  <span className="dot" /> <b>Duration</b>: {plan.duration} mo
                </li>
              </ul>
              <div className="plan-price-row">
                <span className="plan-price">₹{plan.price}</span>
              </div>
              <div className="plan-btn-group">
                <Link to="/auth/signin" className="join-btn">
                  Choose Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" style={{ marginBottom: "2.7rem" }}>
        <h2 className="home__section-title">Meet Our Trainers</h2>
        <div className="trainers-grid">
          {trainers.map((t) => (
            <div
              key={t.id}
              className="trainer-card equalize-trainers"
              tabIndex={0}
            >
              <div className="trainer-photo-wrap">
                <img src={t.photo} alt={t.name} className="trainer-photo" />
              </div>
              <div className="trainer-info">
                <div className="trainer-name">{t.name}</div>
                <div className="trainer-expertise">{t.expertise}</div>
                <ul className="trainer-certs">
                  {t.certifications.map((c, i) => (
                    <li key={i}>
                      <FaCheckCircle
                        style={{
                          color: "#1976D2",
                          marginRight: 5,
                          fontSize: "1.1em",
                          verticalAlign: "-2px",
                        }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section className="about-contact-section" id="about" style={{ margin: "2rem 0 0 0" }}>
        <div className="about-box">
          <h2 className="about-title">About Us</h2>
          <p>
            <b>GymMate Fitness</b> is Pune’s community for transformation—bringing science, passion,
            and energy together. From elite trainers to modern equipment and friendly vibes, we help you
            achieve lasting results and real joy in fitness. All are welcome—become your strongest self, with us!
          </p>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="about-contact-section" id="contact" style={{ margin: "2rem 0 0 0" }}>
        <div className="contact-box">
          <h2 className="about-title">Contact Us</h2>
          <ul className="contact-list">
            <li>
              <FaPhoneAlt className="contact-icon" />
              <b>Phone:</b>&nbsp;
              <a href="tel:+912012345678">+91 20 1234 5678</a>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <b>Email:</b>&nbsp;
              <a href="mailto:info@gymmate.in">info@gymmate.in</a>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <b>Address:</b>
              <span>
                404 Blue Avenue, Koregaon Park,<br />
                Pune 411001, Maharashtra, India
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div>
          <div className="footer-brand">
            <span className="accent footer-logo-txt">GymMate</span> Fitness &nbsp;|&nbsp;
            <span style={{ color: "#1976D2", fontWeight: 500 }}>
              Pune, Maharashtra
            </span>
          </div>
          <div className="footer-address">
            404 Blue Avenue, Koregaon Park, Pune 411001, Maharashtra, India
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} GymMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;