// src/pages/MembershipPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaMedal, FaCrown } from "react-icons/fa";
import UserService from "../../../services/UserService";
import "./MembershipPage.css";

function getIcon(idx) {
  switch (idx % 3) {
    case 0: return <FaStar size={26} color="#000" />;
    case 1: return <FaMedal size={26} color="#000" />;
    default: return <FaCrown size={26} color="#000" />;
  }
}
function getAccessDisplay(access) {
  if (access === "FULLTIME") return "Full-time";
  if (access === "OFF_PEAK_HOURS") return "Off-peak hours";
  return access;
}

export default function MembershipPage() {
  const [packages, setPackages] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Only redirect if visit is a result of login (not manual navigation)
  useEffect(() => {
    if (
      location.state &&
      location.state.fromLogin &&
      localStorage.getItem("gymmateUserSubscribed") === "true"
    ) {
      navigate("/user", { replace: true });
    }
    // On manual navigation, MembershipPage is always visible
  }, [navigate, location.state]);

  useEffect(() => {
    setLoading(true);
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
    selected && selected.duration
      ? Math.round(selected.price / selected.duration)
      : selected?.price || 0;

  const handleConfirm = async () => {
    const userId = localStorage.getItem("gymmateUserId");
    if (!userId) {
      alert("You must be logged in to subscribe.");
      return;
    }
    if (!selected || !selected.name) {
      alert("Please select a membership package.");
      return;
    }
    setSubmitting(true);
    const payload = { name: selected.name };
    try {
      const res = await fetch(`http://localhost:8080/user/buy-package/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Subscription failed. Try again.");
      }
      localStorage.setItem("gymmateUserSubscribed", "true");
      alert(`Successfully subscribed to ${selected.name}!`);
      navigate("/user");
    } catch (err) {
      alert(err.message || "Subscription error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="membership-bg">
      <h2 className="membership-heading">Membership Packages</h2>
      <div className="membership-package-list">
        {packages.map((pkg, idx) => (
          <div
            key={pkg.id || pkg.name}
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
              <li><b>Gym Access:</b> {getAccessDisplay(pkg.access)}</li>
              <li><b>Diet Consultation:</b> {pkg.dietConsultation ? "Yes" : "No"}</li>
              <li><b>Sauna Access:</b> {pkg.isSauna ? "Yes" : "No"}</li>
              <li><b>Duration:</b> {pkg.duration} month{pkg.duration > 1 ? "s" : ""}</li>
              <li><b>Price:</b> ₹{pkg.price}</li>
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
        onClick={handleConfirm}
        disabled={submitting}
      >
        {submitting ? "Processing..." : (
          <>Confirm &amp; Pay for <span className="membership-btn-plan">{selected.name}</span></>
        )}
      </button>
    </div>
  );
}
