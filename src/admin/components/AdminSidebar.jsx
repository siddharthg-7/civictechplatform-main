import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/layout/sidebar.css";

import dashboardIcon from "../../assets/images/icons/dashboard.png";
import complaintIcon from "../../assets/images/icons/complaints.png";
import communityIcon from "../../assets/images/icons/communityIcon.png";
import userIcon from "../../assets/images/icons/user.png";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">

        <li
          className={isActive("/admin/dashboard") ? "active" : ""}
          onClick={() => navigate("/admin/dashboard")}
        >
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </li>

        <li
          className={isActive("/admin/complaints") ? "active" : ""}
          onClick={() => navigate("/admin/complaints")}
        >
          <img src={complaintIcon} alt="All Complaints" />
          <span>All Complaints</span>
        </li>

        <li
          className={isActive("/admin/polls") ? "active" : ""}
          onClick={() => navigate("/admin/polls")}
        >
          <img src={communityIcon} alt="Community Polls" />
          <span>Community Polls</span>
        </li>

        <li
          className={isActive("/admin/users") ? "active" : ""}
          onClick={() => navigate("/admin/users")}
        >
          <img src={userIcon} alt="Logged Users" />
          <span>Logged Users</span>
        </li>

      </ul>
    </aside>
  );
};

export default AdminSidebar;
