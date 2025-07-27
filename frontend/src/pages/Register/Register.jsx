import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';

// CAPITALIZED enum values (matches backend):
const GENDERS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' }
];

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    gender: '',
    password: '',        // needed for account creation
    confirmPassword: '', // for validation only
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: Call API to register user with appropriate body (exclude confirmPassword)
    // Example:
    // await profileService.register({
    //   firstName: ...,
    //   lastName: ...,
    //   email: ...,
    //   address: ...,
    //   mobile: ...,
    //   gender: ...,
    //   password: ...,
    // });

    navigate('/login');
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-card bg-white shadow p-4 p-md-5 rounded" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4 text-success">Register for GymMate</h2>
        <form onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">First Name</label>
              <input type="text" name="firstName" className="form-control" required onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Last Name</label>
              <input type="text" name="lastName" className="form-control" required onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <input type="text" name="address" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Mobile Number</label>
            <input type="text" name="mobile" pattern="^[0-9]{10,15}$" title="Enter valid mobile number" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Gender</label>
            <select name="gender" className="form-select" required onChange={handleChange} value={formData.gender}>
              <option value="">Select Gender</option>
              {GENDERS.map(g => (
                <option value={g.value} key={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" name="password" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" required onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
