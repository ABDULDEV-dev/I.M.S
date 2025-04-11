"use client"

import { useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, NairaSign, ShoppingCart } from "lucide-react"

function SalesOverview({ sales = [] }) {
  const [timeRange, setTimeRange] = useState("weekly") // weekly, monthly, yearly

  const processedData = useMemo(() => {
    const now = new Date()
    const periods = {
      weekly: 7,
      monthly: 30,
      yearly: 12,
    }

    if (timeRange === "yearly") {
      // Group by months for yearly view
      const monthlyData = Array(12)
        .fill(0)
        .map((_, index) => {
          const monthSales = sales.filter((sale) => {
            const saleDate = new Date(sale.date)
            return saleDate.getMonth() === index && saleDate.getFullYear() === now.getFullYear()
          })

          const totalAmount = monthSales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0)
          const count = monthSales.length

          return {
            name: new Date(now.getFullYear(), index).toLocaleString("default", { month: "short" }),
            amount: totalAmount,
            count: count,
          }
        })

      return monthlyData
    } else {
      // Group by days for weekly/monthly view
      const days = periods[timeRange]
      return Array(days)
        .fill(0)
        .map((_, index) => {
          const date = new Date(now)
          date.setDate(date.getDate() - (days - 1 - index))

          const daySales = sales.filter((sale) => {
            const saleDate = new Date(sale.date)
            return saleDate.toDateString() === date.toDateString()
          })

          const totalAmount = daySales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0)
          const count = daySales.length

          return {
            name: date.toLocaleDateString("default", { month: "short", day: "numeric" }),
            amount: totalAmount,
            count: count,
          }
        })
    }
  }, [sales, timeRange])

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0)
    const totalCount = sales.length
    const averageSale = totalCount > 0 ? totalSales / totalCount : 0

    // Calculate payment type distribution
    const paymentTypes = sales.reduce((acc, sale) => {
      acc[sale.paymentType] = (acc[sale.paymentType] || 0) + 1
      return acc
    }, {})

    return {
      totalSales,
      totalCount,
      averageSale,
      paymentTypes,
    }
  }, [sales])

  const formatNumber = (num) => {
    return num.toLocaleString("en-NG", { style: "currency", currency: "NGN" })
  }

  const COLORS = ["#22c55e", "#ef4444"]

  const pieData = [
    { name: "Paid", value: summary.paymentTypes.paid || 0 },
    { name: "Debt", value: summary.paymentTypes.debt || 0 },
  ]

  return (
    <div className="sales-overview">
      <div className="overview-header">
        <h3>Sales Overview</h3>
        <div className="time-range-selector">
          <button className={timeRange === "weekly" ? "active" : ""} onClick={() => setTimeRange("weekly")}>
            Weekly
          </button>
          <button className={timeRange === "monthly" ? "active" : ""} onClick={() => setTimeRange("monthly")}>
            Monthly
          </button>
          <button className={timeRange === "yearly" ? "active" : ""} onClick={() => setTimeRange("yearly")}>
            Yearly
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">
            <DollarSign className="icon" />
          </div>
          <div className="card-content">
            <h4>Total Sales</h4>
            <p>{formatNumber(summary.totalSales)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">
            <ShoppingCart className="icon" />
          </div>
          <div className="card-content">
            <h4>Total Orders</h4>
            <p>{summary.totalCount}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">
            <TrendingUp className="icon" />
          </div>
          <div className="card-content">
            <h4>Average Sale</h4>
            <p>{formatNumber(summary.averageSale)}</p>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h4>Sales Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} labelStyle={{ color: "#666" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Sales Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="charts-row">
          <div className="chart-wrapper">
            <h4>Orders Count</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" name="Number of Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-wrapper">
            <h4>Payment Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesOverview

