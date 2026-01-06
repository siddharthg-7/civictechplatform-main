import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/layout/sidebar.css";
import { useTranslation } from "react-i18next";

import {
  MdDashboard,
  MdReportProblem,
  MdPeople,
  MdPerson,
  MdSettings
} from "react-icons/md";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">

        <li
          className={isActive("/admin/dashboard") ? "active" : ""}
          onClick={() => navigate("/admin/dashboard")}
        >
          <MdDashboard className="sidebar-icon" size={24} />
          <span>{t('dashboard')}</span>
        </li>

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

        <li
          className={isActive("/admin/settings") ? "active" : ""}
          onClick={() => navigate("/admin/settings")}
        >
          <MdSettings className="sidebar-icon" size={24} />
          <span>{t('settings')}</span>
        </li>

      </ul>
    </aside>
  );
};

export default AdminSidebar;

