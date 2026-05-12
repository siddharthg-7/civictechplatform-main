import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/dashboard.css";
import "../../styles/layout/sidebar.css";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

import Sidebar from "../../components/Sidebar";

import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import {
  FaSearch,
  FaBell,
  FaRegClipboard,
  FaCheckDouble,
  FaExclamationCircle,
  FaArrowRight,
  FaBullhorn,
  FaWifi,
} from "react-icons/fa";

/* Static announcements — replace with Firestore if available */
const ANNOUNCEMENTS = [
  {
    id: 1,
    icon: <FaBullhorn />,
    title: "New Telecom Regulations Effective Next Month",
    desc: "Updated guidelines for fiber optic installations in residential areas.",
    time: "2h ago",
  },
  {
    id: 2,
    icon: <FaWifi />,
    title: "Smart City Infrastructure Update",
    desc: "Public park Wi-Fi rollout scheduled for Phase 2 completion.",
    time: "Yesterday",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [searchText, setSearchText] = useState("");

  /* ── Real-time complaint stats ── */
  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "complaints"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => d.data());
      setStats({
        total: all.length,
        resolved: all.filter((c) => c.status === "Resolved").length,
        pending: all.filter(
          (c) => c.status !== "Resolved" && c.status !== undefined
        ).length,
      });
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    gsap.from(".stat-card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".dash-hero", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    gsap.from(".announce-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  const user = auth.currentUser;
  const displayName = user?.displayName || "Citizen";

  return (
    <div className="app-shell">
      <Sidebar role="user" />

      <div className="app-main">
        {/* ── Top bar ── */}
        <header className="topbar">
          <div className="topbar-search">
            <FaSearch color="#94a3b8" size={13} />
            <input
              type="text"
              placeholder="Search for applications, services or records..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon-btn" aria-label="Notifications">
              <FaBell size={15} />
              <span className="topbar-notif-dot" />
            </button>

            <div
              className="topbar-user"
              onClick={() => navigate("/about/account")}
            >
              <div
                style={{
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "9999px",
                  background: "#1e3b8a",
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
                <span className="topbar-user-role">Verified Citizen</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="page-content">
          {/* Header */}
          <div className="page-header">
            <div className="page-header-left">
              <h1>{t("welcomeToDashboard")}</h1>
              <p>Your central hub for citizen engagement and community updates.</p>
            </div>
          </div>

          {/* ── Hero Banner ── */}
          <div className="dash-hero">
            <img
              className="dash-hero-img"
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop&q=60"
              alt="Civic initiative"
            />
            <div className="dash-hero-content">
              <div className="dash-hero-badge">Open Initiative</div>
              <h2 className="dash-hero-title">Civic Tech Innovation Challenge</h2>
              <p className="dash-hero-desc">
                Join our latest initiative to build smarter cities. Applications
                open until end of month. Help us design the future of urban living.
              </p>
            </div>
            <button
              className="dash-hero-action"
              onClick={() => navigate("/community")}
            >
              Learn More <FaArrowRight size={13} />
            </button>
          </div>

          {/* ── Stat Cards ── */}
          <div className="stat-cards">
            {/* Total */}
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-card-icon stat-card-icon--blue">
                  <FaRegClipboard size={17} />
                </div>
                <span className="stat-card-label">Active Status</span>
              </div>
              <div className="stat-card-value">{stats.total}</div>
              <div className="stat-card-sub">
                Total Complaints
              </div>
            </div>

            {/* Resolved */}
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-card-icon stat-card-icon--green">
                  <FaCheckDouble size={17} />
                </div>
                <span className="stat-card-label">Fulfillment</span>
              </div>
              <div className="stat-card-value">{stats.resolved}</div>
              <div className="stat-card-sub">
                Resolved Complaints
              </div>
            </div>

            {/* Pending */}
            <div className="stat-card stat-card--pending">
              <div className="stat-card-top">
                <div className="stat-card-icon stat-card-icon--amber">
                  <FaExclamationCircle size={17} />
                </div>
                <span className="stat-card-label">Action Required</span>
              </div>
              <div className="stat-card-value">{stats.pending}</div>
              <div className="stat-card-sub">
                Pending Complaints{" "}
                <span className="stat-card-sub--chip">In Progress</span>
              </div>
            </div>
          </div>

          {/* ── Announcements ── */}
          <div className="announce-section">
            <div className="announce-header">
              <span className="announce-title">Platform Announcements</span>
              <button className="announce-view-all" onClick={() => navigate("/help")}>
                View All
              </button>
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

export default Dashboard;
