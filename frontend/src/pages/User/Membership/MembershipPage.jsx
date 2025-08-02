import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaMedal, FaCrown } from "react-icons/fa";
import UserService from "../../../services/UserService";
import "./MembershipPage.css";

// Icon for membership card
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
  return access || "N/A";
}

export default function MembershipPage() {
  const [packages, setPackages] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localIsSubscribed, setLocalIsSubscribed] = useState(
    localStorage.getItem("gymmateUserSubscribed") === "true"
  );

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if just logged in and already subscribed
  useEffect(() => {
    if (
      location.state &&
      location.state.fromLogin &&
      localStorage.getItem("gymmateUserSubscribed") === "true"
    ) {
      navigate("/user", { replace: true });
    }
  }, [navigate, location.state]);

  // Fetch memberships
  useEffect(() => {
    setLoading(true);
    UserService.getMembershipPackages()
      .then((data) => {
        setPackages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  // Listen for localStorage changes (e.g., if user logs in/out in another tab)
  useEffect(() => {
    function handler() {
      setLocalIsSubscribed(localStorage.getItem("gymmateUserSubscribed") === "true");
    }
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  if (loading) return <div>Loading memberships...</div>;
  if (error)
    return (
      <div style={{ color: "red", marginTop: 16 }}>
        Error: {error}
      </div>
    );
  if (!Array.isArray(packages) || packages.length === 0)
    return <div>No membership packages available.</div>;

  const selected = packages[selectedIdx] || packages[0];
  const monthly =
    selected && selected.duration
      ? Math.round(selected.price / selected.duration)
      : selected?.price || 0;

  // From localStorage only
  const alreadySubscribed = localIsSubscribed;

  const handleConfirm = async () => {
    setApiError("");
    const userId = localStorage.getItem("gymmateUserId");
    if (!userId) {
      setApiError("You must be logged in to subscribe.");
      return;
    }
    if (!selected || !selected.name) {
      setApiError("Please select a membership package.");
      return;
    }
    if (alreadySubscribed) {
      setApiError(
        `You already have an active subscription .`
      );
      return;
    }
    setSubmitting(true);
    const payload = { name: selected.name };
    try {
      const res = await fetch(
        `http://localhost:8080/user/buy-package/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Subscription failed. Try again.");
      }
      // Update memory after successful subscribe
      localStorage.setItem("gymmateUserSubscribed", "true");
      setLocalIsSubscribed(true);
      alert(`Successfully subscribed to ${selected.name}!`);
      navigate("/user");
    } catch (err) {
      setApiError(err.message || "Subscription error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="membership-bg">
      <h2 className="membership-heading">Membership Packages</h2>

      {/* Message if subscribed */}
      {alreadySubscribed && (
        <div style={{ color: "#669900", marginBottom: 12, fontWeight: 500 }}>
          You have an active subscription.
        </div>
      )}

      {apiError && (
        <div style={{ color: "red", marginBottom: 12 }}>{apiError}</div>
      )}

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

      {!alreadySubscribed && (
        <button
          className="membership-confirm-btn"
          onClick={handleConfirm}
          disabled={submitting}
        >
          {submitting ? (
            "Processing..."
          ) : (
            <>
              Confirm &amp; Pay for{" "}
              <span className="membership-btn-plan">{selected.name}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
