import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/events");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-showcase">
        <div className="brand-mark">EC</div>

        <div className="showcase-content">
          <p className="eyebrow">EVENT COUNTDOWN</p>
          <h1>Make every moment count.</h1>
          <p>
            Keep track of birthdays, trips, celebrations and every
            moment worth looking forward to.
          </p>
        </div>

        <div className="showcase-footer">
          <span>Plan.</span>
          <span>Track.</span>
          <span>Celebrate.</span>
        </div>
      </div>

      <div className="auth-section">
        <div className="auth-card">
          <div className="mobile-brand">EVENT COUNTDOWN</div>

          <div className="auth-heading">
            <p className="auth-label">WELCOME BACK</p>
            <h2>Sign in</h2>
            <p>Enter your details to continue to your events.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-button">
              Sign in
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;