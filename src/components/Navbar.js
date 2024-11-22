import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGamepad, FaHeart, FaInfoCircle } from 'react-icons/fa'; // Import icons
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // Helper function to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className={`navbar-item ${isActive('/') ? 'active' : ''}`}>
        <FaHome className="navbar-icon" />
        <span>Home</span>
      </Link>
      <Link to="/games" className={`navbar-item ${isActive('/games') ? 'active' : ''}`}>
        <FaGamepad className="navbar-icon" />
        <span>Games</span>
      </Link>
      <Link to="/favorites" className={`navbar-item ${isActive('/favorites') ? 'active' : ''}`}>
        <FaHeart className="navbar-icon" />
        <span>Favorites</span>
      </Link>
      <Link to="/about" className={`navbar-item ${isActive('/about') ? 'active' : ''}`}>
        <FaInfoCircle className="navbar-icon" />
        <span>About</span>
      </Link>
    </nav>
  );
};

export default Navbar;
