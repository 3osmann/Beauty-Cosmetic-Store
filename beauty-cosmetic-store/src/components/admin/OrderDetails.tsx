"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Order } from "@/types"

interface OrderDetailsProps {
  order: Order
  onStatusUpdate?: (orderId: string, status: Order["status"]) => void
  onClose?: () => void
}

const STATUS_FLOW: Order["status"][] = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
]

const TIMELINE = [
  { status: "PENDING", label: "Order Placed", date: "2026-03-10T10:30:00" },
  { status: "PROCESSING", label: "Processing", date: "2026-03-10T14:00:00" },
  { status: "SHIPPED", label: "Shipped", date: "2026-03-11T09:00:00" },
  { status: "DELIVERED", label: "Delivered", date: "" },
]

export function OrderDetails({ order, onStatusUpdate, onClose }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading text-xl font-semibold">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={order.status}
              onChange={(e) =>
                onStatusUpdate?.(order.id, e.target.value as Order["status"])
              }
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REFUNDED">Refunded</option>
            </select>
            {onClose && (
              <Button variant="secondary" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="bg-muted rounded-lg p-3">
            <span className="text-muted-foreground block">Subtotal</span>
            <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <span className="text-muted-foreground block">Shipping</span>
            <span className="font-semibold">${order.shipping.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="bg-muted rounded-lg p-3">
              <span className="text-muted-foreground block">Discount</span>
              <span className="font-semibold text-green-600">
                -${order.discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="bg-muted rounded-lg p-3">
            <span className="text-muted-foreground block">Tax</span>
            <span className="font-semibold">${order.tax.toFixed(2)}</span>
          </div>
          <div className="bg-[#B76E79]/10 rounded-lg p-3">
            <span className="text-muted-foreground block">Total</span>
            <span className="font-semibold text-[#B76E79]">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
          <h4 className="font-heading font-semibold mb-3">Customer</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Name:</span>{" "}
              {order.userId || "Guest Customer"}
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span>{" "}
              guest@example.com
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
          <h4 className="font-heading font-semibold mb-3">Payment</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Method:</span>{" "}
              {order.paymentMethod}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              <Badge
                className={cn(
                  order.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                )}
              >
                {order.paymentStatus}
              </Badge>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
          <h4 className="font-heading font-semibold mb-3">Shipping Address</h4>
          <p className="text-sm whitespace-pre-line">{order.shippingAddress}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
          <h4 className="font-heading font-semibold mb-3">Billing Address</h4>
          <p className="text-sm whitespace-pre-line">{order.billingAddress}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
        <h4 className="font-heading font-semibold mb-4">Order Items</h4>
        <div className="divide-y divide-border">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              <div className="w-14 h-14 rounded-md bg-muted overflow-hidden shrink-0">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-medium">${item.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
        <h4 className="font-heading font-semibold mb-4">Order Timeline</h4>
        <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-0.5 before:bg-border">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div
                className={cn(
                  "absolute -left-[22px] w-3.5 h-3.5 rounded-full border-2 mt-1",
                  item.date
                    ? "bg-[#B76E79] border-[#B76E79]"
                    : "bg-white border-border"
                )}
              />
              <p className="text-sm font-medium">{item.label}</p>
              {item.date && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(item.date).toLocaleString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
