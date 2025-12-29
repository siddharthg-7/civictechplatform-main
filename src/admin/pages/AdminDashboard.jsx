import { useEffect, useState } from "react";
import "../../styles/pages/dashboard.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


/* Advertisements (same logic as user dashboard) */
import ad1 from "../../assets/images/advertisement/civictech.png";
import ad2 from "../../assets/images/advertisement/extra.png";
import ad3 from "../../assets/images/advertisement/programs.png";
import ad4 from "../../assets/images/advertisement/sustain.png";

import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ads = [ad1, ad2, ad3, ad4];

const AdminDashboard = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
      {/* ADMIN NAVBAR */}
      <Navbar role="admin" />

      <div className="dashboard-body">
        {/* SIDEBAR (reused) */}
        <Sidebar role="admin" />


        <main className="dashboard-content">
          <div className="dashboard-inner">

            {/* ADVERTISEMENT */}
            <div className="dashboard-ad">
              <img src={ads[currentAd]} alt="Admin Advertisement" />
            </div>

            {/* DASHBOARD INFO */}
            <section className="dashboard-section">
              <h2>Welcome Admin</h2>
              <p>Monitor and manage complaints and community activity.</p>

              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <h3>{stats.total}</h3>
                  <p>Total Complaints</p>
                </div>

                <div className="dashboard-card">
                  <h3>{stats.resolved}</h3>
                  <p>Resolved Complaints</p>
                </div>

                <div className="dashboard-card">
                  <h3>{stats.pending}</h3>
                  <p>Pending Complaints</p>
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
