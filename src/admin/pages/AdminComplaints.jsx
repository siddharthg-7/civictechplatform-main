import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "../styles/admin.css";

import locationIcon from "../../assets/images/icons/location.png";
import userIcon from "../../assets/images/icons/user.png";
import resolvedIcon from "../../assets/images/icons/resolved.png";

import { db } from "../../firebase";
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from "firebase/firestore";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
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

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Resolved" ? "Pending" : "Resolved";
    try {
      await updateDoc(doc(db, "complaints", id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      (c.problemType || "").toLowerCase().includes(search.toLowerCase()) ||
      `${c.state} ${c.district} ${c.municipality}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <Navbar role="admin" />

      <div className="dashboard-body">
        <Sidebar role="admin" />

        <main className="dashboard-content">
          <div className="dashboard-inner">

            {/* SEARCH */}
            <input
              className="admin-search"
              placeholder="Search by area / complaint title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* COMPLAINT LIST */}
            <div className="admin-complaints-grid">
              {loading ? (
                <p>Loading complaints...</p>
              ) : filteredComplaints.length === 0 ? (
                <p>No complaints found.</p>
              ) : (
                filteredComplaints.map((c) => (
                  <div key={c.id} className="admin-complaint-card">
                    <div className="admin-complaint-header">
                      <h3>{c.problemType}</h3>
                      <p>{c.description}</p>
                    </div>

                    <div className="admin-complaint-body">
                      {/* LOCATION */}
                      <div className="admin-row">
                        <img src={locationIcon} alt="loc" className="admin-location-icon" />
                        <span>
                          <strong>Location:</strong> {c.state}, {c.district}, {c.municipality}
                        </span>
                      </div>

                      {/* USER */}
                      <div className="admin-row">
                        <img src={userIcon} alt="user" className="admin-user-icon" />
                        <span>
                          <strong>User:</strong> {c.userName} ({c.userEmail})
                        </span>
                      </div>

                      {/* STATUS */}
                      <div className="admin-row">
                        <span
                          className={`resolved-badge ${c.status === "Pending" ? "pending" : ""}`}
                          style={{
                            color: c.status === "Pending" ? "var(--danger)" : "var(--secondary)",
                            background: c.status === "Pending" ? "#fee2e2" : "var(--primary-light)"
                          }}
                        >
                          {c.status}
                        </span>
                      </div>

                      <button
                        className="resolve-btn"
                        onClick={() => toggleStatus(c.id, c.status)}
                      >
                        Mark as {c.status === "Resolved" ? "Pending" : "Resolved"}
                      </button>
                    </div>
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

export default AdminComplaints;
