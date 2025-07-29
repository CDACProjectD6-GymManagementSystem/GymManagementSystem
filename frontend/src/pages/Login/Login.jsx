import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';
import { loginUser } from '../../services/authService'; // Backend login API

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Hardcoded staff accounts (handled without backend)
  const staff = [
    { email: 'alice.gym@example.com', password: 'secureHash1', path: '/trainer-dashboard' },
    { email: 'admin@gymmate.com', password: 'admin123', path: '/admin-dashboard' },
    { email: 'reception@gymmate.com', password: 'reception123', path: '/reception-dashboard' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Staff login: check locally
    const foundStaff = staff.find(
      (u) => u.email === email && u.password === password
    );
    if (foundStaff) {
      navigate(foundStaff.path);
      return;
    }

    // 2. User (member) login: check with backend + store info
    try {
      const user = await loginUser(email, password); // Expects {id, firstName, email}
      // Store user info in localStorage for use in other pages
      localStorage.setItem('gymmateUserId', user.id);
      localStorage.setItem('gymmateUserFirstName', user.firstName);
      localStorage.setItem('gymmateUserEmail', user.email);
      // Redirect to /user (your user dashboard root)
      navigate('/user');
    } catch (err) {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-card p-5 bg-white shadow rounded">
        <h2 className="text-center mb-4 text-primary">Login to GymMate</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
        </p>
        <div className="text-center mt-2">
          <button onClick={() => navigate('/')} className="btn btn-link text-decoration-none">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
