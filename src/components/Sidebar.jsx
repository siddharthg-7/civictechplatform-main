import { useNavigate, useLocation } from "react-router-dom";
import "../styles/layout/sidebar.css";

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
          <span>Dashboard</span>
        </li>

        {/* ===== USER ONLY ===== */}
        {role === "user" && (
          <>
            <li
              className={isActive("/complaints") ? "active" : ""}
              onClick={() => navigate("/complaints")}
            >
              <MdReportProblem className="sidebar-icon" size={24} />
              <span>My Complaints</span>
            </li>

            <li
              className={isActive("/resolved") ? "active" : ""}
              onClick={() => navigate("/resolved")}
            >
              <MdCheckCircle className="sidebar-icon" size={24} />
              <span>Resolved</span>
            </li>

            <li
              className={isActive("/telecom") ? "active" : ""}
              onClick={() => navigate("/telecom")}
            >
              <MdPhone className="sidebar-icon" size={24} />
              <span>Telecom</span>
            </li>

            <li
              className={isActive("/community") ? "active" : ""}
              onClick={() => navigate("/community")}
            >
              <MdPeople className="sidebar-icon" size={24} />
              <span>Community</span>
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
              <span>All Complaints</span>
            </li>

            <li
              className={isActive("/admin/polls") ? "active" : ""}
              onClick={() => navigate("/admin/polls")}
            >
              <MdPeople className="sidebar-icon" size={24} />
              <span>Community Polls</span>
            </li>

            <li
              className={isActive("/admin/users") ? "active" : ""}
              onClick={() => navigate("/admin/users")}
            >
              <MdPerson className="sidebar-icon" size={24} />
              <span>Logged Users</span>
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
          <span>Settings</span>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
