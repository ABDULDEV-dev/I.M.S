"use client"

import { useState } from "react"
import BackToHomeButtom from "./BackToHomeButtom"
import { Search, Plus, User, Phone, DollarSign, Calendar, FileText, CheckCircle2, XCircle } from "lucide-react"

function DebtBook({ debts = [], addDebt, updateDebtStatus, setCurrentPage }) {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newDebt, setNewDebt] = useState({
    customerName: "",
    phoneNumber: "",
    amount: "",
    dueDate: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewDebt((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addDebt({ ...newDebt, id: Date.now(), status: "pending", date: new Date().toISOString().split("T")[0] })
    setNewDebt({
      customerName: "",
      phoneNumber: "",
      amount: "",
      dueDate: "",
      description: "",
    })
    setShowForm(false)
  }

  const formatNumber = (num) => {
    const parts = num.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  const filteredDebts = debts.filter((debt) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      debt.customerName.toLowerCase().includes(searchLower) ||
      debt.phoneNumber.includes(searchTerm) ||
      debt.description.toLowerCase().includes(searchLower) ||
      String(debt.amount).includes(searchTerm)
    )
  })

  return (
    <main className="debt-book">
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
      <h2>Debt Book</h2>
      <button onClick={() => setShowForm(!showForm)} className="action-button">
        {showForm ? (
          <>
            <XCircle className="button-icon" />
            Hide Form
          </>
        ) : (
          <>
            <Plus className="button-icon" />
            Add New Debt
          </>
        )}
      </button>

      {showForm && (
        <div className="debt-form">
          <h3>Add New Debt</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">
                <User className="form-icon" />
                Customer Name
              </label>
              <input
                id="customerName"
                name="customerName"
                value={newDebt.customerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">
                <Phone className="form-icon" />
                Phone Number
              </label>
              <input id="phoneNumber" name="phoneNumber" value={newDebt.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">
                <DollarSign className="form-icon" />
                Amount (₦)
              </label>
              <input id="amount" name="amount" type="number" value={newDebt.amount} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">
                <Calendar className="form-icon" />
                Due Date
              </label>
              <input id="dueDate" name="dueDate" type="date" value={newDebt.dueDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <FileText className="form-icon" />
                Description
              </label>
              <input id="description" name="description" value={newDebt.description} onChange={handleChange} required />
            </div>
            <button type="submit">
              <Plus className="button-icon" />
              Add Debt
            </button>
          </form>
        </div>
      )}

      <div className="debt-list">
        <h3>Debt Records</h3>
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search debts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Amount (₦)</th>
                <th>Due Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDebts.map((debt) => (
                <tr key={debt.id} className={debt.status === "paid" ? "paid-debt" : ""}>
                  <td>{debt.date}</td>
                  <td>{debt.customerName}</td>
                  <td>{debt.phoneNumber}</td>
                  <td>₦{formatNumber(Number(debt.amount).toFixed(2))}</td>
                  <td>{debt.dueDate}</td>
                  <td>{debt.description}</td>
                  <td>
                    <span className={`status-badge ${debt.status}`}>
                      {debt.status === "paid" ? (
                        <CheckCircle2 className="status-icon paid" />
                      ) : (
                        <XCircle className="status-icon pending" />
                      )}
                      {debt.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td>
                    {debt.status === "pending" && (
                      <button onClick={() => updateDebtStatus(debt.id, "paid")} className="icon-button success">
                        <CheckCircle2 className="button-icon-small" />
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default DebtBook

