import "../../styles/pages/auth.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";
import passwordIcon from "../../assets/images/icons/password.png";
import loginIcon from "../../assets/images/icons/login.png";
import { useState } from "react";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Admin account created");

    // ✅ FIX: go to ADMIN login, not user login
    navigate("/admin/login");

  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">

          {/* Logo */}
          <div className="auth-logo">
            <img src={logo} alt="Civic Logo" />
            <h2>Admin Signup</h2>
          </div>

          {/* Name */}
          <div className="input-group">
            <img src={userIcon} alt="name" />
            <input
              type="text"
              placeholder="Admin Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <img src={userIcon} alt="email" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Button */}
          <button className="auth-btn" onClick={handleSignup}>
            <img src={loginIcon} alt="signup" />
            Create Account
          </button>

          {/* Links */}
          <div className="auth-links">
            <p>
              Already an admin?{" "}
              {/* ✅ FIX */}
              <Link to="/admin/login">Login</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
