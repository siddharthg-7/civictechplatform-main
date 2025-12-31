import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { auth, db } from "../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import "../../styles/pages/community.css";

const AdminPolls = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verify admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!auth.currentUser) {
        alert("Please login as admin");
        navigate("/admin/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          alert("Access denied. Admin privileges required.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/admin/login");
      }
    };

    checkAdminStatus();
  }, [navigate]);

  // Fetch all polls from Firebase
  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "communityProjects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolls(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // Delete poll (admin only)
  const deletePoll = async (pollId) => {
    if (!window.confirm("Are you sure you want to delete this poll?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "communityProjects", pollId));
      alert("Poll deleted successfully ✅");
    } catch (error) {
      console.error("Error deleting poll:", error);
      alert("Failed to delete poll");
    }
  };

  if (!isAdmin) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Verifying admin access...
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <AdminNavbar />

      <div className="dashboard-body">
        <AdminSidebar />

        <main className="dashboard-content">
          <div className="community-container">
            <header className="page-header">
              <h2 className="page-title">Community Polls Management</h2>
              <p className="page-subtitle">
                View and manage all community polls. As an admin, you can delete any poll.
              </p>
            </header>

            {loading ? (
              <p className="empty-text">Loading polls...</p>
            ) : polls.length === 0 ? (
              <p className="empty-text">No community polls available.</p>
            ) : (
              <div className="polls-grid">
                {polls.map((poll) => (
                  <div key={poll.id} className="poll-card">
                    <span className="poll-location">📍 {poll.category}</span>
                    <h3>{poll.title}</h3>
                    <p>{poll.description}</p>

                    <div className="poll-stats" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                        👍 Likes: <strong>{poll.likes || 0}</strong>
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                        👎 Dislikes: <strong>{poll.dislikes || 0}</strong>
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                        🗳️ Total Votes: <strong>{(poll.voters?.length || 0)}</strong>
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '0.85rem', color: '#666' }}>
                        Created: {poll.createdAt ? new Date(poll.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>

                    <button
                      className="danger-btn"
                      onClick={() => deletePoll(poll.id)}
                      style={{
                        marginTop: '15px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '500'
                      }}
                    >
                      🗑️ Delete Poll
                    </button>
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

export default AdminPolls;
