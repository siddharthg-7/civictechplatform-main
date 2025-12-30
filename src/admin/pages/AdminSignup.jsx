import { useState } from "react";
import "../../styles/pages/auth.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";
import passwordIcon from "../../assets/images/icons/password.png";
import loginIcon from "../../assets/images/icons/login.png";

import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ADMIN_EMAILS } from "../../constants/adminEmails";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!ADMIN_EMAILS.includes(email)) {
      alert("You are not authorized to create an Admin account.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Save to users collection with role 'admin'
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "admin",
        createdAt: new Date().toISOString(),
      });

      alert("Admin account created successfully ✅");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Signup failed: ${error.message}`);
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
          <button className="auth-btn" onClick={handleSignup} disabled={loading}>
            <img src={loginIcon} alt="signup" />
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Links */}
          <div className="auth-links">
            <p>
              Already an admin?{" "}
              <Link to="/admin/login">Login</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
