import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { auth, db } from "../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import "../../styles/pages/community.css";
import DiscussionChat from "../../components/DiscussionChat";
import { useTranslation } from "react-i18next";

const AdminPolls = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verify admin status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        alert("Please login as admin");
        navigate("/admin/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          alert("Access denied. Admin privileges required.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        alert("Error verifying admin status");
        navigate("/admin/login");
      }
    });

    return () => unsubscribe();
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
      alert("Poll deleted successfully");
    } catch (error) {
      console.error("Error deleting poll:", error);
      alert("Failed to delete poll");
    }
  };

  if (!isAdmin) {
    return (
      <div className="empty-text">
        {t('verifyingAccess')}
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
              <h2 className="page-title">{t('communityPolls')}</h2>
              <p className="page-subtitle">
                {t('managePollsSubtitle')}
              </p>
            </header>

            {loading ? (
              <p className="empty-text">{t('loadingPolls')}</p>
            ) : polls.length === 0 ? (
              <p className="empty-text">{t('noPollsAvailable')}</p>
            ) : (
              <div className="polls-grid">
                {polls.map((poll) => (
                  <div key={poll.id} className="poll-card">
                    <span className="poll-location">{poll.category}</span>
                    <h3>{poll.title}</h3>
                    <p>{poll.description}</p>

                    <div className="poll-stats" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>
                        {t('likes')}: <strong>{poll.likes || 0}</strong>
                      </p>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>
                        {t('dislikes')}: <strong>{poll.dislikes || 0}</strong>
                      </p>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>
                        {t('totalVotes')}: <strong>{(poll.voters?.length || 0)}</strong>
                      </p>
                    </div>

                    <DiscussionChat
                      contextId={poll.id}
                      collectionName="communityProjects"
                      role={isAdmin ? 'admin' : 'user'} // Inherit role from page state
                    />

                    <button
                      className="danger-btn"
                      onClick={() => deletePoll(poll.id)}
                    >
                      {t('deletePoll')}
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
