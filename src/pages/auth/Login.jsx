import "../../styles/pages/auth.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ADMIN_EMAILS } from "../../constants/adminEmails";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter your email and password");
      return;
    }

    // Special check for Admin Login
    if (isAdmin && !ADMIN_EMAILS.includes(username)) {
      alert("This account does not have Admin privileges.");
      return;
    }

    setLoading(true);
    console.log("Attempting login for:", username);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log("Login successful:", userCredential.user.uid);

      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error details:", error);
      alert(`Invalid credentials or server error.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Logo */}
        <div className="auth-logo">
          <img src={logo} alt="Civic Platform" />
          <h2>{isAdmin ? t('adminPortal') : t('signInTitle')}</h2>
        </div>

        <div className="auth-form">
          {/* Username */}
          <div className="form-group">
            <TextField
              label={t('emailLabel')}
              type="email"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="name@company.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <TextField
              label={t('passwordLabel')}
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? t('signingIn') : t('signInButton')}
          </button>

          {/* Links */}
          <div className="auth-links">
            {!isAdmin ? (
              <>
                <p>
                  {t('newHere')} <Link to="/signup">{t('createAccount')}</Link>
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('forgotPassword')}</Link>
                </div>

                <div className="auth-divider"></div>

                <p>
                  <span
                    style={{ cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}
                    onClick={() => setIsAdmin(true)}
                  >
                    {t('loginAsAdmin')}
                  </span>
                </p>
              </>
            ) : (
              <>
                <Link to="/admin/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {t('forgotPassword')}
                </Link>

                <div className="auth-divider"></div>

                <p>
                  <span
                    style={{ cursor: "pointer", color: "var(--primary)" }}
                    onClick={() => setIsAdmin(false)}
                  >
                    &larr; {t('backToUserLogin')}
                  </span>
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
