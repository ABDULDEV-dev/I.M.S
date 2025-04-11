"use client"

import { useRef } from "react"
import BackToHomeButtom from "./BackToHomeButtom"
import { Printer } from "lucide-react"

function ReceiptPrinting({ currentSale, setCurrentPage }) {
  const receiptRef = useRef()

  // Add a check to handle if currentSale is null or undefined
  if (!currentSale) {
    return (
      <main className="receipt-printing">
        <BackToHomeButtom setCurrentPage={setCurrentPage} />
        <div className="no-receipt">
          <h2>No Receipt Selected</h2>
          <p>Please select a sale to print a receipt.</p>
          <button onClick={() => setCurrentPage("receipt-history")} className="action-button">
            Go to Receipt History
          </button>
        </div>
      </main>
    )
  }

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML
    const originalContent = document.body.innerHTML
    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent
    // Reattach event handlers after printing
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  const formatNumber = (num) => {
    const parts = num.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  const totalAmount = currentSale.price * currentSale.quantity

  return (
    <main className="receipt-printing">
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
      <div className="receipt-container">
        <div ref={receiptRef} className="receipt-content">
          <h2>Sales Receipt</h2>
          <div className="receipt-details">
            <p>
              <strong>Date:</strong> {currentSale.date}
            </p>
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
            <p>
              <strong>Payment Status:</strong> {currentSale.paymentType === "paid" ? "Paid" : "Debt"}
            </p>
          </div>
        </div>
        <button onClick={handlePrint} className="print-button">
          <Printer className="button-icon" />
          Print Receipt
        </button>
      </div>
    </main>
  )
}

export default ReceiptPrinting

