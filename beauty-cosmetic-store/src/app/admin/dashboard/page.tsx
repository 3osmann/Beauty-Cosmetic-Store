"use client"

import { useState } from "react"
import { StatsCards } from "@/components/admin/StatsCards"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, ShoppingCart, DollarSign, Package, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 28500, orders: 180 },
  { month: "Feb", revenue: 32100, orders: 210 },
  { month: "Mar", revenue: 29800, orders: 195 },
  { month: "Apr", revenue: 35600, orders: 240 },
  { month: "May", revenue: 38900, orders: 265 },
  { month: "Jun", revenue: 42300, orders: 290 },
]

const categorySales = [
  { name: "Makeup", sales: 35 },
  { name: "Skincare", sales: 28 },
  { name: "Hair Care", sales: 18 },
  { name: "Body Care", sales: 12 },
  { name: "Other", sales: 7 },
]

const recentOrders = [
  { id: "#ORD-1042", customer: "Sophie Laurent", status: "Delivered", total: 96.99, date: "2 min ago" },
  { id: "#ORD-1041", customer: "Emma Richardson", status: "Processing", total: 54.99, date: "15 min ago" },
  { id: "#ORD-1040", customer: "Maria Chen", status: "Shipped", total: 124.50, date: "1 hour ago" },
  { id: "#ORD-1039", customer: "Jessica Williams", status: "Pending", total: 32.00, date: "3 hours ago" },
  { id: "#ORD-1038", customer: "Olivia Martinez", status: "Delivered", total: 189.99, date: "5 hours ago" },
]

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Dashboard" onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6"
            >
              <h3 className="font-heading font-semibold mb-4">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#B76E79"
                    strokeWidth={2}
                    dot={{ fill: "#B76E79" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6"
            >
              <h3 className="font-heading font-semibold mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categorySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#B76E79" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6"
          >
            <h3 className="font-heading font-semibold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 font-medium text-muted-foreground">Order</th>
                    <th className="text-left pb-3 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left pb-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left pb-3 font-medium text-muted-foreground">Total</th>
                    <th className="text-right pb-3 font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-3 font-mono text-xs font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-medium",
                            order.status === "Delivered" && "bg-green-100 text-green-700",
                            order.status === "Processing" && "bg-blue-100 text-blue-700",
                            order.status === "Shipped" && "bg-purple-100 text-purple-700",
                            order.status === "Pending" && "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 font-medium">${order.total.toFixed(2)}</td>
                      <td className="py-3 text-right text-muted-foreground text-xs">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
