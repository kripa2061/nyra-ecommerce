
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="nyra-footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-brand">
          <h1>NYRA</h1>
          <p>
            Discover your signature aesthetic with curated outfit inspiration,
            personalized styling, and elevated fashion experiences.
          </p>

          
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#">Outfit Builder</a>
            <a href="#">Trending Styles</a>
            <a href="#">Style Inspiration</a>
            <a href="#">Collections</a>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <a href="#">Contact</a>
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>

          <div className="footer-column">
            <h3>Social</h3>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">TikTok</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 NYRA. All rights reserved.</p>

        <div className="bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
