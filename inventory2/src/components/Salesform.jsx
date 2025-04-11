"use client"

import { useState } from "react"
import BackToHomeButtom from "./BackToHomeButtom"
import { Search } from "lucide-react"

function SalesForm({ inventory, addSale, sales, setCurrentPage }) {
  const [showForm, setShowForm] = useState(false)
  const [showSalesHistory, setShowSalesHistory] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sale, setSale] = useState({
    customerName: "",
    address: "",
    phoneNumber: "",
    product: "",
    quantity: "",
    paymentType: "paid", // "paid" or "debt"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSale((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedProduct = inventory.find((item) => item.id === Number(sale.product))
    if (selectedProduct && Number(sale.quantity) > 0 && Number(sale.quantity) <= selectedProduct.quantity) {
      addSale({
        ...sale,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        date: new Date().toISOString().split("T")[0],
        id: Date.now(),
      })
      setShowForm(false)
      setSale({
        customerName: "",
        address: "",
        phoneNumber: "",
        product: "",
        quantity: "",
        paymentType: "paid",
      })
    } else {
      alert("Invalid product selection or insufficient quantity!")
    }
  }

  const formatNumber = (num) => {
    const parts = num.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  const filteredSales = sales.filter((sale) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      sale.customerName.toLowerCase().includes(searchLower) ||
      sale.productName.toLowerCase().includes(searchLower) ||
      sale.phoneNumber.includes(searchTerm) ||
      String(sale.quantity).includes(searchTerm)
    )
  })

  return (
    <main className="sales-page">
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
      <h2>Sales Management</h2>
      <div className="sales-actions">
        <button onClick={() => setShowForm(!showForm)} className="action-button">
          {showForm ? "Hide Sales Form" : "New Sale"}
        </button>
        <button onClick={() => setShowSalesHistory(!showSalesHistory)} className="action-button">
          {showSalesHistory ? "Hide Sales History" : "Show Sales History"}
        </button>
      </div>

      {showForm && (
        <div className="sales-form">
          <h3>New Sale</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="customerName">Customer Name</label>
              <input id="customerName" name="customerName" value={sale.customerName} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input id="address" name="address" value={sale.address} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" name="phoneNumber" value={sale.phoneNumber} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="product">Product</label>
              <select id="product" name="product" value={sale.product} onChange={handleChange} required>
                <option value="">Select a product</option>
                {inventory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - ₦{item.price} (Available: {item.quantity})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={sale.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="paymentType">Payment Type</label>
              <select id="paymentType" name="paymentType" value={sale.paymentType} onChange={handleChange} required>
                <option value="paid">Paid</option>
                <option value="debt">Debt</option>
              </select>
            </div>
            <button type="submit">Complete Sale</button>
          </form>
        </div>
      )}

      {showSalesHistory && (
        <div className="sales-history">
          <h3>Sales History</h3>
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search sales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price (₦)</th>
                <th>Total (₦)</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => {
                const total = sale.price * sale.quantity
                return (
                  <tr key={sale.id} className={sale.paymentType === "debt" ? "debt-row" : ""}>
                    <td>{sale.date}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.productName}</td>
                    <td>{formatNumber(sale.quantity)}</td>
                    <td>₦{formatNumber(sale.price.toFixed(2))}</td>
                    <td>₦{formatNumber(total.toFixed(2))}</td>
                    <td>
                      <span className={`payment-status ${sale.paymentType}`}>
                        {sale.paymentType === "paid" ? "Paid" : "Debt"}
                      
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default SalesForm

