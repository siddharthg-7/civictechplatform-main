import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField } from '@mui/material';

import "../../styles/components/forms.css";

const AdminSettings = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    const [loading, setLoading] = useState(true);

    // Fetch admin data from Firebase
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    alert("Please login first");
                    navigate("/admin/login");
                    return;
                }

                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    // Verify this is an admin account
                    if (userData.role !== "admin") {
                        alert("Access denied. Admin privileges required.");
                        navigate("/");
                        return;
                    }

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
                console.error("Error fetching admin data:", error);
                alert("Failed to load admin data");
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
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
        navigate("/admin/forgot"); // or /admin/change-password
    };

    const handleLogoutAll = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout from all devices?"
        );
        if (confirmLogout) {
            auth.signOut();
            navigate("/admin/login");
        }
    };

    return (
        <div className="dashboard-wrapper">
            <AdminNavbar />

            <div className="dashboard-body">
                <AdminSidebar />

                <main className="dashboard-content settings-page">
                    <h1>Admin Settings</h1>
                    <p className="settings-subtitle">
                        Manage your admin account and security preferences
                    </p>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            Loading admin data...
                        </div>
                    ) : (
                        <>
                            <section className="settings-card">
                                <h2>Profile Information</h2>

                                <div className="settings-group">
                                    <TextField
                                        label="Full Name"
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={profile.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="settings-group">
                                    <TextField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={profile.email}
                                        disabled
                                        InputProps={{ readOnly: true }}
                                    />
                                    <small style={{ color: "#666", fontSize: "0.85rem", display: "block", marginTop: "5px" }}>
                                        Email cannot be changed
                                    </small>
                                </div>

                                <div className="settings-group">
                                    <TextField
                                        label="Mobile Number"
                                        name="mobile"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={profile.mobile}
                                        onChange={handleChange}
                                    />
                                </div>

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

export default AdminSettings;
