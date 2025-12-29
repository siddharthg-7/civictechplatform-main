import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "../styles/pages/community.css";

const DecisionLogs = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "communityProjects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDecisions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="community-container">
            <header className="page-header">
              <h2 className="page-title">Decision Logs</h2>
              <p className="page-subtitle">
                Transparent records of municipality actions based on community support and voting results.
              </p>
            </header>

            {loading ? (
              <p className="empty-text">Loading official logs...</p>
            ) : decisions.length === 0 ? (
              <p className="empty-text">No official decisions recorded yet.</p>
            ) : (
              <div className="decisions-grid">
                {decisions
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .map((item) => (
                    <div className="decision-card" key={item.id}>
                      <div className="decision-info">
                        <span className="poll-location" style={{ marginBottom: '1rem' }}>{item.category}</span>
                        <h3>{item.title}</h3>

                        <div className="decision-votes">
                          <span style={{ color: '#166534' }}>👍 {item.likes || 0}</span>
                          <span style={{ color: '#991b1b' }}>👎 {item.dislikes || 0}</span>
                        </div>
                      </div>

                      <div className="decision-meta">
                        <span className="decision-status">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DecisionLogs;
