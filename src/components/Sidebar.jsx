import { useNavigate, useLocation } from "react-router-dom";
import "../styles/layout/sidebar.css";

import dashboardIcon from "../assets/images/icons/dashboard.png";
import complaintIcon from "../assets/images/icons/complaints.png";
import resolvedIcon from "../assets/images/icons/resolved.png";
import phoneIcon from "../assets/images/icons/phone.png";
import settingsIcon from "../assets/images/icons/settings.png";
import communityIcon from "../assets/images/icons/communityIcon.png";

// ✅ ADMIN ICONS (reuse or add later)
import usersIcon from "../assets/images/icons/user.png";

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
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </li>

        {/* ===== USER ONLY ===== */}
        {role === "user" && (
          <>
            <li
              className={isActive("/complaints") ? "active" : ""}
              onClick={() => navigate("/complaints")}
            >
              <img src={complaintIcon} alt="Complaints" />
              <span>My Complaints</span>
            </li>

            <li
              className={isActive("/resolved") ? "active" : ""}
              onClick={() => navigate("/resolved")}
            >
              <img src={resolvedIcon} alt="Resolved" />
              <span>Resolved</span>
            </li>

            <li
              className={isActive("/telecom") ? "active" : ""}
              onClick={() => navigate("/telecom")}
            >
              <img src={phoneIcon} alt="Telecom" />
              <span>Telecom</span>
            </li>

            <li
              className={isActive("/community") ? "active" : ""}
              onClick={() => navigate("/community")}
            >
              <img src={communityIcon} alt="Community" />
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
              <img src={complaintIcon} alt="All Complaints" />
              <span>All Complaints</span>
            </li>

            <li
              className={isActive("/admin/community") ? "active" : ""}
              onClick={() => navigate("/admin/community")}
            >
              <img src={communityIcon} alt="Community Polls" />
              <span>Community Polls</span>
            </li>

            <li
              className={isActive("/admin/users") ? "active" : ""}
              onClick={() => navigate("/admin/users")}
            >
              <img src={usersIcon} alt="Users" />
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
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
