import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell, FaUserFriends, FaHeartbeat, FaRunning, FaBiking, FaYinYang, FaUserShield,
  FaChild, FaBox, FaClock, FaMobileAlt, FaShower, FaLeaf, FaGift
} from "react-icons/fa";
import trainer1 from "../../../public/images/Trainer1.png";
import trainer2 from "../../../public/images/Trainer2.png";
import trainer3 from "../../../public/images/Trainer3.png";
import trainer4 from "../../../public/images/Trainer4.png";

export const plans = [
  {
    id: 1,
    name: "Basic",
    gymAccess: "Off-peak hours",
    dietConsultation: "Once at start",
    groupClasses: ["Yoga"],
    saunaAccess: "No",
    description: "Access for beginners with limited hours.",
    duration: "1 month",
    price: 1000,
    pricePerMonth: 1000,
    discount: "0%"
  },
  {
    id: 2,
    name: "Premium",
    gymAccess: "Full-time",
    dietConsultation: "Monthly",
    groupClasses: ["Yoga", "Zumba", "HIIT"],
    saunaAccess: "Yes",
    description: "Full gym access, trainers and classes.",
    duration: "3 months",
    price: 3000,
    pricePerMonth: 1000,
    discount: "15%"
  },
  {
    id: 3,
    name: "Gold",
    gymAccess: "Full-time + priority access",
    dietConsultation: "Bi-weekly",
    groupClasses: ["All classes"],
    saunaAccess: "Yes",
    description: "Everything you need for serious fitness.",
    duration: "6 months",
    price: 5400,
    pricePerMonth: 900,
    discount: "25%"
  },
  {
    id: 4,
    name: "Elite",
    gymAccess: "Full Time",
    dietConsultation: "Weekly",
    groupClasses: ["All classes + 1-on-1"],
    saunaAccess: "Yes",
    description: "Personalized elite membership experience.",
    duration: "12 months",
    price: 9600,
    pricePerMonth: 800,
    discount: "33%"
  }
];

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

// Utility for scaling on hover
const useHoverScale = () => {
  const [hover, setHover] = useState(false);
  const style = {
    transform: hover ? "translateY(-7px) scale(1.018)" : "none",
    boxShadow: hover ? "0 6px 20px #eee" : "0 1px 10px #f2f2f2",
    transition: "transform 0.16s, box-shadow 0.2s"
  };
  return [hover, setHover, style];
};

