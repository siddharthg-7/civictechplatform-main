import "../../styles/pages/auth.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";
import passwordIcon from "../../assets/images/icons/password.png";
import loginIcon from "../../assets/images/icons/login.png";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ADMIN_EMAILS } from "../../constants/adminEmails";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter admin credentials");
      return;
    }

    if (!ADMIN_EMAILS.includes(email)) {
      alert("This email is not authorized as an Admin.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Admin login successful ✅");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin Login error:", error);
      alert(`Admin Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">

          <div className="auth-logo">
            <img src={logo} alt="Civic Logo" />
            <h2>Admin Login</h2>
          </div>

          <div className="input-group">
            <img src={userIcon} alt="email" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <img src={passwordIcon} alt="password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            <img src={loginIcon} alt="login" />
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-links">
            <Link to="/admin/forgot">Forgot Password?</Link>

            <p>
              New admin? <Link to="/admin/signup">Create Admin Account</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
