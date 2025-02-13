import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage">
      <div className="grid-container">
        <div className="grid-item" onClick={() => window.location.href = '/add-product'}>
          <i className="fas fa-plus-circle"></i>
          <h2>Add Products</h2>
          <p>Add new products to inventory</p>
        </div>
        
        <div className="grid-item" onClick={() => window.location.href = '/view-inventory'}>
          <i className="fas fa-list"></i>
          <h2>View Inventory</h2>
          <p>Check current stock levels</p>
        </div>
        
        <div className="grid-item" onClick={() => window.location.href = '/manage-inventory'}>
          <i className="fas fa-edit"></i>
          <h2>Manage Inventory</h2>
          <p>Update product quantities</p>
        </div>
        
        <div className="grid-item" onClick={() => window.location.href = '/developer'}>
          <i className="fas fa-code"></i>
          <h2>Developer Details</h2>
          <p>About the developer</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;