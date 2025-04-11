import React from "react";

import "../../css/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <h3>FAQ'S</h3>
          <ul>
            
            <li><a href="/login">Log In/Sign Up</a></li>
            <li><a href="#">How To Buy</a></li>
            <li><a href="#">Payment</a></li>
            <li><a href="#">Shipping & Deliveries</a></li>
            <li><a href="#">Exchange & Returns</a></li>
          </ul>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <h2>GRAVITAS</h2>
          <p>© Copyrights Reserved by GRAVITAS 2025</p>
        </div>

        {/* Right Section */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Retail Stores</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Work With Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
