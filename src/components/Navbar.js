import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { currentUser, logout } = useAuth(); 
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          EventApp
        </Link>

        <div className={`hamburger-menu ${isMobile ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`navbar-links ${isMobile ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-link">Home</Link></li>
          {/* Conditionally render Login/Logout links */}
          {!currentUser ? (
            <>
              <li><Link to="/login" className="navbar-link">Login</Link></li>
              <li><Link to="/signup" className="navbar-link">Sign Up</Link></li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="navbar-link logout-button">
                Logout
              </button>
            </li>
          )}
          <li><Link to="/create-event" className="navbar-link">Create Event</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
