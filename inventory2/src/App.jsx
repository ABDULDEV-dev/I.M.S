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
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [inventory, setInventory] = useState([])
  const [companyInfo, setCompanyInfo] = useState({ name: "", image: "" })

  useEffect(() => {
    const storedName = localStorage.getItem("companyName")
    const storedImage = localStorage.getItem("companyImage")
    if (storedName && storedImage) {
      setCompanyInfo({ name: storedName, image: storedImage })
    }
  }, [])

  const addProduct = (product) => {
    setInventory([...inventory, { ...product, id: Date.now() }])
  }

  const updateQuantity = (id, change) => {
    setInventory(
      inventory.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item)),
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} companyInfo={companyInfo} />
      case "add-product":
        return <ProductForm addProduct={addProduct} setCurrentPage={setCurrentPage} />
      case "view-inventory":
        return <ViewInventory inventory={inventory} setCurrentPage={setCurrentPage} />
      case "manage-inventory":
        return <ManageInventory inventory={inventory} updateQuantity={updateQuantity} setCurrentPage={setCurrentPage} />
      case "developer-details":
        return <DeveloperDetails setCurrentPage={setCurrentPage} />
      case "login":
        return <LoginForm setCurrentPage={setCurrentPage} />
      case "signup":
        return <SignupForm setCurrentPage={setCurrentPage} />
      case "user-details":
        return <UserDetails setCurrentPage={setCurrentPage} companyInfo={companyInfo} />
      default:
        return <HomePage setCurrentPage={setCurrentPage} companyInfo={companyInfo} />
    }
  }

  return (
    <div className="app">
      <Header setCurrentPage={setCurrentPage} companyInfo={companyInfo} />
      {renderPage()}
    </div>
  )
}

export default App

