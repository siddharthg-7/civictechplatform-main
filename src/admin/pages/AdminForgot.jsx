import "../../styles/pages/auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";

const AdminForgot= () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter admin email");
      return;
    }

    alert("Reset link sent to admin email");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">

          {/* Logo */}
          <div className="auth-logo">
            <img src={logo} alt="Civic Logo" />
            <h2>Admin Reset Password</h2>
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

          {/* Button */}
          <button className="auth-btn" onClick={handleReset}>
            Send Reset Link
          </button>

          {/* Links */}
          <div className="auth-links">
            <Link to="/admin/login">Back to Admin Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminForgot;
