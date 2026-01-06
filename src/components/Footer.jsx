import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/layout/footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {year} {t('civicPlatform')}. {t('allRightsReserved')}</p>
        <p>{t('footerQuote')}</p>
        <p className="footer-sub">
          {t('footerSystemName')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
