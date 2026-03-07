import { useNavigate, useLocation } from "react-router-dom";
import "../styles/layout/sidebar.css";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";

import {
  FaTachometerAlt,
  FaFileAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaUsers,
  FaCog,
  FaUniversity,
  FaSignOutAlt,
  FaHeadset,
} from "react-icons/fa";

const Sidebar = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (_) { }
    navigate("/");
  };

  const dashPath = role === "user" ? "/dashboard" : "/admin/dashboard";

  return (
    <aside className="sidebar">
      {/* ── Brand ── */}
      <div
        className="sidebar-brand"
        onClick={() => navigate(dashPath)}
        role="button"
        tabIndex={0}
      >
        <div className="sidebar-brand-icon">
          <FaUniversity size={16} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">Civic Platform</span>
          <span className="sidebar-brand-sub">
            {role === "user" ? "Smart Governance" : "Admin Portal"}
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li
            className={isActive(dashPath) ? "active" : ""}
            onClick={() => navigate(dashPath)}
          >
            <FaTachometerAlt className="sidebar-icon" size={18} />
            <span>{t("dashboard")}</span>
          </li>

          {/* ── CITIZEN items ── */}
          {role === "user" && (
            <>
              <li
                className={isActive("/complaints") ? "active" : ""}
                onClick={() => navigate("/complaints")}
              >
                <FaFileAlt className="sidebar-icon" size={18} />
                <span>{t("myComplaints")}</span>
              </li>

              <li
                className={isActive("/resolved") ? "active" : ""}
                onClick={() => navigate("/resolved")}
              >
                <FaCheckCircle className="sidebar-icon" size={18} />
                <span>{t("resolved")}</span>
              </li>

              <li
                className={isActive("/telecom") ? "active" : ""}
                onClick={() => navigate("/telecom")}
              >
                <FaPhoneAlt className="sidebar-icon" size={16} />
                <span>{t("telecom")}</span>
              </li>

              <li
                className={isActive("/community") ? "active" : ""}
                onClick={() => navigate("/community")}
              >
                <FaUsers className="sidebar-icon" size={18} />
                <span>{t("community")}</span>
              </li>
            </>
          )}

          {/* ── ADMIN items ── */}
          {(role === "admin" || role === "gov_admin") && (
            <>
              <li
                className={isActive("/admin/complaints") ? "active" : ""}
                onClick={() => navigate("/admin/complaints")}
              >
                <FaFileAlt className="sidebar-icon" size={18} />
                <span>{t("allComplaints")}</span>
              </li>

              <li
                className={isActive("/admin/polls") ? "active" : ""}
                onClick={() => navigate("/admin/polls")}
              >
                <FaUsers className="sidebar-icon" size={18} />
                <span>{t("communityPolls")}</span>
              </li>

              <li
                className={isActive("/admin/users") ? "active" : ""}
                onClick={() => navigate("/admin/users")}
              >
                <FaUsers className="sidebar-icon" size={18} />
                <span>{t("loggedUsers")}</span>
              </li>
            </>
          )}

          {/* Settings */}
          <li
            className={isActive("/settings") || isActive("/admin/settings") ? "active" : ""}
            onClick={() =>
              navigate(
                role === "admin" || role === "gov_admin"
                  ? "/admin/settings"
                  : "/settings"
              )
            }
          >
            <FaCog className="sidebar-icon" size={18} />
            <span>{t("settings")}</span>
          </li>
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        {/* Government support card — citizen only */}
        {role === "user" && (
          <div className="sidebar-support-card">
            <div className="sidebar-support-card-title">Government Support</div>
            <div className="sidebar-support-card-desc">
              Access 24/7 technical assistance for citizen services.
            </div>
            <button
              className="sidebar-support-btn"
              onClick={() => navigate("/help")}
            >
              <FaHeadset style={{ marginRight: "0.3rem", fontSize: "0.7rem" }} />
              Get Help
            </button>
          </div>
        )}

        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt size={16} />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
