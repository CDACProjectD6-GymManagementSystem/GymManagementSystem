import React, { useEffect, useState } from "react";
import { FaStar, FaMedal, FaCrown } from "react-icons/fa";

const dummyPackages = [
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
    color: "#f7c948",
    icon: <FaStar size={32} color="#f7c948" />,
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
    color: "#f7c948",
    icon: <FaMedal size={32} color="#f7c948" />,
  },
  {
    id: 3,
    name: "VIP",
    description:
      "All-inclusive plan with unlimited access to trainers, sauna, and all group classes.",
    gymAccess: "Full-time",
    dietConsultation: "Monthly",
    groupClasses: ["Yoga", "Zumba", "HIIT"],
    saunaAccess: "Yes",
    duration: "12 months",
    price: 9600,
    discount: "20%",
    color: "#ffd700",
    icon: <FaCrown size={32} color="#ffd700" />,
  },
];

const MembershipPage = () => {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setPackages(dummyPackages);
    setSelected(dummyPackages[0]);
  }, []);

  const handleSelect = (packageName) => {
    const pkg = packages.find((p) => p.name === packageName);
    setSelected(pkg);
  };

  const handleUpgrade = () => {
    alert(`Upgraded to ${selected.name}!`);
  };

  if (packages.length === 0)
    return (
      <div
        style={{
          background: "#181a1b",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );

  const monthly =
    selected.duration && selected.duration.match(/\d+/)
      ? Math.round(selected.price / Number(selected.duration.match(/\d+/)))
      : selected.price;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181a1b",
        width: "100vw",
        padding: "0",
        margin: "0",
      }}
    >
      <h2
        className="fw-bold gradient-heading"
        style={{
          letterSpacing: 1.1,
          padding: "40px 0 16px 0",
          margin: 0,
          textAlign: "center",
          fontSize: 36,
        }}
      >
        Membership Packages
      </h2>

      {/* Card Row */}
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto 32px auto",
          display: "flex",
          gap: 34,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          padding: "0 40px",
        }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              flex: "1 1 325px",
              maxWidth: 400,
              minWidth: 290,
              display: "flex",
            }}
          >
            <div
              className={`card shadow-sm h-100 membership-card ${
                selected?.id === pkg.id ? "selected" : ""
              }`}
              style={{
                border:
                  selected?.id === pkg.id
                    ? `2.5px solid ${pkg.color}`
                    : "1.5px solid #222",
                borderRadius: 20,
                transition: "box-shadow .2s, border .2s, background .2s",
                cursor: "pointer",
                background: "#23272b",
                boxShadow:
                  selected?.id === pkg.id
                    ? `0 8px 36px -8px ${pkg.color}77`
                    : "0 2px 16px #181a1b",
                color: "#fff",
                width: "100%",
                marginBottom: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onClick={() => handleSelect(pkg.name)}
            >
              <div className="card-body text-center pb-0">
                <div className="mb-3">{pkg.icon}</div>
                <h5 className="card-title fw-bold mb-1" style={{ color: pkg.color }}>
                  {pkg.name}
                  {pkg.discount !== "0%" && (
                    <span
                      className="badge ms-2"
                      style={{
                        background: "#f7c948",
                        color: "#181a1b",
                        fontWeight: "bold",
                        letterSpacing: 1,
                      }}
                    >
                      {pkg.discount} OFF
                    </span>
                  )}
                </h5>
                <small className="d-block mb-2" style={{ color: "#f3f3ce" }}>
                  {pkg.duration}
                </small>
                <div className="mb-2">{pkg.description}</div>
                <ul
                  className="list-group list-group-flush mb-3"
                  style={{ background: "transparent" }}
                >
                  <li
                    className="list-group-item bg-transparent"
                    style={{ color: "#f3f3ce", background: "#181a1b" }}
                  >
                    <strong style={{ color: "#f7c948" }}>Gym Access:</strong>{" "}
                    {pkg.gymAccess}
                  </li>
                  <li
                    className="list-group-item bg-transparent"
                    style={{ color: "#f3f3ce", background: "#181a1b" }}
                  >
                    <strong style={{ color: "#f7c948" }}>Diet Consultation:</strong>{" "}
                    {pkg.dietConsultation}
                  </li>
                  <li
                    className="list-group-item bg-transparent"
                    style={{ color: "#f3f3ce", background: "#181a1b" }}
                  >
                    <strong style={{ color: "#f7c948" }}>Group Classes:</strong>{" "}
                    {pkg.groupClasses.length
                      ? pkg.groupClasses.join(", ")
                      : "Not included"}
                  </li>
                  <li
                    className="list-group-item bg-transparent"
                    style={{ color: "#f3f3ce", background: "#181a1b" }}
                  >
                    <strong style={{ color: "#f7c948" }}>
                      Sauna/Steam/Shower:
                    </strong>{" "}
                    {pkg.saunaAccess}
                  </li>
                </ul>
              </div>
              <div
                className="card-footer bg-transparent text-center"
                style={{
                  borderTop: "none",
                  paddingBottom: 18,
                  background: "#23272b",
                }}
              >
                <span className="fs-5 fw-bold" style={{ color: pkg.color }}>
                  ₹{pkg.price}
                </span>
                <span className="ms-2" style={{ color: "#ffecb3", fontSize: 15 }}>
                  ({pkg.duration}){" "}
                  {monthly && selected?.id === pkg.id && (
                    <span>&nbsp;|&nbsp;₹{monthly}/mo</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ textAlign: "center", margin: "0 auto 48px auto" }}>
          <button
            className="btn"
            style={{
              fontWeight: 700,
              background: "linear-gradient(90deg,#f7c948 85%,#fff 140%)",
              border: "none",
              fontSize: 20,
              letterSpacing: 0.5,
              color: "#181a1b",
              boxShadow: "0 2px 16px #f7c94855",
              maxWidth: 480,
              width: "100%",
              borderRadius: 13,
              padding: "16px 0",
              marginTop: 3,
            }}
            onClick={handleUpgrade}
            disabled={!selected}
          >
            Confirm &amp; Pay for <span style={{ color: "#f59e42" }}>{selected.name}</span>
          </button>
        </div>
      )}

      <style>
        {`
        .gradient-heading {
          background: linear-gradient(90deg,#f7c948,#fff700 50%,#fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .membership-card.selected {
          box-shadow: 0 16px 48px -18px #f7c94899, 0 3px 32px -4px #fff70011;
          border-width: 3.5px !important;
        }
        .membership-card:hover {
          background: linear-gradient(120deg,#23272b 60%,#ffe08222 100%) !important;
          transform: translateY(-6px) scale(1.036);
          border: 2.5px solid #f7c948 !important;
        }
        `}
      </style>
    </div>
  );
};

export default MembershipPage;
