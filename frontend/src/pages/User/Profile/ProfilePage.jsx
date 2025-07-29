import React, { useEffect, useState } from "react";
import {
  FaUserEdit, FaSave, FaUser, FaEnvelope, FaPhone, FaHome, FaVenusMars
} from "react-icons/fa";
import './ProfilePage.css';
import { profileService } from "../../../services/UserProfileService";

// Gender enum for select
const GENDERS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER",  label: "Other" }
];
const AVATAR = "https://randomuser.me/api/portraits/men/75.jpg";

const ProfilePage = () => {
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // On mount, fetch the user's profile using their id from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("gymmateUserId");
    if (!userId) {
      setApiError("You must be logged in to view your profile.");
      setLoading(false);
      return;
    }
    setLoading(true);
    profileService.fetch()
      .then(res => {
        setForm(res.data);
        setLoading(false);
        setApiError("");
      })
      .catch(() => {
        setApiError("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");
    try {
      await profileService.update(form);
      setEditing(false);
      setSuccessMsg("Profile updated successfully!");
    } catch {
      setApiError("Failed to save changes!");
    }
  };

  if (loading)
    return (
      <div className="profilepage-bg">
        <div style={{ textAlign: 'center', padding: '70px' }}>Loading...</div>
      </div>
    );

  if (!form)
    return (
      <div className="profilepage-bg">
        <div style={{ color: 'red', textAlign: 'center', padding: '70px' }}>
          {apiError || "No Profile"}
        </div>
      </div>
    );

  return (
    <div className="profilepage-bg">
      <div className="profilepage-root">
        {/* Avatar & Display Info */}
        <div className="profile-avatar-panel">
          <div className="profile-avatar">
            <img src={AVATAR} alt="Profile" />
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
            <FaVenusMars /> {(form.gender && GENDERS.find(g => g.value === form.gender)?.label) || ""}
          </div>
        </div>
        {/* Edit Form */}
        <div className="profile-form-panel">
          <div className="profile-form-heading">Edit Details</div>
          <form onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <label><FaUser className="profile-label-icon" /> First Name</label>
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
              <label><FaUser className="profile-label-icon" /> Last Name</label>
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
              <label><FaEnvelope className="profile-label-icon" /> Email</label>
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
              <label><FaPhone className="profile-label-icon" /> Mobile Number</label>
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
              <label><FaHome className="profile-label-icon" /> Address</label>
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
              <label><FaVenusMars className="profile-label-icon" /> Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={!editing}
                className={`profile-input ${!editing ? "readonly" : ""}`}
              >
                {GENDERS.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            {apiError && <div style={{ color: '#c00', marginBottom: 7 }}>{apiError}</div>}
            {successMsg && <div style={{ color: 'green', marginBottom: 7 }}>{successMsg}</div>}
            <div style={{ marginTop: 14 }}>
              {editing ? (
                <button type="submit" className="profile-save-btn">
                  <FaSave className="profile-btn-icon" />
                  Save Changes
                </button>
              ) : (
                <button onClick={handleEdit} className="profile-edit-btn" type="button">
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
