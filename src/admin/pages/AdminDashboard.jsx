import { useEffect, useState } from "react";
import "../../styles/pages/dashboard.css";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import ad1 from "../../assets/images/advertisement/civictech.png";
// Keeping one static image for the banner instead of a rotating ad to look more stable/pro
const bannerImage = ad1;

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const all = snapshot.docs.map((d) => d.data());
      setStats({
        total: all.length,
        resolved: all.filter((c) => c.status === "Resolved").length,
        pending: all.filter((c) => c.status === "Pending").length,
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <AdminNavbar />

      <div className="dashboard-body">
        <AdminSidebar />

        <main className="dashboard-content">
          <div className="dashboard-inner">

            {/* Banner */}
            <div className="dashboard-ad">
              <img src={bannerImage} alt="Civic Platform Overview" />
            </div>

            {/* DASHBOARD INFO */}
            <section className="dashboard-section">
              <h2>Dashboard Overview</h2>
              <p>Welcome back. Here is the latest activity summary.</p>

              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <h3>{stats.total}</h3>
                  <p>Total Complaints</p>
                </div>

                <div className="dashboard-card">
                  <h3>{stats.resolved}</h3>
                  <p>Resolved</p>
                </div>

                <div className="dashboard-card">
                  <h3>{stats.pending}</h3>
                  <p>Pending Action</p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
