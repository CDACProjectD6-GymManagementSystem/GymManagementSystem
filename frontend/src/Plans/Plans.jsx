import React from "react";
import "../styles/Plans.css";

const plans = [
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

const Plans = () => {
  return (
    <div className="container mt-5">
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
                <button className="btn btn-outline-primary w-100">Choose Plan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;

