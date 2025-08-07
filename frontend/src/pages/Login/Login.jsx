import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./LoginPage.css";
import { loginUser } from "../../services/authService";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract any optional message from navigation state sent from MembershipPage
  const msg = location.state?.msg;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await loginUser(email, password);
      const token = resp.jwt;
      if (!token) throw new Error("Login failed Not able to get token from server!");

      // Saving  token for use future pages to retrieve from here.
      sessionStorage.setItem("gymmateAccessToken", token);

      // Decode the JWT for claims on-the-fly, and not storing decoded user object.
      const decoded = jwtDecode(token);
      const userRole =
        decoded.authorities && decoded.authorities.length > 0
          ? decoded.authorities[0]
          : null;

      // Routing logic based on role
      if (!userRole) {
        alert("Login Error: Role did not found in token.");
      } else if (userRole === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else if (userRole === "ROLE_TRAINER") {
        navigate("/trainer");
      } else if (userRole === "ROLE_RECEPTIONIST") {
        navigate("/reception-dashboard");
      } else if (userRole === "ROLE_USER") {
        if (decoded.isSubscribed) {
          navigate("/user");
        } else {
          navigate("/user/membership", { state: { fromLogin: true } });
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <span className="brand-highlight">GymMate</span>
          <span className="login-header-sub">Sign in to your account</span>
        </div>
        {msg && (
          <div style={{ color: "#669900", marginBottom: 12, fontWeight: 500 }}>
            {msg}
          </div>
        )}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group mb-3">
            <label className="form-label">Email address</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="email"
                className="form-control login-input"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPwd ? "text" : "password"}
                className="form-control login-input"
                autoComplete="current-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{ paddingRight: 40 }}
              />
              <button
                tabIndex={-1}
                type="button"
                className="show-pwd-btn"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn login-btn w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 login-link">
          New to GymMate?{" "}
          <Link to="/register">
            <span className="brand-link">Register here</span>
          </Link>
        </p>
        <div className="text-center mt-3">
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
