import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './LoginPage.css';
import { loginUser } from "../../services/authService";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
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
        navigate("/user/membership", { state: { fromLogin: true } });
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
          New to GymMate?
          {" "}
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
