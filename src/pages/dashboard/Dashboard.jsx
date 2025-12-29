import { useEffect, useState } from "react";
import "../../styles/pages/dashboard.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import ad1 from "../../assets/images/advertisement/civictech.png";
import ad2 from "../../assets/images/advertisement/extra.png";
import ad3 from "../../assets/images/advertisement/programs.png";
import ad4 from "../../assets/images/advertisement/sustain.png";

import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ads = [ad1, ad2, ad3, ad4];

const Dashboard = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "complaints"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="dashboard-inner">

            {/* BIG ADVERTISEMENT */}
            <div className="dashboard-ad">
              <img src={ads[currentAd]} alt="Advertisement" />
            </div>

            <section className="dashboard-section">
              <h2>Welcome to Civic Dashboard</h2>
              <p>Raise, track, and resolve complaints efficiently.</p>

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

export default Dashboard;
