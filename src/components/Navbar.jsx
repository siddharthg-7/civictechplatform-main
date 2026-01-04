import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/layout/navbar.css";
import { locations } from "../data/locations";

import logo from "../assets/images/logo/civic-logo.png";
import searchIcon from "../assets/images/icons/search.png";
import userIcon from "../assets/images/icons/user.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ role = "user" }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    if (e.key !== "Enter") return;
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

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <img src={logo} alt="logo" className="navbar-logo" />
        <h3>{role === "admin" ? "Admin Panel" : "Civic Platform"}</h3>
      </div>

      {/* ✅ SEARCH ONLY FOR USERS */}
      {role === "user" && (
        <div className="navbar-search">
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            placeholder="search city/district/municipality"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      )}

      {/* RIGHT */}
      <div className="navbar-right">
        <ThemeToggle />
        <img
          src={userIcon}
          alt="profile"
          className="navbar-usericon"
          onClick={() =>
            role === "admin"
              ? navigate("/admin/account")
              : navigate("/about/account")
          }
        />

        <button
          onClick={() =>
            role === "admin" ? navigate("/admin/login") : navigate("/")
          }
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
