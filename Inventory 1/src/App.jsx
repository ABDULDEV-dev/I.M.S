import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import AddProduct from './components/AddProduct';
import InventoryManagementSystem from './components/InventoryManagementSystem';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-inventory" element={<InventoryManagementSystem />} />
          <Route path="/manage-inventory" element={<InventoryManagementSystem />} />
          <Route path="/developer" element={<DeveloperInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Developer Info component
function DeveloperInfo() {
  return (
    <div className="developer-info">
      <h2>Developer Information</h2>
      <div className="dev-details">
        <img src="/developer-photo.jpg" alt="Developer" />
        <h3>John Doe</h3>
        <p>Full Stack Developer</p>
        <p>Specializing in React and Node.js</p>
        <div className="social-links">
          <a href="https://github.com/johndoe">GitHub</a>
          <a href="https://linkedin.com/in/johndoe">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default App;



