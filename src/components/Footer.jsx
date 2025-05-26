import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About HSF Nutrition</h3>
          <p>Your trusted partner in fitness and nutrition. We provide high-quality supplements and fitness products to help you achieve your health goals.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/shop/whey-protein">Whey Protein</Link></li>
            <li><Link to="/shop/raw-whey">Raw Whey</Link></li>
            <li><Link to="/shop/peanut-butter">Peanut Butter</Link></li>
            <li><Link to="/shop/creatine">Creatine</Link></li>
            <li><Link to="/shop/bcaa">BCAA</Link></li>
            <li><Link to="/shop/gainers">Mass Gainers</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <span className="icon">📍</span>
              123 Fitness Street, Health City, HC 12345
            </li>
            <li>
              <span className="icon">📞</span>
              +1 (555) 123-4567
            </li>
            <li>
              <span className="icon">✉️</span>
              info@supplementshop.com
            </li>
            <li>
              <span className="icon">⏰</span>
              Mon-Fri: 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 HSF Nutrition. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 