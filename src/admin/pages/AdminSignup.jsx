import { useState } from "react";
import "../../styles/components/forms.css"; // shared form styles
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";

import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ADMIN_EMAILS } from "../../constants/adminEmails";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isGovSignup = searchParams.get("role") === "gov";

  const [name, setName] = useState(isGovSignup ? "Government Official" : "");
  const [email, setEmail] = useState(isGovSignup ? "government@gmail.com" : "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (!ADMIN_EMAILS.includes(email)) {
      alert("This email is not authorized for admin access.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const role = isGovSignup ? "gov_admin" : "admin";

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role: role,
        createdAt: new Date().toISOString(),
      });
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
          <div className="auth-logo">
            <img src={logo} alt="Civic Platform" />
            <h2>Create Admin Account</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="admin@civic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="primary-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div className="auth-links">
            <p>
              Already an admin? <Link to="/admin/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
