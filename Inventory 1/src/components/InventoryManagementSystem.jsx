import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './InventoryManagementSystem.css';

function InventoryManagementSystem() {
  const [inventory, setInventory] = useState([]);
  const location = useLocation();
  const isManageMode = location.pathname === '/manage-inventory';

  // Load inventory from local storage on initial render
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventoryData');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save inventory to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
  }, [inventory]);

  // Update item quantity
  const updateQuantity = (id, change) => {
    setInventory(inventory.map(item => 
      item.id === id 
        ? { 
            ...item, 
            quantity: Math.max(0, item.quantity + change),
            lastUpdated: new Date()
          }
        : item
    ));
  };

  // Delete item
  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">
        {isManageMode ? 'Manage Inventory' : 'View Inventory'}
      </h2>

      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p>{inventory.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stock</h3>
          <p>{inventory.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <p>${inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Value</th>
              <th>Last Updated</th>
              {isManageMode && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <span className="category-badge">{item.category}</span>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="quantity-control">
                    {isManageMode ? (
                      <>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                {isManageMode && (
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteItem(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagementSystem;




