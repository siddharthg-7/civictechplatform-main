import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ADMIN_EMAILS } from "../../constants/adminEmails";
import "../../styles/pages/auth.css";

/* ------------------------------------------------------------------ */
/*  Floating Label Input — Material Design style                        */
/* ------------------------------------------------------------------ */
const FloatInput = ({ id, type = "text", label, icon, value, onChange, autoComplete }) => (
  <div className="float-field">
    <input
      id={id}
      type={type}
      placeholder=" "
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
    <span className="field-icon material-symbols-outlined">{icon}</span>
    <label htmlFor={id}>{label}</label>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Login Page — unified Citizen + Admin                                */
/* ------------------------------------------------------------------ */
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Reset fields when switching modes */
  const switchMode = (adminMode) => {
    setIsAdmin(adminMode);
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter your email and password.");
      return;
    }
    if (isAdmin && !ADMIN_EMAILS.includes(username)) {
      alert("This account does not have Admin privileges.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── LEFT PANEL ── */}
      <aside className="auth-left">
        <div className="auth-brand">
          <span className="material-symbols-outlined">account_balance</span>
          <h1>Civic Platform</h1>
        </div>

        <div className="auth-hero-text">
          <h2>
            {isAdmin ? (
              <>
                Official Admin<br />
                <span>Secure Portal.</span>
              </>
            ) : (
              <>
                Empowering Citizens.<br />
                <span>Transparent Governance.</span>
              </>
            )}
          </h2>
          <p>
            {isAdmin
              ? "Access the restricted administrative portal to manage civic services, complaints, community polls, and government reports."
              : "Join over 2 million citizens participating in the digital transformation of their cities. Report issues, vote on proposals, and access public services instantly."}
          </p>
        </div>

        {/* Illustration */}
        <div className="auth-illustration">
          <img
            src={
              isAdmin
                ? "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&auto=format&fit=crop&q=80"
                : "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&auto=format&fit=crop&q=80"
            }
            alt={isAdmin ? "Government building" : "Smart city skyline"}
          />
        </div>

        <div className="auth-blob-1" />
        <div className="auth-blob-2" />
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main className="auth-right">
        <div className="auth-form-wrapper">

          {/* ── TAB SWITCHER ── */}
          <div className="auth-tab-row">
            <button
              type="button"
              className={`auth-tab${!isAdmin ? " auth-tab--active" : ""}`}
              onClick={() => switchMode(false)}
            >
              <span className="material-symbols-outlined">person</span>
              Citizen Login
            </button>
            <button
              type="button"
              className={`auth-tab${isAdmin ? " auth-tab--active auth-tab--admin" : ""}`}
              onClick={() => switchMode(true)}
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              Admin / Govt
            </button>
          </div>

          {/* ── CARD ── */}
          <div className={`auth-glass-card${isAdmin ? " auth-glass-card--admin" : ""}`}>

            {/* Admin badge */}
            {isAdmin && (
              <div className="auth-admin-badge">
                <span className="material-symbols-outlined">shield</span>
                Restricted Government Access
              </div>
            )}

            <div className="auth-card-header">
              <h3>{isAdmin ? "Admin Portal" : "Welcome Back"}</h3>
              <p>
                {isAdmin
                  ? "Enter your official credentials to access the admin dashboard."
                  : "Please enter your details to access your dashboard."}
              </p>
            </div>

            <form className="auth-form-fields" onSubmit={handleLogin}>
              {/* Email */}
              <FloatInput
                id="login-email"
                type="email"
                label={isAdmin ? "Official Email Address" : "Email Address"}
                icon={isAdmin ? "badge" : "mail"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="email"
              />

              {/* Password */}
              <div>
                <div className="field-row-header">
                  <span className="field-label-text">Password</span>
                  <Link
                    to={isAdmin ? "/admin/forgot" : "/forgot-password"}
                    className="forgot-link"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FloatInput
                  id="login-password"
                  type="password"
                  label="Password"
                  icon="lock"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {/* Remember me — only for citizen */}
              {!isAdmin && (
                <div className="auth-checkbox-row">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label htmlFor="remember">Remember me for 30 days</label>
                </div>
              )}

              {/* Submit */}
              <button
                className={`auth-btn-primary${isAdmin ? " auth-btn-primary--admin" : ""}`}
                type="submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Signing in…"
                    : isAdmin
                      ? "Access Admin Dashboard"
                      : "Login to Dashboard"}
                </span>
                {!loading && (
                  <span className="material-symbols-outlined">
                    {isAdmin ? "admin_panel_settings" : "login"}
                  </span>
                )}
              </button>
            </form>

            {/* Bottom section */}
            <div className="auth-divider-section">
              {!isAdmin ? (
                <p className="auth-alt-link">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup">Sign up for free</Link>
                </p>
              ) : (
                <p className="auth-alt-link">
                  Not an admin?{" "}
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => switchMode(false)}
                  >
                    Go to Citizen Login
                  </button>
                </p>
              )}

              {/* Admin security note */}
              {isAdmin && (
                <div className="auth-security-note">
                  <span className="material-symbols-outlined">info</span>
                  <span>
                    All admin sessions are monitored and logged for security compliance.
                  </span>
                </div>
              )}

              {/* Sign-up for admin not available */}
              {isAdmin && (
                <p className="auth-alt-link" style={{ marginTop: "0.75rem" }}>
                  Need admin access?{" "}
                  <Link to="/admin/signup" style={{ color: "#d97706" }}>
                    Request via Admin Signup
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Footer links */}
          <div className="auth-footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </div>

        {/* ── FAB ── */}
        <div className="auth-fab-group">
          <span className="auth-fab-tooltip">Need help?</span>
          <button
            type="button"
            className="auth-fab"
            aria-label="Help"
            onClick={() => navigate("/help")}
          >
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