const Home = () => {
  const isMobile = window.innerWidth < 768;
  const mainFontColor = "#222";
  const accentColor = "#007bff"; // Bootstrap primary blue, adjust as desired
  const cardBorder = "#e5e5e5";
  const cardShadow = "0 3px 18px #ececec";
  const iconColor = "#222";

  const titleStyle = {
    color: mainFontColor,
    letterSpacing: "1.2px",
    fontSize: isMobile ? "1.7rem" : "2.2rem",
    fontWeight: 800,
    margin: "0.4em 0"
  };
  const highlightStyle = {
    color: accentColor,
    borderBottom: `3px solid ${accentColor}`,
    borderRadius: "3px",
    padding: "0 0.25em"
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
    color: "#fff",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: mainFontColor,
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? 14 : 36,
        }}
      >

        {/* Welcome Section */}
        <div style={{ textAlign: "center", marginBottom: "2.4rem" }}>
          <h1 style={titleStyle}>
            Welcome to <span style={highlightStyle}>GymMate Fitness Club</span>
          </h1>
          <p style={{ fontSize: isMobile ? "1.08rem" : "1.16rem", color: "#555", fontWeight: 500 }}>
            <FaDumbbell style={{ marginRight: 8, color: iconColor, fontSize: "1.15em" }} />
            A complete fitness ecosystem where you build your body and mind.
          </p>
        </div>

        {/* About Us */}
        <section id="about" style={{ marginBottom: "2.3rem" }}>
          <h2 style={sectionTitleStyle}>About Us</h2>
          <p style={{
            fontSize: isMobile ? "0.98rem" : "1.15rem",
            color: "#2d2c2c",
            textAlign: "center",
            fontWeight: 400
          }}>
            GymMate was founded with a mission to make fitness accessible and enjoyable for everyone.
            Whether you're just starting out or an experienced athlete, our certified trainers, modern facilities,
            and community-focused approach help you reach your goals. We believe in empowering every individual with
            knowledge, tools, and motivation to live healthier, stronger lives.
          </p>
        </section>

        {/* How Our Gym Works */}
        <div style={{ marginBottom: "2.3rem" }}>
          <h3 style={sectionTitleStyle}>
            <FaUserFriends style={{ marginRight: 8, color: iconColor }} />
            How Our Gym Works
          </h3>
          <p style={{ fontSize: isMobile ? "1rem" : "1.13rem", color: "#555" }}>
            At GymMate, every member begins with a personalized onboarding session including a fitness assessment and a custom workout plan.
            We offer flexible membership plans—daily, monthly, and yearly—so you can train at your own pace.
            Our certified trainers are available daily, and your performance is tracked monthly to help you achieve your goals.
          </p>
        </div>

        {/* Activities */}
        <div style={{ marginBottom: "2.3rem" }}>
          <h3 style={sectionTitleStyle}>
            <FaHeartbeat style={{ marginRight: 8, color: iconColor }} />
            Activities at GymMate
          </h3>
          <div
            style={{
              background: "#fafcfd",
              borderRadius: 16,
              padding: isMobile ? "0.7rem 0.4rem" : "1.1rem 0.85rem",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              boxShadow: "0 2px 10px #f6f6f6",
              marginTop: 8
            }}
          >
            {[
              [<FaYinYang />, <b>Yoga & Meditation</b>, "improve flexibility & clarity"],
              [<FaDumbbell />, <b>Strength Training</b>, "free weights & machines"],
              [<FaBiking />, <b>Cardio Zone</b>, "treadmill, bikes, endurance"],
              [<FaRunning />, <b>CrossFit & HIIT</b>, "fat-burning workouts"],
              [<FaBox />, <b>Boxing & MMA</b>, "self-defense & power"],
              [<FaLeaf />, <b>Zumba & Dance</b>, "fun fitness"],
              [<FaChild />, <b>Kids Fitness</b>, "ages 6–14 stay active"],
              [<FaUserFriends />, <b>Group Classes</b>, "daily, all levels"]
            ].map(([icon, label, desc], idx) => (
              <div
                key={idx}
                style={{
                  flex: "1 1 230px",
                  minWidth: 200,
                  color: "#262626",
                  fontWeight: 500,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: 9, fontSize: "1.07em", color: iconColor }}>{icon}</span>
                <span>{label} <span style={{ color: "#6e6e6e", fontWeight: 400, fontSize: "90%" }}>- {desc}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Plans Section */}
        <section id="plans" style={{ marginBottom: "2.3rem" }}>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>Our Membership Plans</h2>
          <div style={{
            margin: 0, display: "flex", flexWrap: "wrap"
          }}>
            {plans.map(plan => {
              const [hover, setHover, scaleStyle] = useHoverScale();
              return (
                <div
                  key={plan.id}
                  style={{
                    flex: "1 1 320px",
                    maxWidth: 390,
                    minWidth: 240,
                    margin: "0 1.2rem 1.4rem 0",
                    ...scaleStyle
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div style={cardStyle}>
                    <div style={{ padding: isMobile ? "1.1rem" : "1.45rem" }}>
                      <h4 style={{
                        color: accentColor,
                        fontWeight: 700,
                        letterSpacing: "0.43px",
                        fontSize: "1.17rem",
                        marginBottom: "0.45rem"
                      }}>{plan.name}</h4>
                      <p style={{ margin: 0, marginBottom: "0.45rem", color: "#181818" }}>{plan.description}</p>
                      <ul style={{ listStyle: "none", padding: 0, fontSize: "0.96em", color: "#353535", marginBottom: 0 }}>
                        <li><strong>Gym Access:</strong> {plan.gymAccess}</li>
                        <li><strong>Diet Consultation:</strong> {plan.dietConsultation}</li>
                        <li><strong>Group Classes:</strong> {plan.groupClasses.join(", ")}</li>
                        <li><strong>Sauna Access:</strong> {plan.saunaAccess}</li>
                        <li><strong>Duration:</strong> {plan.duration}</li>
                        <li><strong>Total Price:</strong> ₹{plan.price}</li>
                        <li><strong>Monthly Rate:</strong> ₹{plan.pricePerMonth}</li>
                        <li><strong>Discount:</strong> {plan.discount}</li>
                      </ul>
                    </div>
                    <div style={{ textAlign: "center", background: "transparent", padding: "0.6em 1em" }}>
                      <Link
                        to={`/payment?planId=${plan.id}`}
                        style={hover ? outlineBtnHoverStyle : outlineBtnStyle}
                        onMouseEnter={e => e.target.style.background = accentColor}
                        onMouseLeave={e => e.target.style.background = "#fff"}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>Meet Our Trainers</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {trainers.map(trainer => {
              const [hover, setHover, scaleStyle] = useHoverScale();
              return (
                <div
                  key={trainer.id}
                  style={{
                    flex: isMobile ? "1 1 100%" : "1 1 200px",
                    maxWidth: isMobile ? "99%" : 220,
                    margin: "0 1rem 1.2rem 0",
                    minWidth: "180px",
                    ...scaleStyle
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div style={{
                    ...cardStyle,
                    border: `1px solid #e7e7e7`,
                    background: "#fafafa"
                  }}>
                    <img
                      src={trainer.photo}
                      alt={trainer.name}
                      style={{
                        height: 160,
                        width: "100%",
                        objectFit: "cover",
                        borderBottom: "2px solid #ededed",
                        filter: "none",
                        borderRadius: "0 0 14px 14px",
                        marginBottom: 0
                      }}
                    />
                    <div style={{ padding: "0.80em 1em 0.94em 1em", flex: 1 }}>
                      <h5 style={{
                        margin: 0,
                        fontWeight: 700,
                        color: mainFontColor,
                        fontSize: "1em",
                        letterSpacing: "0.3px",
                        marginBottom: "0.38em",
                      }}>{trainer.name}</h5>
                      <div style={{
                        color: "#666",
                        fontSize: "0.98em",
                        fontWeight: 400,
                        marginBottom: "0.45em"
                      }}>{trainer.expertise}</div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.93em", color: "#333", textAlign: "left" }}>
                        {trainer.certifications.map((cert, idx) => (
                          <li key={idx}>✅ {cert}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <div style={{ marginBottom: "2.1rem" }}>
          <h3 style={sectionTitleStyle}>
            <FaUserShield style={{ marginRight: 8, color: iconColor }} />
            Why Choose Us?
          </h3>
          <ul style={{ fontSize: isMobile ? "1.05rem" : "1.15rem", color: "#222", margin: 0, padding: 0 }}>
            <li style={{ padding: "0.22em 0" }}><FaClock style={{ marginRight: 8, color: iconColor }} /> 24x7 Member Access</li>
            <li style={{ padding: "0.22em 0" }}><FaLeaf style={{ marginRight: 8, color: iconColor }} /> Air-Conditioned, Hygienic Environment</li>
            <li style={{ padding: "0.22em 0" }}><FaHeartbeat style={{ marginRight: 8, color: iconColor }} /> Expert Diet & Nutrition Counseling</li>
            <li style={{ padding: "0.22em 0" }}><FaShower style={{ marginRight: 8, color: iconColor }} /> Smart Locker & Shower Facility</li>
            <li style={{ padding: "0.22em 0" }}><FaMobileAlt style={{ marginRight: 8, color: iconColor }} /> Workout Tracking via Mobile App</li>
            <li style={{ padding: "0.22em 0" }}><FaGift style={{ marginRight: 8, color: iconColor }} /> Referral Rewards for Members</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <section id="contact" style={{ marginBottom: "2.1rem" }}>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>Contact Us</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: 620, width: "100%" }}>
              <p style={{
                fontSize: isMobile ? "1rem" : "1.08rem",
                color: "#444",
                textAlign: "center",
                marginBottom: 8
              }}>
                Have questions, suggestions, or feedback? We’d love to hear from you! Reach out to us anytime.
              </p>
              <ul style={{
                listStyle: "none", fontSize: isMobile ? "1.07rem" : "1.18rem",
                color: mainFontColor, textAlign: "center", marginBottom: 0, padding: 0
              }}>
                <li style={{ marginBottom: 3 }}><b>📍 Address:</b> 123 Fitness St, Health City, 400001</li>
                <li style={{ marginBottom: 3 }}><b>📞 Phone:</b> +91 98765 43210</li>
                <li style={{ marginBottom: 3 }}><b>📧 Email:</b> support@gymmate.com</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
