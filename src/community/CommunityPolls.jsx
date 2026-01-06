import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc, arrayUnion, query, orderBy, deleteDoc, getDoc } from "firebase/firestore";
import "../styles/pages/community.css";
import DiscussionChat from "../components/DiscussionChat";
import { useTranslation } from "react-i18next";

/* ---------- DEVICE ID ---------- */
const getDeviceId = () => {
  let id = localStorage.getItem("deviceId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("deviceId", id);
  }
  return id;
};

const CommunityPolls = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useTranslation();

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().role === "admin");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "communityProjects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ---------- VOTE HANDLER ---------- */
  const vote = async (id, type) => {
    if (!auth.currentUser) {
      alert("Please login to vote");
      return;
    }

    const project = projects.find((p) => p.id === id);
    if (project.voters?.includes(auth.currentUser.uid)) {
      alert("You already voted on this poll");
      return;
    }

    try {
      const docRef = doc(db, "communityProjects", id);
      await updateDoc(docRef, {
        [type === "like" ? "likes" : "dislikes"]: (project[type === "like" ? "likes" : "dislikes"] || 0) + 1,
        voters: arrayUnion(auth.currentUser.uid),
      });
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to register vote");
    }
  };

  /* ---------- DELETE HANDLER (ADMIN OR OWNER) ---------- */
  const deletePoll = async (pollId, pollAuthorId) => {
    if (!auth.currentUser) {
      alert("Please login to delete");
      return;
    }

    // Check if user is admin or poll owner
    const canDelete = isAdmin || auth.currentUser.uid === pollAuthorId;

    if (!canDelete) {
      alert("You don't have permission to delete this poll");
      return;
    }

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

  /* ---------- SORT (LIKES ↑, DISLIKES ↓) ---------- */
  const sortedProjects = [...projects].sort(
    (a, b) =>
      (b.likes || 0) - (b.dislikes || 0) -
      ((a.likes || 0) - (a.dislikes || 0))
  );

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="community-container">
            <header className="page-header">
              <h2 className="page-title">{t('communityPolls')}</h2>
              <p className="page-subtitle">
                {t('communityPollsSubtitle')}
              </p>
            </header>

            {loading ? (
              <p className="empty-text">{t('loadingPolls')}</p>
            ) : sortedProjects.length === 0 ? (
              <p className="empty-text">{t('noPollsAvailable')}</p>
            ) : (
              <div className="polls-grid">
                {sortedProjects.map((p) => {
                  const isVoted = auth.currentUser && p.voters?.includes(auth.currentUser.uid);

                  return (
                    <div key={p.id} className="poll-card">
                      <span className="poll-location">📍 {p.category}</span>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>

                      <div className="poll-actions">
                        <button
                          className="like-btn"
                          onClick={() => vote(p.id, "like")}
                          disabled={isVoted || !auth.currentUser}
                        >
                          👍 {p.likes || 0}
                        </button>

                        <button
                          className="dislike-btn"
                          onClick={() => vote(p.id, "dislike")}
                          disabled={isVoted || !auth.currentUser}
                        >
                          👎 {p.dislikes || 0}
                        </button>
                      </div>

                      <DiscussionChat
                        contextId={p.id}
                        collectionName="communityProjects"
                        role={isAdmin ? 'admin' : 'user'} // Simplified role check for standard user view
                      />

                      {isVoted && (
                        <p className="voted-text">✔ {t('votedText')}</p>
                      )}
                      {!auth.currentUser && (
                        <p className="empty-text" style={{ fontSize: '0.8rem', padding: '0.5rem' }}>{t('loginToParticipate')}</p>
                      )}

                      {/* DELETE BUTTON (ADMIN OR OWNER) */}
                      {auth.currentUser && (isAdmin || auth.currentUser.uid === p.authorId) && (
                        <button
                          className="danger-btn"
                          onClick={() => deletePoll(p.id, p.authorId)}
                          style={{
                            marginTop: '10px',
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          🗑️ {t('deletePoll')}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPolls;
