import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/layout/navbar.css";
import { locations } from "../data/locations";

import logo from "../assets/images/logo/civic-logo.png";
import { FaSearch, FaUserCircle, FaGlobe, FaChevronDown } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, toggleTheme, increaseFont, decreaseFont, resetFont, fontSize } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const currentLanguage = i18n.language || "en";

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
    if (role === "admin" || role === "gov_admin") navigate("/admin/login");
    else navigate("/");
  };

  return (
    <header className={`gov-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* 1. Accessibility Bar */}
      <div className="gov-top-bar">
        <div className="gov-top-content">
          <div className="gov-access-tools">
            <div className="lang-switcher">
              <span onClick={() => setIsLangOpen(!isLangOpen)} className="lang-toggle">
                <FaGlobe /> {currentLanguage.toUpperCase()} <FaChevronDown size={10} />
              </span>
              {isLangOpen && (
                <div className="lang-dropdown">
                  <div onClick={() => changeLanguage('en')}>English</div>
                  <div onClick={() => changeLanguage('hi')}>हिन्दी</div>
                </div>
              )}
            </div>
            <span className="divider">|</span>
            <button onClick={decreaseFont} aria-label="Decrease Font">A-</button>
            <button onClick={resetFont} aria-label="Reset Font">A</button>
            <button onClick={increaseFont} aria-label="Increase Font">A+</button>
            <span className="divider">|</span>
            <button onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'high-contrast' ? t('standardContrast') : t('highContrast')}
            </button>
            <span className="divider">|</span>
            <span>{t('screenReader')}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="gov-main-header">
        <div className="gov-header-content">
          <div className="gov-branding" onClick={() => navigate((role === 'admin' || role === 'gov_admin') ? '/admin/dashboard' : '/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="emblem-placeholder">
              <img src={logo} alt="Emblem" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="site-titles">
              <h1>{(role === 'admin' || role === 'gov_admin') ? t('adminPortal') : t('civicPlatform')}</h1>
              <span>{t('govOfIndia')}</span>
            </div>
          </div>

          <div className="gov-actions">
            {/* Search */}
            {role === 'user' && (
              <div className="gov-search">
                <input
                  type="text"
                  placeholder={t('searchLocation')}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button onClick={handleSearch}>
                  <FaSearch size={18} />
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
            <span onClick={() => navigate((role === 'admin' || role === 'gov_admin') ? '/admin/dashboard' : '/dashboard')}>{t('dashboard')}</span>
            <span onClick={() => navigate('/complaints')}>{t('complaints')}</span>
            {role === 'user' && <span onClick={() => navigate('/raise-complaint')}>{t('raiseNew')}</span>}
            {(role === 'admin' || role === 'gov_admin') && <span onClick={() => navigate('/admin/users')}>{t('users')}</span>}
            <span onClick={() => navigate('/reports')}>{t('reports')}</span>
            <span onClick={() => navigate('/help')}>{t('help')}</span>
          </div>

          <div className="user-profile" onClick={() => navigate((role === 'admin' || role === 'gov_admin') ? '/admin/account' : '/about/account')}>
            <FaUserCircle size={24} />
            <span>{(role === 'admin' || role === 'gov_admin') ? t('adminPortal') : t('myAccount')}</span>
            <span className="logout-btn" onClick={handleLogout}>{t('logout')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
