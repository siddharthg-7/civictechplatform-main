import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../../styles/layout/sidebar.css";
import "../../styles/pages/dashboard.css";
import "../styles/admin.css";

import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaBell,
  FaMapMarkerAlt,
  FaUserCircle,
  FaRegClipboard,
} from "react-icons/fa";

import { auth, db } from "../../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import { COMPLAINT_STEPS } from "../../constants/complaintStatus";
import ComplaintChat from "../../components/ComplaintChat";

/* ── Safely convert Firestore Timestamp or ISO string → display string ── */
const formatDate = (raw) => {
  if (!raw) return "";
  try {
    // Firestore Timestamp object
    if (raw?.toDate) return raw.toDate().toLocaleDateString();
    // Firestore Timestamp plain object {seconds, nanoseconds}
    if (raw?.seconds) return new Date(raw.seconds * 1000).toLocaleDateString();
    // ISO string or numeric timestamp
    const d = new Date(raw);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
  } catch (_) {
    return "";
  }
};

/* Status badge colors */
const STATUS_COLORS = {
  Submitted: { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  Assigned: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "In Progress": { bg: "#fef3c7", color: "#b45309", border: "#fde68a" },
  "Awaiting Approval": { bg: "#f3e8ff", color: "#7c3aed", border: "#d8b4fe" },
  Resolved: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_COLORS[status] || { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
  return (
    <span
      style={{
        display: "inline-block",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: "9999px",
        padding: "0.15rem 0.65rem",
        fontSize: "0.68rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        position: "absolute",
        top: "0.75rem",
        right: "0.75rem",
      }}
    >
      {status}
    </span>
  );
};

const AdminComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [loading, setLoading] = useState(true);
  const [adminRole, setAdminRole] = useState("admin");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    const fetchRole = async () => {
      if (auth.currentUser) {
        const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (snap.exists()) setAdminRole(snap.data().role || "admin");
      }
    };
    fetchRole();

    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setComplaints(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const ref = doc(db, "complaints", id);
      const snap = await getDoc(ref);
      let history = snap.exists() ? snap.data().statusHistory || [] : [];
      if (history.length > 0 && history[history.length - 1].status === newStatus) return;
      const newItem = {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        updatedBy: adminRole === "gov_admin" ? "Government Authority" : "Admin",
      };
      await updateDoc(ref, {
        status: newStatus,
        statusHistory: [...history, newItem],
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  const STATUS_TABS = ["All Statuses", "Submitted", "Assigned to Dept", "In Progress", "Resolved"];

  const filtered = complaints.filter((c) => {
    const matchSearch =
      (c.problemType || "").toLowerCase().includes(search.toLowerCase()) ||
      `${c.state} ${c.district} ${c.municipality}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Statuses" || c.status === statusFilter ||
      (statusFilter === "Assigned to Dept" && c.status === "Assigned");
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const admin = auth.currentUser;
  const displayName = admin?.displayName || "Admin";

  return (
    <div className="app-shell">
      <AdminSidebar />

      <div className="app-main">
        {/* ── Top bar ── */}
        <header className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Manage Complaints
            </h2>
            <span
              style={{
                background: "#eff6ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
                borderRadius: "9999px",
                padding: "0.15rem 0.65rem",
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              {filtered.length} Pending
            </span>
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon-btn"><FaBell size={15} /><span className="topbar-notif-dot" /></button>
            <button className="topbar-icon-btn" onClick={() => navigate("/help")} aria-label="Help">?</button>
            <div className="topbar-user" onClick={() => navigate("/admin/account")}>
              <div style={{ width: "2.1rem", height: "2.1rem", borderRadius: "9999px", background: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          {/* Search + Actions */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <div className="topbar-search" style={{ flex: 1 }}>
              <FaSearch color="#94a3b8" size={13} />
              <input
                type="text"
                placeholder="Search complaints by area, title, or complaint ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <button className="btn-ghost"><FaFilter size={13} /> Filter</button>
            <button className="btn-primary" onClick={() => navigate("/raise-complaint")}>
              <FaPlus size={12} /> Log New
            </button>
          </div>

          {/* Status tabs */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setStatusFilter(tab); setPage(1); }}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: statusFilter === tab ? "#1e3b8a" : "#fff",
                  color: statusFilter === tab ? "#fff" : "#475569",
                  borderColor: statusFilter === tab ? "#1e3b8a" : "#e2e8f0",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Complaint cards grid */}
          {loading ? (
            <p style={{ color: "#94a3b8", textAlign: "center", padding: "3rem" }}>Loading complaints…</p>
          ) : paged.length === 0 ? (
            <p style={{ color: "#94a3b8", textAlign: "center", padding: "3rem" }}>No complaints found.</p>
          ) : (
            <div className="admin-complaints-grid">
              {paged.map((c) => (
                <div key={c.id} className="admin-complaint-card" style={{ borderRadius: "0.75rem", overflow: "hidden", background: "#fff", border: "1px solid #e2e8f0" }}>
                  {/* Image or colour block */}
                  <div style={{ position: "relative", height: "9rem", background: "#f1f5f9", overflow: "hidden" }}>
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt={c.problemType} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#dbeafe,#eff6ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaRegClipboard size={32} color="#93c5fd" />
                      </div>
                    )}
                    <StatusBadge status={c.status || "Submitted"} />
                  </div>

                  {/* Body */}
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>
                      {c.problemType}
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "#64748b", marginBottom: "0.65rem" }}>
                      <FaMapMarkerAlt size={11} />
                      <span>{c.district} · {c.municipality}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "9999px", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: "#475569" }}>
                          {(c.userName || "U").charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: "0.8rem", color: "#475569" }}>{c.userName || "Unknown"}</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                        {formatDate(c.createdAt)}
                      </span>
                    </div>

                    {/* Status select + chat */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <select
                        value={c.status || "Submitted"}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        style={{ flex: 1, padding: "0.42rem 0.65rem", borderRadius: "0.4rem", border: "1px solid #e2e8f0", fontSize: "0.8rem", background: "#f8fafc", color: "#334155", outline: "none", cursor: "pointer" }}
                      >
                        {COMPLAINT_STEPS.map((step) => (
                          <option
                            key={step.id}
                            value={step.id}
                            disabled={
                              (adminRole === "admin" && step.role === "gov_admin") ||
                              (adminRole === "gov_admin" && step.role !== "gov_admin")
                            }
                          >
                            {step.label}
                          </option>
                        ))}
                      </select>
                      <ComplaintChat complaintId={c.id} role={adminRole} />
                    </div>

                    <button
                      style={{ width: "100%", padding: "0.55rem", border: "1px solid #e2e8f0", borderRadius: "0.5rem", background: "#f8fafc", color: "#475569", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}
                    >
                      View Discussion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", fontSize: "0.82rem", color: "#64748b" }}>
              <span>Showing {(page - 1) * PER_PAGE + 1} to {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} complaints</span>
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} style={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#475569" }}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)} style={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", border: "1px solid", cursor: "pointer", background: page === n ? "#1e3b8a" : "#fff", color: page === n ? "#fff" : "#475569", borderColor: page === n ? "#1e3b8a" : "#e2e8f0", fontWeight: page === n ? 700 : 400 }}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} style={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#475569" }}>›</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};


export default AdminComplaints;
