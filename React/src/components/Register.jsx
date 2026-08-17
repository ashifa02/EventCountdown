import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("register/", {
        username,
        password,
      });

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-showcase">
        <div className="brand-mark">EC</div>

        <div className="showcase-content">
          <p className="eyebrow">YOUR MOMENTS, ORGANIZED</p>
          <h1>Something worth waiting for is always ahead.</h1>
          <p>
            Create your personal countdown space and keep every
            important date close.
          </p>
        </div>

        <div className="showcase-footer">
          <span>Birthdays</span>
          <span>Trips</span>
          <span>Celebrations</span>
        </div>
      </div>

      <div className="auth-section">
        <div className="auth-card">
          <div className="mobile-brand">EVENT COUNTDOWN</div>

          <div className="auth-heading">
            <p className="auth-label">GET STARTED</p>
            <h2>Create account</h2>
            <p>Set up your account and start counting down.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="auth-message">{message}</p>
            )}

            <button type="submit" className="auth-button">
              Create account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;