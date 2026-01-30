import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  FaPhone,
  FaEnvelope,
  FaExclamationTriangle,
  FaClock,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaWifi,
  FaMobileAlt,
  FaGlobe,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";

import "../../styles/pages/telecom.css";
import "../../styles/base/reset.css";

const Telecommunications = () => {
  const queryCategories = [
    { title: "Mobile & Signal", icon: <FaMobileAlt />, items: ["Signal Strength Issues", "Network Coverage Gaps", "International Roaming"] },
    { title: "Internet & Data", icon: <FaWifi />, items: ["Broadband Speed Complaints", "Fiber Optic Connectivity", "Leased Line Support"] },
    { title: "Infrastructure", icon: <FaGlobe />, items: ["Cell Tower Permissions", "Cable Damage Reporting", "Broadcasting Permits"] },
    { title: "Emergency Services", icon: <FaExclamationTriangle />, items: ["Priority Communication", "Disaster Recovery", "Satellite Backup"] },
  ];

  const stats = [
    { label: "Network Up-time", value: "99.9%", color: "#ffffff" },
    { label: "Digital Coverage", value: "92.5%", color: "#ffffff" },
    { label: "Fiber Reach", value: "15.2k KM", color: "#ffffff" },
    { label: "Active Users", value: "42M+", color: "#ffffff" },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="tc-container">
            {/* Header Section */}
            <header className="tc-header">
              <div className="tc-header-content">
                <div className="tc-badge">
                  <FaInfoCircle /> Official Government Portal
                </div>
                <h1 className="tc-title">Telecommunications Department</h1>
                <p className="tc-subtitle">
                  Telangana State Government – Ministry of Information Technology & Communication
                </p>
              </div>
              <div className="tc-stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="tc-stat-card">
                    <span className="tc-stat-value">{stat.value}</span>
                    <span className="tc-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </header>

            <div className="tc-main-grid">
              {/* Left Column: Authority & Contact */}
              <div className="tc-left-col">
                <section className="tc-section">
                  <div className="tc-section-header">
                    <FaMapMarkerAlt className="tc-section-icon" />
                    <h2>Administrative Authority</h2>
                  </div>
                  <div className="tc-info-card">
                    <div className="tc-info-item">
                      <div className="tc-item-content">
                        <strong>Department</strong>
                        <p>Department of Telecommunications, Telangana</p>
                      </div>
                    </div>
                    <div className="tc-info-item">
                      <div className="tc-item-content">
                        <strong>Zonal Head Office</strong>
                        <p>Telecom Complex, Himayat Nagar, Hyderabad - 500029</p>
                      </div>
                    </div>
                    <div className="tc-info-item">
                      <div className="tc-item-content">
                        <strong>Operational Hours</strong>
                        <p>Monday - Saturday: 10:00 AM to 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="tc-section transparent-bg">
                  <div className="tc-section-header">
                    <FaHeadset className="tc-section-icon" />
                    <h2>Support & Helpdesk</h2>
                  </div>
                  <div className="tc-contact-list">
                    <a href="tel:18004251122" className="tc-contact-link">
                      <div className="tc-icon-box"><FaPhone /></div>
                      <div>
                        <span className="tc-link-label">Toll-Free Helpline</span>
                        <span className="tc-link-value">1800-425-1122</span>
                      </div>
                      <FaArrowRight className="tc-arrow" />
                    </a>
                    <a href="mailto:itc-support@telangana.gov.in" className="tc-contact-link">
                      <div className="tc-icon-box"><FaEnvelope /></div>
                      <div>
                        <span className="tc-link-label">Official Support Email</span>
                        <span className="tc-link-value">support.telecom@telangana.gov.in</span>
                      </div>
                      <FaArrowRight className="tc-arrow" />
                    </a>
                    <a href="tel:112" className="tc-contact-link emergency-link">
                      <div className="tc-icon-box"><FaExclamationTriangle /></div>
                      <div>
                        <span className="tc-link-label">National Emergency</span>
                        <span className="tc-link-value">Dial 112 (Common Number)</span>
                      </div>
                      <FaArrowRight className="tc-arrow" />
                    </a>
                  </div>
                </section>
              </div>

              {/* Right Column: Services & More */}
              <div className="tc-right-col">
                <section className="tc-section">
                  <div className="tc-section-header">
                    <FaCheckCircle className="tc-section-icon" />
                    <h2>Service Portfolios</h2>
                  </div>
                  <div className="tc-service-grid">
                    {queryCategories.map((cat, index) => (
                      <div key={index} className="tc-service-card">
                        <div className="tc-service-icon">{cat.icon}</div>
                        <h3>{cat.title}</h3>
                        <ul className="tc-service-list">
                          {cat.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="tc-notice-board">
                  <div className="tc-notice-inner">
                    <FaClock className="tc-notice-icon" />
                    <div className="tc-notice-text">
                      <strong>Scheduled Maintenance</strong>
                      <p>Fiber optic expansion in Rangareddy district may cause brief intermittent outages on Sundays between 2 AM - 4 AM.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Telecommunications;

