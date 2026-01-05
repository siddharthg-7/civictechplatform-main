import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/layout/navbar.css";
import { locations } from "../data/locations";

import logo from "../assets/images/logo/civic-logo.png";
import searchIcon from "../assets/images/icons/search.png";
import userIcon from "../assets/images/icons/user.png";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const { theme, toggleTheme, increaseFont, decreaseFont, resetFont, fontSize } = useTheme();

  const handleSearch = (e) => {
    if (e.key !== "Enter" && e.type !== 'click') return;
    if (!searchText.trim()) return;

    const query = searchText.toLowerCase();

    for (const state in locations) {
      if (state.toLowerCase().includes(query)) {
        navigate("/complaints", { state: { state } });
        return;
      }
    }

    alert("Location not found");
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    if (role === "admin") navigate("/admin/login");
    else navigate("/");
  };

  return (
    <header className="gov-header">
      {/* 1. Accessibility Bar */}
      <div className="gov-top-bar">
        <div className="gov-top-content">
          <div className="gov-access-tools">
            <span>Language: EN</span>
            <span className="divider">|</span>
            <button onClick={decreaseFont} aria-label="Decrease Font">A-</button>
            <button onClick={resetFont} aria-label="Reset Font">A</button>
            <button onClick={increaseFont} aria-label="Increase Font">A+</button>
            <span className="divider">|</span>
            <button onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'high-contrast' ? 'Standard Contrast' : 'High Contrast'}
            </button>
            <span className="divider">|</span>
            <span>Screen Reader Access</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="gov-main-header">
        <div className="gov-header-content">
          <div className="gov-branding" onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="emblem-placeholder">
              <img src={logo} alt="Emblem" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="site-titles">
              <h1>{role === 'admin' ? 'Admin Portal' : 'Civic Platform'}</h1>
              <span>Government of India</span>
            </div>
          </div>

          <div className="gov-actions">
            {/* Search */}
            {role === 'user' && (
              <div className="gov-search">
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button onClick={handleSearch}>
                  <img src={searchIcon} alt="Search" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <div className="gov-nav-bar">
        <div className="gov-nav-content">
          <div className="nav-links">
            <span onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')}>Dashboard</span>
            <span onClick={() => navigate('/complaints')}>Complaints</span>
            {role === 'user' && <span onClick={() => navigate('/raise-complaint')}>Raise New</span>}
            {role === 'admin' && <span onClick={() => navigate('/admin/users')}>Users</span>}
            <span>Reports</span>
            <span>Help</span>
          </div>

          <div className="user-profile" onClick={() => navigate(role === 'admin' ? '/admin/account' : '/about/account')}>
            <img src={userIcon} alt="User" />
            <span>{role === 'admin' ? 'Admin' : 'My Account'}</span>
            <span className="logout-btn" onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
