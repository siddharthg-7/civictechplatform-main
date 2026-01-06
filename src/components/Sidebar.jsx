import { useNavigate, useLocation } from "react-router-dom";
import "../styles/layout/sidebar.css";
import { useTranslation } from "react-i18next";

import {
  MdDashboard,
  MdReportProblem,
  MdCheckCircle,
  MdPhone,
  MdSettings,
  MdPeople,
  MdPerson
} from "react-icons/md";

const Sidebar = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">

        {/* ===== DASHBOARD ===== */}
        <li
          className={isActive(role === "admin" ? "/admin/dashboard" : "/dashboard") ? "active" : ""}
          onClick={() =>
            navigate(role === "admin" ? "/admin/dashboard" : "/dashboard")
          }
        >
          <MdDashboard className="sidebar-icon" size={24} />
          <span>{t('dashboard')}</span>
        </li>

        {/* ===== USER ONLY ===== */}
        {role === "user" && (
          <>
            <li
              className={isActive("/complaints") ? "active" : ""}
              onClick={() => navigate("/complaints")}
            >
              <MdReportProblem className="sidebar-icon" size={24} />
              <span>{t('myComplaints')}</span>
            </li>

            <li
              className={isActive("/resolved") ? "active" : ""}
              onClick={() => navigate("/resolved")}
            >
              <MdCheckCircle className="sidebar-icon" size={24} />
              <span>{t('resolved')}</span>
            </li>

            <li
              className={isActive("/telecom") ? "active" : ""}
              onClick={() => navigate("/telecom")}
            >
              <MdPhone className="sidebar-icon" size={24} />
              <span>{t('telecom')}</span>
            </li>

            <li
              className={isActive("/community") ? "active" : ""}
              onClick={() => navigate("/community")}
            >
              <MdPeople className="sidebar-icon" size={24} />
              <span>{t('community')}</span>
            </li>
          </>
        )}

        {/* ===== ADMIN ONLY ===== */}
        {role === "admin" && (
          <>
            <li
              className={isActive("/admin/complaints") ? "active" : ""}
              onClick={() => navigate("/admin/complaints")}
            >
              <MdReportProblem className="sidebar-icon" size={24} />
              <span>{t('allComplaints')}</span>
            </li>

            <li
              className={isActive("/admin/polls") ? "active" : ""}
              onClick={() => navigate("/admin/polls")}
            >
              <MdPeople className="sidebar-icon" size={24} />
              <span>{t('communityPolls')}</span>
            </li>

            <li
              className={isActive("/admin/users") ? "active" : ""}
              onClick={() => navigate("/admin/users")}
            >
              <MdPerson className="sidebar-icon" size={24} />
              <span>{t('loggedUsers')}</span>
            </li>
          </>
        )}

        {/* ===== COMMON ===== */}
        <li
          className={isActive("/settings") ? "active" : ""}
          onClick={() =>
            navigate(role === "admin" ? "/admin/settings" : "/settings")
          }
        >
          <MdSettings className="sidebar-icon" size={24} />
          <span>{t('settings')}</span>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
