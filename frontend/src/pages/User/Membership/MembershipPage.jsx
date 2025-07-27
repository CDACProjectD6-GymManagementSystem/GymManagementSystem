import React, { useState } from "react";
import { FaStar, FaMedal, FaCrown } from "react-icons/fa";
import "./MembershipPage.css";

const packages = [
  {
    id: 1,
    name: "Basic",
    description: "Good for beginners. Access to gym during off-peak hours.",
    gymAccess: "Off-peak hours",
    dietConsultation: "Once at start",
    groupClasses: ["Yoga"],
    saunaAccess: "No",
    duration: "1 month",
    price: 1000,
    discount: "0%",
    icon: <FaStar size={26} color="#000" />,
  },
  {
    id: 2,
    name: "Premium",
    description: "Full gym access and monthly diet consultations.",
    gymAccess: "Full-time",
    dietConsultation: "Monthly",
    groupClasses: ["Yoga", "Zumba", "HIIT"],
    saunaAccess: "Yes",
    duration: "3 months",
    price: 2700,
    discount: "10%",
    icon: <FaMedal size={26} color="#000" />,
  },
  {
    id: 3,
    name: "VIP",
    description: "All-inclusive plan with unlimited access to trainers, sauna, and all group classes.",
    gymAccess: "Full-time",
    dietConsultation: "Monthly",
    groupClasses: ["Yoga", "Zumba", "HIIT"],
    saunaAccess: "Yes",
    duration: "12 months",
    price: 9600,
    discount: "20%",
    icon: <FaCrown size={26} color="#000" />,
  },
];

export default function MembershipPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = packages[selectedIdx];
  const months = parseInt(selected.duration);
  const monthly = months ? Math.round(selected.price / months) : selected.price;

  return (
    <div className="membership-bg">
      <h2 className="membership-heading">Membership Packages</h2>
      <div className="membership-package-list">
        {packages.map((pkg, idx) => (
          <div
            key={pkg.id}
            className={"membership-package-card" + (idx === selectedIdx ? " selected" : "")}
            onClick={() => setSelectedIdx(idx)}
          >
            <div className="membership-card-title">
              {pkg.icon}
              <span className="membership-card-name">{pkg.name}</span>
              {pkg.discount !== "0%" && <span className="membership-discount">{pkg.discount}</span>}
            </div>
            <div className="membership-card-duration">{pkg.duration}</div>
            <div className="membership-card-desc">{pkg.description}</div>
            <ul className="membership-feature-list">
              <li><b>Gym Access: </b>{pkg.gymAccess}</li>
              <li><b>Diet Consultation: </b>{pkg.dietConsultation}</li>
              <li><b>Group Classes: </b>{pkg.groupClasses.length ? pkg.groupClasses.join(", ") : "Not included"}</li>
              <li><b>Sauna/Steam/Shower: </b>{pkg.saunaAccess}</li>
            </ul>
            <div className="membership-card-price">₹{pkg.price}</div>
            <div className="membership-card-monthly">
              ({pkg.duration})
              {idx === selectedIdx && <span>&nbsp;|&nbsp;₹{monthly}/mo</span>}
            </div>
          </div>
        ))}
      </div>

      <button
        className="membership-confirm-btn"
        onClick={() => alert(`Upgraded to ${selected.name}!`)}
      >
        Confirm &amp; Pay for <span className="membership-btn-plan">{selected.name}</span>
      </button>
    </div>
  );
}
