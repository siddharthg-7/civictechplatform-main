import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

import "../styles/admin.css";

import locationIcon from "../../assets/images/icons/location.png";
import userIcon from "../../assets/images/icons/user.png";

import { auth, db } from "../../firebase";
import { collection, onSnapshot, doc, updateDoc, orderBy, query, getDoc } from "firebase/firestore";
import ComplaintTracker from "../../components/ComplaintTracker";
import ComplaintChat from "../../components/ComplaintChat";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [adminRole, setAdminRole] = useState('admin');

  useEffect(() => {
    const fetchRole = async () => {
      if (auth.currentUser) {
        const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (snap.exists()) setAdminRole(snap.data().role || 'admin');
      }
    };
    fetchRole();

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

  const updateStatus = async (id, newStatus) => {
    try {
      const complaintRef = doc(db, "complaints", id);
      const complaintSnap = await getDoc(complaintRef);

      let history = [];
      if (complaintSnap.exists()) {
        history = complaintSnap.data().statusHistory || [];
      }

      // Add new history item
      const newHistoryItem = {
        status: newStatus,
        updatedAt: new Date().toISOString(), // Use ISO for consistency or serverTimestamp() if preferred
        updatedBy: adminRole === 'gov_admin' ? 'Government Authority' : 'Admin'
      };

      // Safety check: Don't allow duplicates if UI lagged
      if (history.length > 0 && history[history.length - 1].status === newStatus) return;

      const updatedHistory = [...history, newHistoryItem];

      await updateDoc(complaintRef, {
        status: newStatus,
        statusHistory: updatedHistory,
        updatedAt: new Date().toISOString()
      });

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
      <AdminNavbar />

      <div className="dashboard-body">
        <AdminSidebar />

        <main className="dashboard-content">
          <div className="dashboard-inner">
            <h2 className="admin-title">Manage Complaints</h2>

            {/* SEARCH */}
            <input
              className="admin-search"
              placeholder="Search by area or complaint title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* COMPLAINT LIST */}
            <div className="admin-complaints-grid">
              {loading ? (
                <p className="empty-text">Loading complaints...</p>
              ) : filteredComplaints.length === 0 ? (
                <p className="empty-text">No complaints found.</p>
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
                          <strong>User:</strong> {c.userName}
                        </span>
                      </div>

                      {/* STATUS TRACKER */}
                      <div className="admin-tracker-row">
                        <ComplaintTracker
                          complaint={c}
                          onStatusChange={(newStatus) => updateStatus(c.id, newStatus)}
                          role={adminRole}
                        />

                        <ComplaintChat complaintId={c.id} role={adminRole} />
                      </div>
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
