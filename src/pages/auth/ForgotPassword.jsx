import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo/civic-logo.png";
import { TextField } from '@mui/material';
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
            <h2>{t('resetYourPassword')}</h2>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {t('forgotPasswordInstructions')}
          </p>

          {/* Email */}
          <div className="form-group">
            <TextField
              label={t('emailAddress')}
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
            {loading ? t('sendingLink') : t('sendResetLink')}
          </button>

          {/* Back Link */}
          <div className="auth-links">
            <Link to="/">&larr; {t('backToSignIn')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;