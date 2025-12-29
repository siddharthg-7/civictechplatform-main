import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import "../../styles/pages/complaints.css";

const Resolved = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "complaints"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const total = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
  const pendingCount = complaints.filter((c) => c.status === "Pending").length;

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="complaints-container">

            <h2 className="complaints-title">
              My Complaints Status
            </h2>

            {/* STATS */}
            <div className="complaint-stats">
              <div className="stat-card">
                <h3>{total}</h3>
                <p>Total Raised</p>
              </div>

              <div className="stat-card resolved">
                <h3>{resolvedCount}</h3>
                <p>Resolved</p>
              </div>

              <div className="stat-card pending">
                <h3>{pendingCount}</h3>
                <p>Pending</p>
              </div>
            </div>

            {/* LIST */}
            <div className="complaints-list">
              {loading ? (
                <p>Loading complaints...</p>
              ) : complaints.length === 0 ? (
                <p>No complaints raised yet.</p>
              ) : (
                complaints.map((c) => (
                  <div key={c.id} className="complaint-item">
                    <h4>{c.problemType}</h4>

                    <p>
                      📍 {c.state}, {c.district}, {c.municipality}
                    </p>

                    <p>🗓 {c.createdAt?.toDate().toLocaleDateString() || "Just now"}</p>

                    <span className={`status ${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Resolved;
