import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc, arrayUnion, query, orderBy } from "firebase/firestore";
import "../styles/pages/community.css";

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
              <h2 className="page-title">Community Polls</h2>
              <p className="page-subtitle">
                Your voice matters. Vote on development projects and shape the future of our community.
              </p>
            </header>

            {loading ? (
              <p className="empty-text">Loading active polls...</p>
            ) : sortedProjects.length === 0 ? (
              <p className="empty-text">No community polls available right now.</p>
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

                      {isVoted && (
                        <p className="voted-text">✔ You've cast your vote</p>
                      )}
                      {!auth.currentUser && (
                        <p className="empty-text" style={{ fontSize: '0.8rem', padding: '0.5rem' }}>Login to participate</p>
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
