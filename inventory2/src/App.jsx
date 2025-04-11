"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import ProductForm from "./components/ProductForm"
import ViewInventory from "./components/ViewInventory"
import ManageInventory from "./components/ManageInventory"
import DeveloperDetails from "./components/DeveloperDetails"
import LoginForm from "./components/LogingForm"
import SignupForm from "./components/SignupForm"
import UserDetails from "./components/UserDetails"
import SalesForm from "./components/Salesform"
import ReceiptPrinting from "./components/ReceiptPrinting"
import DebtBook from "./components/DebtBook"
import ReceiptHistory from "./components/ReceiptHistory"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [inventory, setInventory] = useState([])
  const [currentSale, setCurrentSale] = useState(null)
  const [companyInfo, setCompanyInfo] = useState({ name: "", image: "" })
  const [debts, setDebts] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    const storedName = localStorage.getItem("companyName")
    const storedImage = localStorage.getItem("companyImage")
    if (storedName && storedImage) {
      setCompanyInfo({ name: storedName, image: storedImage })
    }

    // Load debts and sales from localStorage if available
    const storedDebts = localStorage.getItem("debts")
    const storedSales = localStorage.getItem("sales")
    if (storedDebts) {
      setDebts(JSON.parse(storedDebts))
    }
    if (storedSales) {
      setSales(JSON.parse(storedSales))
    }
  }, [])

  // Save debts and sales to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("debts", JSON.stringify(debts))
  }, [debts])

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales))
  }, [sales])

  const addProduct = (product) => {
    setInventory([...inventory, { ...product, id: Date.now() }])
  }

  const updateQuantity = (id, change) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, Number(item.quantity) + change) } : item,
      ),
    )
  }

  const addSale = (sale) => {
    const newSale = {
      ...sale,
      id: Date.now(),
    }
    setCurrentSale(newSale)
    setSales([...sales, newSale])

    // If sale is on debt, add to debt book
    if (sale.paymentType === "debt") {
      const debtRecord = {
        id: Date.now(),
        customerName: sale.customerName,
        phoneNumber: sale.phoneNumber,
        amount: sale.price * sale.quantity,
        date: sale.date,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
        description: `Purchase of ${sale.quantity} ${sale.productName}`,
        status: "pending",
        saleId: newSale.id, // Link to the sale
      }
      setDebts([...debts, debtRecord])
    }

    // Update inventory
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === Number(sale.product)
          ? { ...item, quantity: Math.max(0, Number(item.quantity) - Number(sale.quantity)) }
          : item,
      ),
    )
  }

  const addDebt = (debt) => {
    setDebts([...debts, debt])
  }

  const updateDebtStatus = (id, status) => {
    setDebts(debts.map((debt) => (debt.id === id ? { ...debt, status } : debt)))
  }

  const updateSalePaymentStatus = (saleId, paymentType) => {
    setSales(sales.map((sale) => (sale.id === saleId ? { ...sale, paymentType } : sale)))
  }

  const handlePageChange = (page) => {
    // If navigating away from receipt printing, clear the current sale
    if (currentPage === "receipt-printing" && page !== "receipt-printing") {
      setCurrentSale(null)
    }
    setCurrentPage(page)
  }

  const handleSetCurrentSale = (sale) => {
    console.log("Setting current sale:", sale)
    setCurrentSale(sale)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={handlePageChange} />
      case "add-product":
        return <ProductForm addProduct={addProduct} setCurrentPage={handlePageChange} />
      case "view-inventory":
        return <ViewInventory inventory={inventory} setCurrentPage={handlePageChange} />
      case "manage-inventory":
        return (
          <ManageInventory inventory={inventory} updateQuantity={updateQuantity} setCurrentPage={handlePageChange} />
        )
      case "developer-details":
        return <DeveloperDetails setCurrentPage={handlePageChange} />
      case "login":
        return <LoginForm setCurrentPage={handlePageChange} />
      case "signup":
        return <SignupForm setCurrentPage={handlePageChange} />
      case "user-details":
        return <UserDetails setCurrentPage={handlePageChange} companyInfo={companyInfo} />
      case "sales":
        return <SalesForm inventory={inventory} addSale={addSale} sales={sales} setCurrentPage={handlePageChange} />
      case "receipt-printing":
        return <ReceiptPrinting currentSale={currentSale} setCurrentPage={handlePageChange} />
      case "receipt-history":
        return <ReceiptHistory sales={sales} setCurrentPage={handlePageChange} setCurrentSale={handleSetCurrentSale} />
      case "debt-book":
        return (
          <DebtBook
            debts={debts}
            addDebt={addDebt}
            updateDebtStatus={updateDebtStatus}
            setCurrentPage={handlePageChange}
            updateSalePaymentStatus={updateSalePaymentStatus}
          />
        )
      default:
        return <HomePage setCurrentPage={handlePageChange} />
    }
  }

  return (
    <div className="app">
      <Header setCurrentPage={handlePageChange} companyInfo={companyInfo} />
      {renderPage()}
    </div>
  )
}

export default App

