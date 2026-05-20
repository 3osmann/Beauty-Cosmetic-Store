"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Package, ArrowLeft, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ORDERS = [
  { id: "ORD-001", date: "2026-03-10", status: "DELIVERED", total: 96.99, items: 3, payment: "PAID" },
  { id: "ORD-002", date: "2026-03-05", status: "SHIPPED", total: 54.99, items: 1, payment: "PAID" },
  { id: "ORD-003", date: "2026-02-28", status: "PROCESSING", total: 124.50, items: 4, payment: "PAID" },
  { id: "ORD-004", date: "2026-02-15", status: "CANCELLED", total: 32.00, items: 1, payment: "REFUNDED" },
  { id: "ORD-005", date: "2026-02-10", status: "DELIVERED", total: 189.99, items: 5, payment: "PAID" },
]

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <Link href="/account" className="inline-flex items-center gap-1 text-sm text-[#B76E79] hover:text-[#A45A65] mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">{ORDERS.length} total orders</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {ORDERS.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link href="/shop">
              <Button className="bg-[#B76E79] hover:bg-[#A45A65] text-white">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {ORDERS.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-lg border border-border p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-mono font-bold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.items} items</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={cn("text-xs", STATUS_STYLES[order.status])}>
                        {order.status}
                      </Badge>
                      <p className="text-sm font-bold mt-1">${order.total.toFixed(2)}</p>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
