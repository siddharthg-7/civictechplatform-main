import { useEffect, useState } from "react";
import "../styles/admin.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminPolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const storedPolls =
      JSON.parse(localStorage.getItem("communityPolls")) || [];
    setPolls(storedPolls);
  }, []);

  const deletePoll = (id) => {
    if (!window.confirm("Delete this poll?")) return;

    const updated = polls.filter((p) => p.id !== id);
    setPolls(updated);
    localStorage.setItem("communityPolls", JSON.stringify(updated));
  };

  return (
    <div className="admin-wrapper">
      <Navbar role="admin" />

      <div className="dashboard-body">
        <Sidebar role="admin" />

        {/* 🔥 THIS IS THE FIX */}
        <div className="admin-content">
          <h2>Community Polls</h2>

          {polls.length === 0 ? (
            <p style={{ marginTop: "20px" }}>
              No polls created by users yet.
            </p>
          ) : (
            polls.map((poll) => (
              <div key={poll.id} className="admin-card">
                <h3>{poll.question}</h3>

                <p>
                  👍 Likes: <b>{poll.likes}</b> &nbsp;
                  👎 Dislikes: <b>{poll.dislikes}</b>
                </p>

                <p style={{ fontSize: "14px", color: "#555" }}>
                  Created by: {poll.user?.name} ({poll.user?.email})
                </p>

                <button
                  className="danger"
                  onClick={() => deletePoll(poll.id)}
                >
                  Delete Poll
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPolls;
