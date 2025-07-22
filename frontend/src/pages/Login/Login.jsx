import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Define credentials and their target routes
    const users = [
      { email: 'user@gymmate.com', password: 'user123', path: '/user' },
      { email: 'trainer@gymmate.com', password: 'trainer123', path: '/trainer-dashboard' },
      { email: 'admin@gymmate.com', password: 'admin123', path: '/admin-dashboard' },
      { email: 'reception@gymmate.com', password: 'reception123', path: '/reception-dashboard' },
    ];

    const found = users.find((u) => u.email === email && u.password === password);

    if (found) {
      navigate(found.path);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-card p-5 bg-white shadow rounded">
        <h2 className="text-center mb-4 text-primary">Login to GymMate</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
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
