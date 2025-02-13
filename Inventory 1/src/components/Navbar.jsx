import React from 'react';
import './Navbar.css';
//import defaultProfile from '../assets/default-profile.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Inventory Pro</h1>
      </div>
      <div className="nav-profile">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
        <img src={defaultProfile} alt="Profile" className="profile-pic"/>
      </div>
    </nav>
  );
}

export default Navbar;