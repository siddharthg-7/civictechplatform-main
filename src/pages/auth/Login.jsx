import "../../styles/pages/auth.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import loginIcon from "../../assets/images/icons/login.png";
import userIcon from "../../assets/images/icons/user.png";
import passwordIcon from "../../assets/images/icons/password.png";
import { useState } from "react";
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
          <h2>{isAdmin ? "Admin Portal" : "Sign in to your account"}</h2>
        </div>

        <div className="auth-form">
          {/* Username */}
          <div className="form-group">
            <TextField
              label="Email address"
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
              label="Password"
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
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Links */}
          <div className="auth-links">
            {!isAdmin ? (
              <>
                <p>
                  New here? <Link to="/signup">Create an account</Link>
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Forgot password?</Link>
                </div>

                <div className="auth-divider"></div>

                <p>
                  <span
                    style={{ cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}
                    onClick={() => setIsAdmin(true)}
                  >
                    Log in as Administrator
                  </span>
                </p>
              </>
            ) : (
              <>
                <Link to="/admin/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Forgot password?
                </Link>

                <div className="auth-divider"></div>

                <p>
                  <span
                    style={{ cursor: "pointer", color: "var(--primary)" }}
                    onClick={() => setIsAdmin(false)}
                  >
                    &larr; Back to User Login
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
