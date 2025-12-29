import "../../styles/pages/auth.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import loginIcon from "../../assets/images/icons/login.png";
import userIcon from "../../assets/images/icons/user.png";
import passwordIcon from "../../assets/images/icons/password.png";
import { useState } from "react";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter Email/Phone and Password");
      return;
    }

    setLoading(true);
    console.log("Attempting login for:", username);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log("Login successful:", userCredential.user.uid);

      if (isAdmin) {
        alert("Admin login successful ✅");
        navigate("/admin/dashboard");
      } else {
        alert("Login successful ✅");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error details:", error);
      alert(`Login failed: ${error.message}`);
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
            <img src={logo} alt="Civic Logo" />
            <h2>{isAdmin ? "Admin Portal" : "Civic Platform"}</h2>
          </div>

          {/* Username */}
          <div className="input-group">
            <img src={userIcon} alt="user" />
            <input
              type="text"
              placeholder={isAdmin ? "Admin Email" : "Email or PhoneNumber"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <img src={passwordIcon} alt="password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            <img src={loginIcon} alt="login" className="btn-icon" />
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Links */}
          <div className="auth-links">
            {!isAdmin ? (
              <>
                <p>
                  Don't have an account? <Link to="/signup">Signup</Link>
                </p>
                <Link to="/forgot-password">Forgot Password?</Link>

                <p style={{ marginTop: "10px" }}>
                  <span
                    style={{ cursor: "pointer", color: "#2563eb" }}
                    onClick={() => setIsAdmin(true)}
                  >
                    Login as Admin
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  New Admin? <Link to="/admin/signup">Admin Signup</Link>
                </p>
                <Link to="/admin/forgot-password">
                  Forgot Admin Password?
                </Link>

                <p style={{ marginTop: "10px" }}>
                  <span
                    style={{ cursor: "pointer", color: "#2563eb" }}
                    onClick={() => setIsAdmin(false)}
                  >
                    Back to User Login
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
