import "../../styles/pages/auth.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";
import passwordIcon from "../../assets/images/icons/password.png";
import loginIcon from "../../assets/images/icons/login.png";
import { TextField } from '@mui/material';
import { useState } from "react";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ADMIN_EMAILS } from "../../constants/adminEmails";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    if (!ADMIN_EMAILS.includes(email)) {
      alert("Access denied. These credentials are not authorized for admin access.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // "Heal" the account: Ensure Firestore has this user as Admin
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      const targetRole = email === "government@gmail.com" ? "gov_admin" : "admin";

      if (userSnap.exists()) {
        if (userSnap.data().role !== targetRole) {
          await updateDoc(userRef, { role: targetRole });
        }
      } else {
        // Create missing profile
        await setDoc(userRef, {
          uid: user.uid,
          name: targetRole === "gov_admin" ? "Government Authority" : "Admin User",
          email: email,
          role: targetRole,
          createdAt: new Date().toISOString(),
        });
      }

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin Login error:", error);
      alert(`Login failed: ${error.message}`);
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
            <h2>Admin Portal</h2>
          </div>

          <div className="form-group">
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Verifying..." : "Sign in to Dashboard"}
          </button>

          <div className="auth-links">
            <Link to="/admin/forgot" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Forgot password?</Link>

            <div className="auth-divider"></div>

            <p style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Not an admin? </span>
              <Link to="/">User Login</Link>
            </p>

            {/* Feature 1.1: Government Login Shortcut */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>OFFICIAL USE ONLY</p>

              <button
                className="auth-btn"
                style={{ backgroundColor: '#FF9933', border: 'none', fontSize: '0.85rem', padding: '0.5rem', marginBottom: '0.5rem' }}
                onClick={() => {
                  setEmail('government@gmail.com');
                  setPassword('gdgc@123');
                }}
              >
                Government Authority Login
              </button>

              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>First time? </span>
                <Link
                  to="/admin/signup?role=gov"
                  style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}
                >
                  Create Government Account
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
