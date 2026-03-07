import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/dashboard.css";
import "../../styles/layout/sidebar.css";
import AdminSidebar from "../components/AdminSidebar";
import { db, auth } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  FaBell,
  FaSearch,
  FaRegClipboard,
  FaCheckDouble,
  FaExclamationCircle,
  FaArrowRight,
  FaBullhorn,
  FaUsers,
} from "react-icons/fa";

const ANNOUNCEMENTS = [
  {
    id: 1,
    icon: <FaBullhorn />,
    title: "New Complaint Management Policy",
    desc: "Updated SLA timelines take effect from next quarter.",
    time: "1h ago",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "User Growth: 500 New Registrations",
    desc: "Platform adoption increased significantly this week.",
    time: "Today",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "complaints"), (snap) => {
      const all = snap.docs.map((d) => d.data());
      setStats({
        total: all.length,
        resolved: all.filter((c) => c.status === "Resolved").length,
        pending: all.filter((c) => c.status !== "Resolved" && c.status !== undefined).length,
      });
    });
    return () => unsub();
  }, []);

  const admin = auth.currentUser;
  const displayName = admin?.displayName || "Admin";

  return (
    <div className="app-shell">
      <AdminSidebar />

      <div className="app-main">
        {/* ── Top bar ── */}
        <header className="topbar">
          <div className="topbar-search">
            <FaSearch color="#94a3b8" size={13} />
            <input type="text" placeholder="Search complaints, users or records..." readOnly />
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon-btn" aria-label="Notifications">
              <FaBell size={15} />
              <span className="topbar-notif-dot" />
            </button>

            <div className="topbar-user" onClick={() => navigate("/admin/account")}>
              <div
                style={{
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "9999px",
                  background: "#b45309",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  flexShrink: 0,
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">{displayName}</span>
                <span className="topbar-user-role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="page-content">
          <div className="page-header">
            <div className="page-header-left">
              <h1>Dashboard Overview</h1>
              <p>Welcome back. Here is the latest activity summary.</p>
            </div>
            <button className="btn-primary" onClick={() => navigate("/admin/complaints")}>
              <FaArrowRight size={13} /> View All Complaints
            </button>
          </div>

          {/* ── Hero Banner ── */}
          <div className="dash-hero" style={{ marginBottom: "1.5rem" }}>
            <img
              className="dash-hero-img"
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&auto=format&fit=crop&q=60"
              alt="Admin portal"
            />
            <div className="dash-hero-content">
              <div className="dash-hero-badge">Admin Console</div>
              <h2 className="dash-hero-title">Civic Admin Management Portal</h2>
              <p className="dash-hero-desc">
                Manage complaints, community polls, user accounts, and platform settings from one central dashboard.
              </p>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-card-icon stat-card-icon--blue">
                  <FaRegClipboard size={17} />
                </div>
                <span className="stat-card-label">Active Status</span>
              </div>
              <div className="stat-card-value">{stats.total}</div>
              <div className="stat-card-sub">Total Complaints</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-card-icon stat-card-icon--green">
                  <FaCheckDouble size={17} />
                </div>
                <span className="stat-card-label">Fulfillment</span>
              </div>
              <div className="stat-card-value">{stats.resolved}</div>
              <div className="stat-card-sub">Resolved</div>
            </div>

            <div className="stat-card stat-card--pending">
              <div className="stat-card-top">
                <div className="stat-card-icon stat-card-icon--amber">
                  <FaExclamationCircle size={17} />
                </div>
                <span className="stat-card-label">Action Required</span>
              </div>
              <div className="stat-card-value">{stats.pending}</div>
              <div className="stat-card-sub">
                Pending Action{" "}
                <span className="stat-card-sub--chip">In Progress</span>
              </div>
            </div>
          </div>

          {/* ── Announcements ── */}
          <div className="announce-section">
            <div className="announce-header">
              <span className="announce-title">Platform Announcements</span>
              <button className="announce-view-all">View All</button>
            </div>
            <div className="announce-list">
              {ANNOUNCEMENTS.map((a) => (
                <div className="announce-item" key={a.id}>
                  <div className="announce-icon-wrap">{a.icon}</div>
                  <div className="announce-body">
                    <div className="announce-item-title">{a.title}</div>
                    <div className="announce-item-desc">{a.desc}</div>
                  </div>
                  <div className="announce-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
