import React, { useState, useEffect } from "react";
import {
  FaUserEdit, FaSave, FaUser, FaEnvelope, FaPhone, FaHome,
  FaVenusMars, FaCamera, FaTrash
} from "react-icons/fa";
import './ProfilePage.css';
import { UserService } from "../../../services/UserService";
import { jwtDecode } from "jwt-decode";

const GENDERS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" }
];

// Helper: always decode the user from JWT at runtime
function getCurrentUserId() {
  const token = sessionStorage.getItem("gymmateAccessToken");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded.sub || decoded.email || null;
  } catch {
    return null;
  }
}

const ProfilePage = () => {
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [fileInput, setFileInput] = useState(null);

  const userId = getCurrentUserId();

  // Fetches full profile after any change
  const fetchProfile = async () => {
    setLoading(true);
    setApiError("");
    try {
      if (!userId) throw new Error("Missing user id");
      const res = await UserService.fetchProfile();
      setForm(res.data);
      setLoading(false);
    } catch {
      setApiError("Failed to load profile.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setApiError("You must be logged in to view your profile.");
      setLoading(false);
      return;
    }
    fetchProfile();
    
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEdit = (e) => { e.preventDefault(); setEditing(true); setSuccessMsg(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); setSuccessMsg("");
    try {
      await UserService.updateProfile(form);
      setEditing(false);
      setSuccessMsg("Profile updated successfully!");
      await fetchProfile();
    } catch {
      setApiError("Failed to save changes!");
    }
  };

  // --- IMAGE UPLOAD/REMOVE ---
  const handleFileChange = (e) => setFileInput(e.target.files[0]);

  const handleImageUpload = async () => {
    if (!fileInput || !userId) return;
    setImgLoading(true); setApiError(""); setSuccessMsg("");
    const data = new FormData();
    data.append("file", fileInput);
    try {
      const token = sessionStorage.getItem("gymmateAccessToken");
      const res = await fetch(
        `http://localhost:8080/user/upload-photo/${userId}`,
        {
          method: "POST",
          body: data,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        }
      );
      if (!res.ok) throw new Error();
      setSuccessMsg("Profile photo updated!");
      setFileInput(null);
      await fetchProfile();
    } catch {
      setApiError("Failed to upload image.");
    }
    setImgLoading(false);
  };

  const handleRemoveImage = async () => {
    if (!userId) return;
    setImgLoading(true); setApiError(""); setSuccessMsg("");
    try {
      const token = sessionStorage.getItem("gymmateAccessToken");
      const res = await fetch(
        `http://localhost:8080/user/delete-photo/${userId}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        }
      );
      if (!res.ok) throw new Error();
      setSuccessMsg("Profile photo removed.");
      await fetchProfile();
    } catch {
      setApiError("Failed to remove image!");
    }
    setImgLoading(false);
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
        {/* Avatar */}
        <div className="profile-avatar-panel">
          <div className="profile-avatar" style={{ position: "relative" }}>
            <img
              src={
                form.imageUrl
                  ? form.imageUrl
                  : "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent((form.firstName || "") + " " + (form.lastName || "")) +
                    "&background=eee&color=222&size=98"
              }
              alt="Profile"
              style={{ objectFit: "cover" }}
            />
            {editing && (
              <>
                <label className="profile-avatar-upload-btn">
                  <FaCamera />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                {fileInput && (
                  <button
                    className="profile-avatar-upload-action"
                    onClick={handleImageUpload}
                    disabled={imgLoading}
                  >
                    {imgLoading ? "Uploading..." : "Upload"}
                  </button>
                )}
                {form.imageUrl &&
                  <button
                    onClick={handleRemoveImage}
                    className="profile-avatar-delete-btn"
                    disabled={imgLoading}
                  >
                    <FaTrash /> Remove
                  </button>
                }
              </>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="profile-form-panel" style={{ margin: "0 auto" }}>
          <div className="profile-form-heading">Profile Details</div>
          <form onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <label><FaUser className="profile-label-icon" /> First Name</label>
              <input
                name="firstName"
                value={form.firstName || ""}
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
                value={form.lastName || ""}
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
                value={form.email || ""}
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
                value={form.address || ""}
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
                value={form.mobile || ""}
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
                value={form.gender || ""}
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
