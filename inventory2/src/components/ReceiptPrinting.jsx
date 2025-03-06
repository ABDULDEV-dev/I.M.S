"use client"

import { useRef } from "react"
import BackToHomeButtom from "./BackToHomeButtom"

function ReceiptPrinting({ currentSale, setCurrentPage }) {
  const receiptRef = useRef()

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML
    const originalContent = document.body.innerHTML
    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent
  }

  const formatNumber = (num) => {
    const parts = num.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  const totalAmount = currentSale.price * currentSale.quantity

  return (
    <main className="receipt-printing">
      <div ref={receiptRef}>
        <h2>Sales Receipt</h2>
        <div className="receipt-content">
          <p>
            <strong>Customer Name:</strong> {currentSale.customerName}
          </p>
          <p>
            <strong>Address:</strong> {currentSale.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {currentSale.phoneNumber}
          </p>
          <p>
            <strong>Product:</strong> {currentSale.productName}
          </p>
          <p>
            <strong>Quantity:</strong> {formatNumber(currentSale.quantity)}
          </p>
          <p>
            <strong>Price per Unit:</strong> ₦{formatNumber(currentSale.price.toFixed(2))}
          </p>
          <p>
            <strong>Total Amount:</strong> ₦{formatNumber(totalAmount.toFixed(2))}
          </p>
        </div>
      </div>
      <button onClick={handlePrint}>Print Receipt</button>
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
    </main>
  )
}

export default ReceiptPrinting

