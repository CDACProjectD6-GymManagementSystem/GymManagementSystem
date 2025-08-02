import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './RegisterPage.css';
import { registerUser } from "../../services/registrationService";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaVenusMars } from "react-icons/fa";

const GENDERS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' }
];

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const { confirmPassword, ...payload } = formData;
    setLoading(true);
    try {
      await registerUser(payload);
      alert("Registered successfully!");
      navigate('/login');
    } catch (err) {
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-root">
      <div className="register-card-wide">
        <div className="register-header">
          <span className="register-brand">GymMate</span>
          <span className="register-header-sub">Create your account</span>
        </div>
        <form onSubmit={handleRegister} className="register-form-wide">
          <div className="register-row">
            <div className="register-col">
              <label>First Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  className="register-input"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="register-col">
              <label>Last Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="lastName"
                  className="register-input"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          <div className="register-row">
            <div className="register-col">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className="register-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="register-col">
              <label>Address</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="address"
                  className="register-input"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
          <div className="register-row">
            <div className="register-col">
              <label>Mobile Number</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  name="mobile"
                  pattern="^[0-9]{10,15}$"
                  title="Enter valid mobile number"
                  className="register-input"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>
            </div>
            <div className="register-col">
              <label>Gender</label>
              <div className="input-wrapper">
                <FaVenusMars className="input-icon" />
                <select
                  name="gender"
                  className="register-input"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ paddingLeft: "40px" }}
                >
                  <option value="">Select Gender</option>
                  {GENDERS.map(g => (
                    <option value={g.value} key={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="register-row">
            <div className="register-col">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className="register-input"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="register-col">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  className="register-input"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="register-footer-link">
          Already have an account?{" "}
          <Link to="/login" className="brand-link">
            Login here
          </Link>
        </p>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <button
            onClick={() => navigate("/")}
            className="btn btn-link back-home-btn"
            type="button"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
