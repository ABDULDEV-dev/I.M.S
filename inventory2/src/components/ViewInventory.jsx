"use client"

import { useState } from "react"
import BackToHomeButtom from "./BackToHomeButtom"
import ProductForm from "./ProductForm"
import { Search } from "lucide-react"

function ViewInventory({ inventory, setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState("")

  const totalAmount = inventory.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + price * quantity
  }, 0)

  const formatNumber = (num) => {
    const parts = num.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  const filteredInventory = inventory.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      String(item.price).includes(searchTerm) ||
      String(item.quantity).includes(searchTerm)
    )
  })

  return (
    <main className="view-inventory">
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
    
      <h2>View Inventory</h2>
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₦)</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Total (₦)</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => {
            const price = Number(item.price) || 0
            const quantity = Number(item.quantity) || 0
            const total = price * quantity
            return (
              <tr key={item.id}>
                <td>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="product-image" />
                </td>
                <td>{item.name}</td>
                <td>₦{formatNumber(price.toFixed(2))}</td>
                <td>{item.category}</td>
                <td>{formatNumber(quantity)}</td>
                <td>₦{formatNumber(total.toFixed(2))}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="total-amount">
        <strong>Total Inventory Value: ₦{formatNumber(totalAmount.toFixed(2))}</strong>
      </div>
    </main>
  )
}

export default ViewInventory

