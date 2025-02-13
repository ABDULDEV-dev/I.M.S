import React, { useState } from 'react';
import './AddProduct.css';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    quantity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add product to inventory logic here
    console.log('Product added:', product);
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) => setProduct({...product, category: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({...product, price: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({...product, quantity: e.target.value})}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;


