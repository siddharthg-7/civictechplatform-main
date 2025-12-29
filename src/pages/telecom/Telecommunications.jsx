import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "../../styles/pages/telecom.css";
import "../../styles/base/reset.css";

const Telecommunications = () => {
  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="telecom-container">

            <h2 className="telecom-title">Telecommunications Department</h2>
            <p className="telecom-subtitle">
              Telangana Government – Telecom & Communication Administration
            </p>

            {/* ADMIN DETAILS */}
            <div className="telecom-section">
              <h3>Administrative Authority</h3>

              <div className="telecom-card">
                <p><strong>Department:</strong> Department of Telecommunications</p>
                <p><strong>State:</strong> Telangana</p>
                <p><strong>Head Office:</strong> Hyderabad</p>
                <p><strong>Office Timings:</strong> 10:00 AM – 5:00 PM (Mon–Fri)</p>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div className="telecom-section">
              <h3>Contact Information</h3>

              <div className="telecom-grid">
                <div className="telecom-card">
                  <h4>Helpline Number</h4>
                  <p>📞 1800-425-1122</p>
                </div>

                <div className="telecom-card">
                  <h4>Email Support</h4>
                  <p>📧 telecom-support@telangana.gov.in</p>
                </div>

                <div className="telecom-card">
                  <h4>Emergency Contact</h4>
                  <p>🚨 112</p>
                </div>
              </div>
            </div>

            {/* QUERIES */}
            <div className="telecom-section">
              <h3>For Queries Related To</h3>

              <ul className="telecom-list">
                <li>Mobile Network & Signal Issues</li>
                <li>Internet & Broadband Complaints</li>
                <li>Telecom Infrastructure Problems</li>
                <li>Emergency Communication Failures</li>
                <li>Service Provider Issues</li>
              </ul>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Telecommunications;
