import { useNavigate } from "react-router-dom";
import "../../styles/layout/navbar.css";
import { useTranslation } from "react-i18next";

import logo from "../../assets/images/logo/civic-logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, increaseFont, decreaseFont, resetFont } = useTheme();
  const { t } = useTranslation();

  const handleLogout = () => {
    // Ideally clear auth state here too if needed, but navigate ensures redirect
    navigate("/admin/login");
  };

  return (
    <header className="gov-header">
      {/* 1. Accessibility Bar */}
      <div className="gov-top-bar">
        <div className="gov-top-content">
          <div className="gov-access-tools">
            <span>{t('adminConsole')}</span>
            <span className="divider">|</span>
            <button onClick={decreaseFont} aria-label="Decrease Font">A-</button>
            <button onClick={resetFont} aria-label="Reset Font">A</button>
            <button onClick={increaseFont} aria-label="Increase Font">A+</button>
            <span className="divider">|</span>
            <button onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'high-contrast' ? t('standardContrast') : t('highContrast')}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="gov-main-header">
        <div className="gov-header-content">
          <div className="gov-branding" onClick={() => navigate('/admin/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="emblem-placeholder">
              <img src={logo} alt="Emblem" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="site-titles">
              <h1>{t('adminPortal')}</h1>
              <span>{t('govOfIndia')}</span>
            </div>
          </div>

          <div className="gov-actions">
            {/* Admin specific actions if any */}
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <div className="gov-nav-bar">
        <div className="gov-nav-content">
          <div className="nav-links">
            <span onClick={() => navigate('/admin/dashboard')}>{t('dashboard')}</span>
            <span onClick={() => navigate('/admin/complaints')}>{t('complaints')}</span>
            <span onClick={() => navigate('/admin/users')}>{t('users')}</span>
            <span onClick={() => navigate('/admin/settings')}>{t('settings')}</span>
          </div>

          <div className="user-profile">
            <FaUserCircle size={24} onClick={() => navigate("/admin/account")} />
            <span onClick={() => navigate("/admin/account")}>{t('adminAccount')}</span>
            <span className="logout-btn" onClick={handleLogout}>{t('logout')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

