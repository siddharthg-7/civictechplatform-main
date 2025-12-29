import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "../../styles/components/forms.css";

const Settings = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Citizen User",
    email: "citizen@email.com",
    mobile: "9876543210",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated successfully ✅");
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

          {/* PROFILE */}
          <section className="settings-card">
            <h2>Profile Information</h2>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
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
        </main>
      </div>
    </div>
  );
};

export default Settings;
