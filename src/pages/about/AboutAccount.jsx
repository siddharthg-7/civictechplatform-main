import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import "../../styles/components/forms.css";

const AboutAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
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
          setUser({
            name: userData.name || currentUser.displayName || "",
            email: userData.email || currentUser.email || "",
            mobile: userData.mobile || userData.phone || "",
          });
        } else {
          // Fallback to auth data
          setUser({
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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Please login first");
        return;
      }

      await updateDoc(doc(db, "users", currentUser.uid), {
        name: user.name,
        mobile: user.mobile,
      });

      alert("Account details updated successfully ✅");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account details");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content settings-page">
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              Loading user data...
            </div>
          ) : (
            <div className="settings-card">
              <h2>Profile Information</h2>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder=" "
                  value={user.name}
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
                  value={user.email}
                  onChange={handleChange}
                />
                <label>Email Address</label>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  placeholder=" "
                  value={user.mobile}
                  onChange={handleChange}
                />
                <label>Mobile Number</label>
              </div>

              <button className="primary-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AboutAccount;
