import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField } from '@mui/material';

import "../../styles/components/forms.css";

const Settings = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          alert("Please login first");
          navigate("/");
          return;
        }

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile({
            name: userData.name || currentUser.displayName || "",
            email: userData.email || currentUser.email || "",
            mobile: userData.mobile || userData.phone || "",
          });
        } else {
          // Fallback to auth data
          setProfile({
            name: currentUser.displayName || "",
            email: currentUser.email || "",
            mobile: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Please login first");
        return;
      }

      await updateDoc(doc(db, "users", currentUser.uid), {
        name: profile.name,
        mobile: profile.mobile,
      });

      alert("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleChangePassword = () => {
    navigate("/forgot-password"); // or /change-password
  };

  const handleLogoutAll = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout from all devices?"
    );
    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content settings-page">
          <h1>Settings</h1>
          <p className="settings-subtitle">
            Manage your account and security preferences
          </p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              Loading user data...
            </div>
          ) : (
            <>
              {/* PROFILE */}
              <section className="settings-card">
                <h2>Profile Information</h2>

                <TextField
                  label="Full Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={profile.name}
                  onChange={handleChange}
                />

                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={profile.email}
                  onChange={handleChange}
                />

                <TextField
                  label="Mobile Number"
                  name="mobile"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={profile.mobile}
                  onChange={handleChange}
                />

                <button className="primary-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </section>

              {/* SECURITY */}
              <section className="settings-card">
                <h2>Security</h2>

                <div className="security-actions">
                  <button
                    className="secondary-btn"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>

                  <button className="danger-btn" onClick={handleLogoutAll}>
                    Logout from all devices
                  </button>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
