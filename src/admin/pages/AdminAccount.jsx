import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import "../../styles/components/forms.css";

const AdminAccount = () => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
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

                    setAdmin({
                        name: userData.name || currentUser.displayName || "",
                        email: userData.email || currentUser.email || "",
                        mobile: userData.mobile || userData.phone || "",
                    });
                } else {
                    // Fallback to auth data
                    setAdmin({
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
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                alert("Please login first");
                return;
            }

            await updateDoc(doc(db, "users", currentUser.uid), {
                name: admin.name,
                mobile: admin.mobile,
            });

            alert("Admin account details updated successfully ✅");
        } catch (error) {
            console.error("Error updating admin account:", error);
            alert("Failed to update account details");
        }
    };

    return (
        <div className="dashboard-wrapper">
            <AdminNavbar />
            <div className="dashboard-body">
                <AdminSidebar />
                <main className="dashboard-content">
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            Loading admin data...
                        </div>
                    ) : (
                        <div className="settings-card">
                            <h3 className="settings-card-title">Admin Profile Information</h3>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder=" "
                                    value={admin.name}
                                    onChange={handleChange}
                                />
                                <label>Full Name</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder=" "
                                    value={admin.email}
                                    readOnly
                                    disabled
                                />
                                <label>Email Address</label>
                                <small style={{ color: "#666", fontSize: "0.85rem", marginTop: "5px", display: "block" }}>
                                    Email cannot be changed
                                </small>
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    placeholder=" "
                                    value={admin.mobile}
                                    onChange={handleChange}
                                />
                                <label>Mobile Number</label>
                            </div>

                            <button className="settings-primary" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminAccount;
