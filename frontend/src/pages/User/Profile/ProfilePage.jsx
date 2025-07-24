import React, { useState } from "react";
import {
  FaUserEdit,
  FaSave,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaIdBadge,
} from "react-icons/fa";
import "./ProfilePage.css";

// Placeholder avatar
const AVATAR = "https://randomuser.me/api/portraits/men/75.jpg";

const dummyProfile = {
  firstName: "pratik",
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
    <div className="profilepage-bg">
      <div className="profilepage-root">
        {/* LEFT: Avatar + Info */}
        <div className="profile-avatar-panel">
          <div className="profile-avatar">
            <img
              src={form.photo || AVATAR}
              alt="Profile"
            />
          </div>
          <div className="profile-mainname">
            {form.firstName} {form.lastName}
          </div>
          <div className="profile-info-line">
            <FaEnvelope /> {form.email}
          </div>
          <div className="profile-info-line">
            <FaPhone /> {form.mobile}
          </div>
          <div className="profile-info-line">
            <FaIdBadge /> <small>{form.subscriptionId}</small>
          </div>
          <span className="profile-active-status">Active Member</span>
        </div>
        {/* RIGHT: Profile Form */}
        <div className="profile-form-panel">
          <div className="profile-form-heading">Edit Details</div>
          <form onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <label>
                <FaUser className="profile-label-icon"/> First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                readOnly={!editing}
                className={`profile-input ${!editing ? "readonly" : ""}`}
              />
            </div>
            <div className="profile-form-group">
              <label>
                <FaUser className="profile-label-icon"/> Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                readOnly={!editing}
                className={`profile-input ${!editing ? "readonly" : ""}`}
              />
            </div>
            <div className="profile-form-group">
              <label>
                <FaEnvelope className="profile-label-icon"/> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                readOnly={!editing}
                className={`profile-input ${!editing ? "readonly" : ""}`}
              />
            </div>
            <div className="profile-form-group">
              <label>
                <FaPhone className="profile-label-icon"/> Mobile Number
              </label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
                readOnly={!editing}
                className={`profile-input ${!editing ? "readonly" : ""}`}
              />
            </div>
            <div className="profile-form-group">
              <label>
                <FaHome className="profile-label-icon"/> Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                readOnly={!editing}
                className={`profile-input ${!editing ? "readonly" : ""}`}
              />
            </div>
            <div className="profile-form-group">
              <label>
                <FaIdBadge className="profile-label-icon"/> Subscription ID
              </label>
              <input
                value={form.subscriptionId}
                readOnly
                disabled
                className="profile-input disabled"
                style={{ border: "1.5px solid #000" }} // Keep green out, pure black & white
              />
            </div>
            <div style={{ marginTop: 12 }}>
              {editing ? (
                <button type="submit" className="profile-save-btn">
                  <FaSave className="profile-btn-icon" />
                  Save Changes
                </button>
              ) : (
                <button onClick={handleEdit} className="profile-edit-btn">
                  <FaUserEdit className="profile-btn-icon" />
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
