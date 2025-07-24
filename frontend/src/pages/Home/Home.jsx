import React from "react";
import { Link } from "react-router-dom";
import { FaDumbbell, FaUserFriends, FaHeartbeat, FaRunning, FaBiking, FaYinYang, FaUserShield, FaChild, FaBox, FaClock, FaMobileAlt, FaShower, FaLeaf, FaGift } from "react-icons/fa";
import "../../styles/Home.css";
import trainer1 from "../../../public/images/Trainer1.png";
import trainer2 from "../../../public/images/Trainer2.png";
import trainer3 from "../../../public/images/Trainer3.png";
import trainer4 from "../../../public/images/Trainer4.png";

const plans = [
  { id: 1, name: "Basic", desc: "Start your journey.", duration: "1 Month", price: 1000, discount: "0%", highlight: "Beginner" },
  { id: 2, name: "Premium", desc: "All access + classes.", duration: "3 Months", price: 2500, discount: "15%", highlight: "Popular" },
  { id: 3, name: "Gold", desc: "Top trainers, best rate.", duration: "6 Months", price: 4200, discount: "23%", highlight: "Value" },
  { id: 4, name: "Elite", desc: "1-on-1 & full perks.", duration: "12 Months", price: 7400, discount: "40%", highlight: "Elite" },
];

const trainers = [
  { id: 1, name: "Alex Turner", expertise: "Strength", certifications: ["ACE"], photo: trainer1 },
  { id: 2, name: "Sophia Lee", expertise: "Yoga", certifications: ["RYT 500"], photo: trainer2 },
  { id: 3, name: "Michael Chen", expertise: "Bodybuilding", certifications: ["NSCA"], photo: trainer3 },
  { id: 4, name: "Priya Sharma", expertise: "Zumba", certifications: ["ZIN"], photo: trainer4 }
];

const activities = [
  { icon: <FaYinYang />, name: "Yoga", desc: "Relax & stretch." },
  { icon: <FaDumbbell />, name: "Strength", desc: "Build muscle." },
  { icon: <FaBiking />, name: "Cardio", desc: "Burn calories." },
  { icon: <FaRunning />, name: "CrossFit", desc: "Push limits." },
  { icon: <FaBox />, name: "Boxing", desc: "Train hard." },
  { icon: <FaLeaf />, name: "Dance", desc: "Fun & fitness." },
  { icon: <FaChild />, name: "Kids", desc: "Play & move." },
  { icon: <FaUserFriends />, name: "Group", desc: "Train together." },
];

const Home = () => (
  <div className="home-bg">
    <section className="hero-section text-center">
      <h1>Welcome to <span className="white-highlight">GymMate</span></h1>
<p className="hero-lead"><FaDumbbell /> Let's train and transform!</p>
<Link to="/register" className="hero-btn-white mt-3">Join Now</Link>
    </section>

    <section className="about-glass text-center">
      <h2 className="section-white">About Us</h2>
      <p>Your friendly fitness hub for all levels.</p>
      <ul className="about-points">
        <li>✔ Friendly Trainers</li>
        <li>✔ Daily Classes</li>
        <li>✔ Nutrition Tips</li>
        <li>✔ Clean Facility</li>
      </ul>
    </section>

    <section className="activity-grid row g-3">
      <h2 className="section-white text-center">Activities</h2>
      {activities.map((a, i) => (
        <div className="col-md-3 text-center" key={i}>
          <div className="activity-glass">
            <div className="white-ico">{a.icon}</div>
            <div>{a.name}</div>
            <small>{a.desc}</small>
          </div>
        </div>
      ))}
    </section>

    <section className="membership-section">
      <h2 className="section-white text-center">Plans</h2>
      <div className="row g-3">
        {plans.map(plan => (
          <div className="col-md-3" key={plan.id}>
            <div className="plan-glass text-center">
              <div className="plan-ribbon">{plan.highlight}</div>
              <h5>{plan.name}</h5>
              <p>₹{plan.price} / {plan.duration}</p>
              <small>{plan.desc}</small>
              <Link to="/register" className="shiny-btn-white">Choose</Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="trainers-section">
      <h2 className="section-white text-center">Trainers</h2>
      <div className="row g-3">
        {trainers.map(t => (
          <div className="col-md-3 text-center" key={t.id}>
            <div className="trainer-glass">
              <img src={t.photo} alt={t.name} className="trainer-photo" />
              <div>{t.name}</div>
              <small>{t.expertise}</small>
              <ul className="trainer-certs">
                {t.certifications.map((c, i) => <li key={i}>🎓 {c}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="why-glass-section text-center">
      <h2 className="section-white">Why Us?</h2>
      <div className="row g-3">
        {[FaClock, FaLeaf, FaHeartbeat, FaShower, FaMobileAlt, FaGift].map((Icon, i) => (
          <div className="col-md-4" key={i}>
            <div className="reason-glass"><Icon className="choose-ico" /> Quality Facilities</div>
          </div>
        ))}
      </div>
    </section>

    <section className="contact-glass text-center">
      <h2 className="section-white">Contact Us</h2>
      <p>123 Fitness St, City | +91 98765 43210 | support@gymmate.com</p>
      <Link to="/contact" className="shiny-btn-white">Message Us</Link>
    </section>
  </div>
);

export default Home;
