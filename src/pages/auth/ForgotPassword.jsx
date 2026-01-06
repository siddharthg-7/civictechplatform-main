import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo/civic-logo.png";
import { TextField } from '@mui/material';
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("A password reset link has been sent to your email.");
      navigate("/");
    } catch (error) {
      console.error("Reset password error:", error);
      alert(`Failed to send reset email: ${error.message}`);
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
            <h2>Reset your password</h2>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Email */}
          <div className="form-group">
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button className="auth-btn" onClick={handleReset} disabled={loading}>
            {loading ? "Sending link..." : "Send reset link"}
          </button>

          {/* Back Link */}
          <div className="auth-links">
            <Link to="/">&larr; Back to Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;