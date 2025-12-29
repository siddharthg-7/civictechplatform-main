import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/components/forms.css";

const AboutAccount = () => {
  const [user, setUser] = useState({
    name: "Citizen User",
    email: "citizen@email.com",
    mobile: "9876543210",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Account details updated successfully ✅");
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">
          <div className="settings-card">
            <h3 className="settings-card-title">Profile Information</h3>

            <div className="settings-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="settings-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="settings-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
              />
            </div>

            <button className="settings-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutAccount;
