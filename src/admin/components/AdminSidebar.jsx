import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/layout/sidebar.css";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";

import {
  FaTachometerAlt,
  FaFileAlt,
  FaPoll,
  FaUsers,
  FaCog,
  FaUniversity,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    try { await auth.signOut(); } catch (_) { }
    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">
      {/* ── Brand ── */}
      <div
        className="sidebar-brand"
        onClick={() => navigate("/admin/dashboard")}
        role="button"
        tabIndex={0}
      >
        <div className="sidebar-brand-icon">
          <FaUniversity size={16} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">Civic Admin</span>
          <span className="sidebar-brand-sub">Civic Platform</span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li
            className={isActive("/admin/dashboard") ? "active" : ""}
            onClick={() => navigate("/admin/dashboard")}
          >
            <FaTachometerAlt className="sidebar-icon" size={18} />
            <span>{t("dashboard")}</span>
          </li>

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
            <FaPoll className="sidebar-icon" size={18} />
            <span>{t("communityPolls")}</span>
          </li>

          <li
            className={isActive("/admin/users") ? "active" : ""}
            onClick={() => navigate("/admin/users")}
          >
            <FaUsers className="sidebar-icon" size={18} />
            <span>{t("loggedUsers")}</span>
          </li>

          <li
            className={isActive("/admin/settings") ? "active" : ""}
            onClick={() => navigate("/admin/settings")}
          >
            <FaCog className="sidebar-icon" size={18} />
            <span>{t("settings")}</span>
          </li>
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt size={16} />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
