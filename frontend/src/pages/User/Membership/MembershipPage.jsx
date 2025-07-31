// src/pages/MembershipPage.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaMedal, FaCrown } from "react-icons/fa";
import UserService from "../../../services/UserService";
import "./MembershipPage.css";

// Cycle through 3 icons, fallback pattern
function getIcon(idx) {
  switch (idx % 3) {
    case 0: return <FaStar size={26} color="#000" />;
    case 1: return <FaMedal size={26} color="#000" />;
    default: return <FaCrown size={26} color="#000" />;
  }
}

// Display human-readable GymAccess
function getAccessDisplay(access) {
  if (access === "FULLTIME") return "Full-time";
  if (access === "OFF_PEAK_HOURS") return "Off-peak hours";
  return access; // fallback for any future enum values
}

export default function MembershipPage() {
  const [packages, setPackages] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    UserService.getMembershipPackages()
      .then(data => {
        setPackages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading memberships...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!Array.isArray(packages) || packages.length === 0)
    return <div>No membership packages available.</div>;

  const selected = packages[selectedIdx] || packages[0];
  const monthly =
    selected && selected.duration ? Math.round(selected.price / selected.duration) : (selected?.price || 0);

  return (
    <div className="membership-bg">
      <h2 className="membership-heading">Membership Packages</h2>
      <div className="membership-package-list">
        {packages.map((pkg, idx) => (
          <div
            key={pkg.id}
            className={`membership-package-card${idx === selectedIdx ? " selected" : ""}`}
            onClick={() => setSelectedIdx(idx)}
          >
            <div className="membership-card-title">
              {getIcon(idx)}
              <span className="membership-card-name">{pkg.name}</span>
              {pkg.discount > 0 && (
                <span className="membership-discount">
                  {Math.round(pkg.discount * 100)}%
                </span>
              )}
            </div>
            <div className="membership-card-desc">{pkg.description}</div>
            <ul className="membership-feature-list">
              <li>
                <b>Gym Access:</b> {getAccessDisplay(pkg.access)}
              </li>
              <li>
                <b>Diet Consultation:</b> {pkg.dietConsultation ? "Yes" : "No"}
              </li>
              <li>
                <b>Sauna Access:</b> {pkg.isSauna ? "Yes" : "No"}
              </li>
              <li>
                <b>Duration:</b> {pkg.duration} month{pkg.duration > 1 ? "s" : ""}
              </li>
              <li>
                <b>Price:</b> ₹{pkg.price}
              </li>
            </ul>
            <div className="membership-card-monthly">
              ({pkg.duration} {pkg.duration === 1 ? "month" : "months"})
              {idx === selectedIdx && (
                <span>&nbsp;|&nbsp;₹{monthly}/mo</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className="membership-confirm-btn"
        onClick={() => alert(`Upgraded to ${selected.name}!`)}
      >
        Confirm &amp; Pay for{" "}
        <span className="membership-btn-plan">{selected.name}</span>
      </button>
    </div>
  );
}
