// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Login.css";
import { loginUser } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const staff = [
    { email: "alice.gym@example.com", password: "secureHash1", path: "/trainer-dashboard" },
    { email: "admin@gymmate.com", password: "admin123", path: "/admin-dashboard" },
    { email: "reception@gymmate.com", password: "reception123", path: "/reception-dashboard" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Staff login
    const foundStaff = staff.find(
      (u) => u.email === email && u.password === password
    );
    if (foundStaff) {
      navigate(foundStaff.path);
      setLoading(false);
      return;
    }

    // Member login API
    try {
      const user = await loginUser(email, password);
      // Accept either key (subscribed or isSubscribed, as from backend)
      const isSubscribed = user.isSubscribed !== undefined
        ? user.isSubscribed
        : user.subscribed;

      localStorage.setItem("gymmateUserId", user.id);
      localStorage.setItem("gymmateUserFirstName", user.firstName);
      localStorage.setItem("gymmateUserEmail", user.email);
      localStorage.setItem("gymmateUserSubscribed", String(isSubscribed));

      if (isSubscribed) {
        navigate("/user");
      } else {
        // Only pass state on login!
        navigate("/user/membership", { state: { fromLogin: true } });
      }
    } catch (err) {
      alert(err.message || "Invalid credentials!");
    } finally {
      setLoading(false);
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
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
        </p>
        <div className="text-center mt-2">
          <button onClick={() => navigate("/")} className="btn btn-link text-decoration-none">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
