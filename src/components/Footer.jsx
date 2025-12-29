import { useState } from "react";
import "../styles/layout/footer.css";

const Footer = () => {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {year} Civic Platform. All rights reserved.</p>
        <p>Equal rights,Equality to all</p>
        <p className="footer-sub">
          Citizen Grievance & Transparency System
        </p>
      </div>
    </footer>
  );
};

export default Footer;
