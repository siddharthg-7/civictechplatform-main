import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MdAssessment, MdTrendingUp, MdCheckCircle, MdPending, MdLocationOn } from "react-icons/md";
import "../../styles/pages/reports.css";

const Reports = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState({
        totalComplaints: 0,
        resolvedComplaints: 0,
        pendingComplaints: 0,
        inProgressComplaints: 0,
        resolutionRate: 0,
        avgResolutionTime: "N/A",
        complaintsByCategory: {},
        complaintsByLocation: {},
        recentActivity: []
    });

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    alert("Please login first");
                    navigate("/");
                    return;
                }

                // Fetch user's complaints
                const q = query(
                    collection(db, "complaints"),
                    where("userId", "==", currentUser.uid)
                );

                const snapshot = await getDocs(q);
                const complaints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Calculate statistics
                const total = complaints.length;
                const resolved = complaints.filter(c => c.status === "Resolved").length;
                const pending = complaints.filter(c => c.status === "Pending").length;
                const inProgress = complaints.filter(c => c.status === "In Progress").length;

                // Group by category
                const byCategory = {};
                complaints.forEach(c => {
                    const cat = c.category || "Other";
                    byCategory[cat] = (byCategory[cat] || 0) + 1;
                });

                // Group by location
                const byLocation = {};
                complaints.forEach(c => {
                    const loc = c.state || "Unknown";
                    byLocation[loc] = (byLocation[loc] || 0) + 1;
                });

                // Get recent activity (last 5 complaints)
                const recent = complaints
                    .sort((a, b) => {
                        const dateA = a.createdAt?.toDate?.() || new Date(0);
                        const dateB = b.createdAt?.toDate?.() || new Date(0);
                        return dateB - dateA;
                    })
                    .slice(0, 5);

                setReportData({
                    totalComplaints: total,
                    resolvedComplaints: resolved,
                    pendingComplaints: pending,
                    inProgressComplaints: inProgress,
                    resolutionRate: total > 0 ? ((resolved / total) * 100).toFixed(1) : 0,
                    avgResolutionTime: "3-5 days",
                    complaintsByCategory: byCategory,
                    complaintsByLocation: byLocation,
                    recentActivity: recent
                });
            } catch (error) {
                console.error("Error fetching report data:", error);
                alert("Failed to load report data");
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [navigate]);

    return (
        <div className="dashboard-wrapper">
            <Navbar />

            <div className="dashboard-body">
                <Sidebar />

                <main className="dashboard-content reports-page">
                    <div className="reports-header">
                        <div className="reports-title">
                            <MdAssessment size={32} />
                            <h1>Complaint Reports & Analytics</h1>
                        </div>
                        <p className="reports-subtitle">
                            Comprehensive overview of your complaint history and statistics (Read-Only)
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            Loading report data...
                        </div>
                    ) : (
                        <>
                            {/* Summary Cards */}
                            <section className="report-summary">
                                <div className="summary-card">
                                    <div className="card-icon total">
                                        <MdAssessment size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.totalComplaints}</h3>
                                        <p>Total Complaints</p>
                                    </div>
                                </div>

                                <div className="summary-card">
                                    <div className="card-icon resolved">
                                        <MdCheckCircle size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.resolvedComplaints}</h3>
                                        <p>Resolved</p>
                                    </div>
                                </div>

                                <div className="summary-card">
                                    <div className="card-icon pending">
                                        <MdPending size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.pendingComplaints}</h3>
                                        <p>Pending</p>
                                    </div>
                                </div>

                                <div className="summary-card">
                                    <div className="card-icon rate">
                                        <MdTrendingUp size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.resolutionRate}%</h3>
                                        <p>Resolution Rate</p>
                                    </div>
                                </div>
                            </section>

                            {/* Detailed Reports */}
                            <div className="report-details">
                                {/* By Category */}
                                <section className="report-card">
                                    <h2>Complaints by Category</h2>
                                    <div className="report-list">
                                        {Object.keys(reportData.complaintsByCategory).length > 0 ? (
                                            Object.entries(reportData.complaintsByCategory).map(([category, count]) => (
                                                <div key={category} className="report-item">
                                                    <span className="item-label">{category}</span>
                                                    <span className="item-value">{count}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-data">No complaints filed yet</p>
                                        )}
                                    </div>
                                </section>

                                {/* By Location */}
                                <section className="report-card">
                                    <h2>Complaints by Location</h2>
                                    <div className="report-list">
                                        {Object.keys(reportData.complaintsByLocation).length > 0 ? (
                                            Object.entries(reportData.complaintsByLocation).map(([location, count]) => (
                                                <div key={location} className="report-item">
                                                    <MdLocationOn size={18} />
                                                    <span className="item-label">{location}</span>
                                                    <span className="item-value">{count}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-data">No location data available</p>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Recent Activity */}
                            <section className="report-card recent-activity">
                                <h2>Recent Activity</h2>
                                <div className="activity-list">
                                    {reportData.recentActivity.length > 0 ? (
                                        reportData.recentActivity.map((complaint) => (
                                            <div key={complaint.id} className="activity-item">
                                                <div className="activity-info">
                                                    <h4>{complaint.title || "Untitled Complaint"}</h4>
                                                    <p>{complaint.description?.substring(0, 80)}...</p>
                                                </div>
                                                <div className="activity-meta">
                                                    <span className={`status-badge ${complaint.status?.toLowerCase().replace(" ", "-")}`}>
                                                        {complaint.status || "Pending"}
                                                    </span>
                                                    <span className="activity-date">
                                                        {complaint.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-data">No recent activity</p>
                                    )}
                                </div>
                            </section>

                            {/* Performance Metrics */}
                            <section className="report-card metrics">
                                <h2>Performance Metrics</h2>
                                <div className="metrics-grid">
                                    <div className="metric-item">
                                        <span className="metric-label">Average Resolution Time</span>
                                        <span className="metric-value">{reportData.avgResolutionTime}</span>
                                    </div>
                                    <div className="metric-item">
                                        <span className="metric-label">In Progress</span>
                                        <span className="metric-value">{reportData.inProgressComplaints}</span>
                                    </div>
                                    <div className="metric-item">
                                        <span className="metric-label">Success Rate</span>
                                        <span className="metric-value">{reportData.resolutionRate}%</span>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Reports;
