"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Eye, Send, Truck, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Order } from "@/types"

interface OrdersTableProps {
  orders: Order[]
  onView?: (order: Order) => void
  onProcess?: (order: Order) => void
  onShip?: (order: Order) => void
  onComplete?: (order: Order) => void
  onCancel?: (order: Order) => void
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  REFUNDED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
}

export function OrdersTable({
  orders,
  onView,
  onProcess,
  onShip,
  onComplete,
  onCancel,
}: OrdersTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const statuses = ["all", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                statusFilter === s
                  ? "bg-[#B76E79] text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Payment</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <td className="p-3 font-mono text-xs font-medium">#{order.id.slice(0, 8)}</td>
                <td className="p-3">{order.userId || "Guest"}</td>
                <td className="p-3 text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Badge className={cn("text-xs font-medium", STATUS_STYLES[order.status])}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-3 font-medium">${order.total.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : order.paymentStatus === "FAILED"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    )}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onView?.(order)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {order.status === "PENDING" && (
                      <button
                        onClick={() => onProcess?.(order)}
                        className="p-1.5 rounded-md hover:bg-blue-50 text-muted-foreground hover:text-blue-500 transition-colors"
                        title="Process"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    {order.status === "PROCESSING" && (
                      <button
                        onClick={() => onShip?.(order)}
                        className="p-1.5 rounded-md hover:bg-purple-50 text-muted-foreground hover:text-purple-500 transition-colors"
                        title="Ship"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                    )}
                    {order.status === "SHIPPED" && (
                      <button
                        onClick={() => onComplete?.(order)}
                        className="p-1.5 rounded-md hover:bg-green-50 text-muted-foreground hover:text-green-500 transition-colors"
                        title="Complete"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    {(order.status === "PENDING" || order.status === "PROCESSING") && (
                      <button
                        onClick={() => onCancel?.(order)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Cancel"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
