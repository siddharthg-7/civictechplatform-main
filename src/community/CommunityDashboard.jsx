import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/pages/community.css";

const CommunityDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="community-container">

            <h2>Community Polling & Urban Feedback</h2>
            <p>
              Propose local projects, vote on community needs, and track
              municipality decisions.
            </p>

            <div className="community-cards">
              <div
                className="community-card"
                onClick={() => navigate("/community/propose")}
              >
                <h3>Propose a Project</h3>
                <p>Suggest small urban improvements</p>
              </div>

              <div
                className="community-card"
                onClick={() => navigate("/community/polls")}
              >
                <h3>Community Polls</h3>
                <p>Vote on proposed projects</p>
              </div>

              <div
                className="community-card"
                onClick={() => navigate("/community/decisions")}
              >
                <h3>Decision Logs</h3>
                <p>View municipality decisions</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityDashboard;
