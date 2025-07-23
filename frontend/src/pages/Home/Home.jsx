import React from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell, FaUserFriends, FaHeartbeat, FaRunning, FaBiking, FaYinYang, FaUserShield,
  FaChild, FaBox, FaClock, FaMobileAlt, FaShower, FaLeaf, FaGift
} from "react-icons/fa";
import "../../styles/Home.css";
import trainer1 from "../../../public/images/Trainer1.png";
import trainer2 from "../../../public/images/Trainer2.png";
import trainer3 from "../../../public/images/Trainer3.png";
import trainer4 from "../../../public/images/Trainer4.png";
import PaymentPage from "../Payment/PaymentPage";


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

const Home = () => {
  return (
    <div className="home-container">
      <div className="container">

        {/* Welcome Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Welcome to <span className="text-primary">GymMate Fitness Club</span>
          </h1>
          <p className="fs-5">
            <FaDumbbell className="me-2" /> A complete fitness ecosystem where you build your body and mind.
          </p>
        </div>

            <section id="about" className="mb-5">
      <h2 className="text-center fw-bold mb-4">About Us</h2>
      <p className="fs-5 text-center">
        GymMate was founded with a mission to make fitness accessible and enjoyable for everyone.
        Whether you're just starting out or an experienced athlete, our certified trainers, modern facilities,
        and community-focused approach help you reach your goals. We believe in empowering every individual with
        knowledge, tools, and motivation to live healthier, stronger lives.
      </p>
    </section>

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

        {/* Membership Plans Section */}
        <section id="plans" className="mb-5">
          <h2 className="text-center mb-4 text-primary">Our Membership Plans</h2>
          <div className="row">
            {plans.map(plan => (
              <div className="col-md-6 col-lg-4 mb-4" key={plan.id}>
                <div className="card h-100 shadow">
                  <div className="card-body">
                    <h4 className="card-title text-success">{plan.name}</h4>
                    <p className="card-text">{plan.description}</p>
                    <ul className="list-unstyled small">
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
                  <div className="card-footer text-center">
                    <Link 
                  to={`/payment?planId=${plan.id}`} 
                  className="btn btn-outline-primary w-100"
                >
                  Choose Plan
                </Link></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" className="mb-5">
          <h2 className="text-center fw-bold mb-4">Meet Our Trainers</h2>
          <div className="row">
            {trainers.map(trainer => (
              <div className="col-md-3 mb-4" key={trainer.id}>
                <div className="card shadow-sm h-100 text-center">
                  <img src={trainer.photo} className="card-img-top" alt={trainer.name} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{trainer.name}</h5>
                    <p className="card-text text-muted"><strong>Expertise:</strong> {trainer.expertise}</p>
                    <p className="card-text"><strong>Certifications:</strong>
                      <ul className="list-unstyled mb-0">
                        {trainer.certifications.map((cert, i) => (
                          <li key={i}>✅ {cert}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
          
              {/* Contact Us Section */}
    <section id="contact" className="mb-5">
      <h2 className="text-center fw-bold mb-4">Contact Us</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p className="fs-5 text-center">
            Have questions, suggestions, or feedback? We’d love to hear from you! Reach out to us anytime.
          </p>
          <ul className="list-unstyled fs-5 text-center">
            <li><strong>📍 Address:</strong> 123 Fitness St, Health City, 400001</li>
            <li><strong>📞 Phone:</strong> +91 98765 43210</li>
            <li><strong>📧 Email:</strong> support@gymmate.com</li>
          </ul>
        </div>
      </div>
    </section>



      </div>
    </div>
  );
};

export default Home;
