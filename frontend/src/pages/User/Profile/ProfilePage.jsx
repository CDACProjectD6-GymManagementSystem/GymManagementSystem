import React, { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaSave,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaIdBadge,
} from "react-icons/fa";

// Placeholder avatar
const AVATAR = "https://randomuser.me/api/portraits/men/75.jpg";

const dummyProfile = {
  firstName: "Arya",
  lastName: "Pawar",
  email: "jane@example.com",
  mobile: "9876543210",
  address: "123 Main St, Springfield, USA",
  subscriptionId: "SUB-123456789",
  photo: "",
};

const ProfilePage = () => {
  const [form, setForm] = useState({ ...dummyProfile });
  const [editing, setEditing] = useState(false);

  const dateStr = new Date().toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    alert("Profile updated!\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#181a1b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div
        style={{
          background: "#23272b",
          borderRadius: 22,
          boxShadow: "0 8px 36px 0 #f7c94833",
          width: "100%",
          maxWidth: 1350,
          minHeight: 500,
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        {/* Left: Avatar and summary */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: 390,
            borderRight: "2px solid #282A36",
            background: "linear-gradient(120deg,#181a1b 60%,#23272b 100%)",
            borderRadius: "22px 0 0 22px",
            padding: "48px 16px 32px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 280,
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center mb-3"
            style={{
              width: 115,
              height: 115,
              borderRadius: "50%",
              border: "4px solid #f7c948",
              overflow: "hidden",
              background: "#fff70008",
            }}
          >
            {form.photo || AVATAR ? (
              <img src={form.photo || AVATAR} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <FaUser size={70} color="#f7c948" />
            )}
          </div>
          <h3 className="fw-bold mb-1" style={{ color: "#f7c948", letterSpacing: 1 }}>
            {form.firstName} {form.lastName}
          </h3>
          <div className="mb-1" style={{ color: "#ffecb3" }}>
            <FaEnvelope className="me-1" />
            {form.email}
          </div>
          <div className="mb-1" style={{ color: "#ffecb3" }}>
            <FaPhone className="me-1" />
            {form.mobile}
          </div>
          <div className="mb-3" style={{ color: "#ffecb3" }}>
            <FaIdBadge className="me-1" />
            <small>{form.subscriptionId}</small>
          </div>
          <span
            className="badge"
            style={{
              background: "#f7c948",
              color: "#181a1b",
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 6,
            }}
          >
            Active Member
          </span>
          <div
            className="mt-3 mb-1"
            style={{
              fontSize: 14,
              color: "#d2d2c3",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {dateStr}
          </div>
        </div>
        {/* Right: Form */}
        <div
          style={{
            flex: "2 1 470px",
            minWidth: 320,
            padding: "48px 44px",
            borderRadius: "0 22px 22px 0",
            background: "#23272b",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            className="fw-bold gradient-heading mb-4"
            style={{
              letterSpacing: 1.2,
              fontSize: 34,
              color: "#fff700",
              marginTop: 8,
            }}
          >
            Edit Details
          </h2>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#f7c948" }}>
                <FaUser className="me-2 mb-1" />
                First Name
              </label>
              <input
                className="form-control"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                readOnly={!editing}
                style={{
                  background: !editing ? "#2f3136" : "#181a1b",
                  color: "#fff",
                  border: "1.5px solid #f7c948",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#f7c948" }}>
                <FaUser className="me-2 mb-1" />
                Last Name
              </label>
              <input
                className="form-control"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                readOnly={!editing}
                style={{
                  background: !editing ? "#2f3136" : "#181a1b",
                  color: "#fff",
                  border: "1.5px solid #f7c948",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#f7c948" }}>
                <FaEnvelope className="me-2 mb-1" />
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                readOnly={!editing}
                style={{
                  background: !editing ? "#2f3136" : "#181a1b",
                  color: "#fff",
                  border: "1.5px solid #f7c948",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Mobile */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#f7c948" }}>
                <FaPhone className="me-2 mb-1" />
                Mobile Number
              </label>
              <input
                className="form-control"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                readOnly={!editing}
                style={{
                  background: !editing ? "#2f3136" : "#181a1b",
                  color: "#fff",
                  border: "1.5px solid #f7c948",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Address */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#f7c948" }}>
                <FaHome className="me-2 mb-1" />
                Address
              </label>
              <input
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                required
                readOnly={!editing}
                style={{
                  background: !editing ? "#2f3136" : "#181a1b",
                  color: "#fff",
                  border: "1.5px solid #f7c948",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Subscription ID */}
            <div className="mb-4">
              <label className="form-label" style={{ color: "#f7c948" }}>
                <FaIdBadge className="me-2 mb-1" />
                Subscription ID
              </label>
              <input
                className="form-control"
                name="subscriptionId"
                value={form.subscriptionId}
                readOnly
                disabled
                style={{
                  background: "#f6ffe7",
                  color: "#55a630",
                  fontWeight: 600,
                  border: "1.5px solid #f7c948",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Edit/Save Button */}
            {editing ? (
              <button
                className="btn w-100"
                type="submit"
                style={{
                  background: "linear-gradient(90deg,#f7c948 85%,#fff 140%)",
                  color: "#23272b",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "1.2rem",
                  boxShadow: "0 2px 16px #f7c94855",
                  borderRadius: 11,
                }}
              >
                <FaSave className="me-2 mb-1" /> Save Changes
              </button>
            ) : (
              <button
                className="btn btn-outline-warning w-100 fw-bold"
                onClick={handleEdit}
                style={{
                  color: "#f7c948",
                  borderColor: "#f7c948",
                  fontWeight: "bold",
                  fontSize: "1.15rem",
                  borderRadius: 11,
                }}
              >
                <FaUserEdit className="me-2 mb-1" /> Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
      {/* Gradient heading */}
      <style>
        {`
        .gradient-heading {
          background: linear-gradient(90deg,#f7c948,#fff700 50%,#fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
