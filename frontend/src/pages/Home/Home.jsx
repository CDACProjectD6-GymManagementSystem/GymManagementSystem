import React from "react";
import { FaDumbbell, FaUserFriends, FaHeartbeat, FaRunning, FaBiking, FaYinYang, FaUserShield, FaChild, FaBox, FaClock, FaMobileAlt, FaShower, FaLeaf, FaGift } from "react-icons/fa";
import "../../styles/Home.css";

const Home = () => {
  return (

     <div className="home-container">
   

    <div className="container mt-5">

      {/* Welcome Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Welcome to <span className="text-primary">GymMate Fitness Club</span>
        </h1>
        <p className="fs-5">
          <FaDumbbell className="me-2" /> A complete fitness ecosystem where you build your body and mind.
        </p>
      </div>

      {/* How Our Gym Works */}
      <div className="mb-5">
        <h3 className="fw-bold text-dark"><FaUserFriends className="me-2" />How Our Gym Works</h3>
        <p className="fs-5">
          At GymMate, every member begins with a personalized onboarding session including a fitness assessment and a custom workout plan.
          We offer flexible membership plans—daily, monthly, and yearly—so you can train at your own pace.
          Our certified trainers are available daily, and your performance is tracked monthly to help you achieve your goals.
        </p>
      </div>

      {/* Activities */}
      <div className="mb-5">
        <h3 className="fw-bold text-dark"><FaHeartbeat className="me-2" />Activities at GymMate</h3>
        <p className="fs-5">
          <FaYinYang className="me-2" /> <strong>Yoga & Meditation</strong> help improve flexibility and mental clarity. <br />
          <FaDumbbell className="me-2" /> <strong>Strength Training</strong> includes free weights and resistance machines. <br />
          <FaBiking className="me-2" /> <strong>Cardio Zone</strong> has treadmills, bikes, and ellipticals for endurance. <br />
          <FaRunning className="me-2" /> <strong>CrossFit & HIIT</strong> for intense fat-burning workouts. <br />
          <FaBox className="me-2" /> <strong>Boxing & MMA</strong> builds strength and self-defense skills. <br />
          <FaLeaf className="me-2" /> <strong>Zumba & Dance</strong> workouts to make fitness fun. <br />
          <FaChild className="me-2" /> <strong>Kids Fitness</strong> ensures children aged 6–14 stay active and fit. <br />
          <FaUserFriends className="me-2" /> <strong>Group Classes</strong> every day for all skill levels.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mb-5">
        <h3 className="fw-bold text-dark"><FaUserShield className="me-2" />Why Choose Us?</h3>
        <ul className="fs-5">
          <li><FaClock className="me-2" /> 24x7 Member Access</li>
          <li><FaLeaf className="me-2" /> Air-Conditioned, Hygienic Environment</li>
          <li><FaHeartbeat className="me-2" /> Expert Diet & Nutrition Counseling</li>
          <li><FaShower className="me-2" /> Smart Locker & Shower Facility</li>
          <li><FaMobileAlt className="me-2" /> Workout Tracking via Mobile App</li>
          <li><FaGift className="me-2" /> Referral Rewards for Members</li>
        </ul>
      </div>

    </div></div>
  );
};

export default Home;
