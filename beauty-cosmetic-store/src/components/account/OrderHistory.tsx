"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

interface Order {
  id: string
  orderId: string
  date: string
  status: string
  total: number
  items: number
  paymentMethod: string
}

interface OrderHistoryProps {
  orders?: Order[]
}

const MOCK_ORDERS: Order[] = [
  { id: "1", orderId: "ORD-2024-001", date: "Jan 15, 2024", status: "DELIVERED", total: 89.99, items: 3, paymentMethod: "Credit Card" },
  { id: "2", orderId: "ORD-2024-002", date: "Feb 20, 2024", status: "SHIPPED", total: 145.50, items: 5, paymentMethod: "PayPal" },
  { id: "3", orderId: "ORD-2024-003", date: "Mar 10, 2024", status: "PROCESSING", total: 230.00, items: 7, paymentMethod: "Credit Card" },
  { id: "4", orderId: "ORD-2024-004", date: "Apr 05, 2024", status: "CANCELLED", total: 54.99, items: 2, paymentMethod: "Cash on Delivery" },
  { id: "5", orderId: "ORD-2024-005", date: "May 01, 2024", status: "DELIVERED", total: 199.99, items: 4, paymentMethod: "PayPal" },
]

const ITEMS_PER_PAGE = 3

export function OrderHistory({ orders = MOCK_ORDERS }: OrderHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter)

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
        <p className="text-sm text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
        <Link href="/shop">
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="all">All Orders</option>
            <option value="DELIVERED">Delivered</option>
            <option value="SHIPPED">Shipped</option>
            <option value="PROCESSING">Processing</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div>Order ID</div>
          <div>Date</div>
          <div>Status</div>
          <div>Total</div>
          <div>Items</div>
          <div />
        </div>

        <div className="divide-y divide-gray-100">
          {paginated.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={`/account/orders/${order.id}`}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_0.5fr] gap-3 md:gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
              >
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Order ID</p>
                  <p className="text-sm font-medium text-gray-900">{order.orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Date</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Status</p>
                  <span className={cn(
                    "inline-block text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full",
                    STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                  )}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Total</p>
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Items</p>
                  <p className="text-sm text-gray-600">{order.items}</p>
                </div>
                <div className="hidden md:flex justify-end">
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              "h-9 w-9 rounded-lg flex items-center justify-center text-sm transition-colors",
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
                page === currentPage
                  ? "bg-[#B76E79] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "h-9 w-9 rounded-lg flex items-center justify-center text-sm transition-colors",
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  )
}
