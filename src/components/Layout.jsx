import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header className="fixed-header">
        <div className="top-banner">
          Free shipping on orders over $50!
        </div>
        <nav className="navbar">
          <Link to="/" className="logo">HSF Nutrition</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search products..." />
            <button className="search-button">Search</button>
          </div>
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout; 