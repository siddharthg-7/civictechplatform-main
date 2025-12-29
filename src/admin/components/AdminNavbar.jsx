import { useNavigate } from "react-router-dom";
import "../../styles/layout/navbar.css";

import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Admin logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <img src={logo} alt="Civic Logo" className="navbar-logo" />
        <h3>Admin Panel</h3>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <img
          src={userIcon}
          alt="admin"
          className="navbar-usericon"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/about/account")}
        />

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
