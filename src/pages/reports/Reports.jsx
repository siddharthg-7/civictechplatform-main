import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MdAssessment, MdTrendingUp, MdCheckCircle, MdPending, MdLocationOn } from "react-icons/md";
import "../../styles/pages/reports.css";
import { useTranslation } from "react-i18next";

const Reports = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                            <h1>{t('complaintReportsTitle')}</h1>
                        </div>
                        <p className="reports-subtitle">
                            {t('reportsSubtitle')} (Read-Only)
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
                                        <p>{t('totalComplaints')}</p>
                                    </div>
                                </div>

                                <div className="summary-card">
                                    <div className="card-icon resolved">
                                        <MdCheckCircle size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.resolvedComplaints}</h3>
                                        <p>{t('resolved')}</p>
                                    </div>
                                </div>

                                <div className="summary-card">
                                    <div className="card-icon pending">
                                        <MdPending size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.pendingComplaints}</h3>
                                        <p>{t('pending')}</p>
                                    </div>
                                </div>

                                <div className="summary-card">
                                    <div className="card-icon rate">
                                        <MdTrendingUp size={28} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{reportData.resolutionRate}%</h3>
                                        <p>{t('successRate')}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Main Grid Layout */}
                            <div className="reports-main-grid">

                                {/* Left Column: Stats & Breakdown */}
                                <div className="reports-col-left">
                                    <section className="report-card">
                                        <h2>{t('complaintsByCategory')}</h2>
                                        <div className="report-list">
                                            {Object.keys(reportData.complaintsByCategory).length > 0 ? (
                                                Object.entries(reportData.complaintsByCategory).map(([category, count]) => (
                                                    <div key={category} className="report-item">
                                                        <span className="item-label">{category}</span>
                                                        <span className="item-value">{count}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-data">{t('noData')}</p>
                                            )}
                                        </div>
                                    </section>

                                    <section className="report-card">
                                        <h2>{t('complaintsByLocation')}</h2>
                                        <div className="report-list">
                                            {Object.keys(reportData.complaintsByLocation).length > 0 ? (
                                                Object.entries(reportData.complaintsByLocation).map(([location, count]) => (
                                                    <div key={location} className="report-item">
                                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                            <MdLocationOn size={16} color="#666" />
                                                            <span className="item-label">{location}</span>
                                                        </div>
                                                        <span className="item-value">{count}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-data">{t('noData')}</p>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Activity & Metrics */}
                                <div className="reports-col-right">
                                    <section className="report-card recent-activity">
                                        <h2>{t('recentUpdates')}</h2>
                                        <div className="activity-list">
                                            {reportData.recentActivity.length > 0 ? (
                                                reportData.recentActivity.map((complaint) => (
                                                    <div key={complaint.id} className="activity-item">
                                                        <div className="activity-info">
                                                            <h4>{complaint.title || "Untitled"}</h4>
                                                            <p>
                                                                <span className={`status-badge ${complaint.status?.toLowerCase().replace(" ", "-")}`}>
                                                                    {t(complaint.status?.toLowerCase().replace(" ", "") || 'pending')}
                                                                </span>
                                                            </p>
                                                            <span className="activity-date">
                                                                {complaint.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-data">{t('noRecentActivity')}</p>
                                            )}
                                        </div>
                                    </section>

                                    <section className="report-card metrics">
                                        <h2>{t('performance')}</h2>
                                        <div className="metrics-grid">
                                            <div className="metric-item">
                                                <span className="metric-label">{t('avgResolution')}</span>
                                                <div className="metric-value">{reportData.avgResolutionTime}</div>
                                            </div>
                                            <div className="metric-item">
                                                <span className="metric-label">{t('successRate')}</span>
                                                <div className="metric-value">{reportData.resolutionRate}%</div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Reports;
