import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    console.log('Registering:', formData);
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

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Age</label>
              <input type="number" name="age" className="form-control" required onChange={handleChange} min="13" max="80" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Gender</label>
              <select name="gender" className="form-select" required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
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
