import "../../styles/pages/auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";
import { TextField } from '@mui/material';

import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const AdminForgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert("Please enter admin email");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email.");
      setEmail("");
    } catch (error) {
      console.error("Reset Password Error:", error);
      alert(`Failed to send reset link: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">

          {/* Logo */}
          <div className="auth-logo">
            <img src={logo} alt="Civic Platform" />
            <h2>Reset Admin Password</h2>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Enter your admin email address to receive a password reset link.
          </p>

          {/* Email */}
          <div className="form-group">
            <TextField
              label="Admin Email"
              type="email"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="admin@civic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Button */}
          <button className="auth-btn" onClick={handleReset} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Links */}
          <div className="auth-links">
            <Link to="/admin/login">&larr; Back to Admin Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminForgot;
