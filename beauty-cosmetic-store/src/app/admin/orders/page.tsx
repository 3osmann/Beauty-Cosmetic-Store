"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { OrdersTable } from "@/components/admin/OrdersTable"
import { OrderDetails } from "@/components/admin/OrderDetails"
import { motion } from "framer-motion"
import type { Order } from "@/types"

const ORDERS_DATA: Order[] = [
  {
    id: "ord-001",
    status: "PENDING",
    total: 96.99,
    subtotal: 87.99,
    shipping: 9.00,
    tax: 0,
    discount: 0,
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    shippingAddress: "123 Main St, New York, NY 10001",
    billingAddress: "123 Main St, New York, NY 10001",
    items: [
      { id: "item-1", orderId: "ord-001", productId: "prod-1", name: "Radiance Vitamin C Serum", price: 54.99, quantity: 1, total: 54.99 },
      { id: "item-2", orderId: "ord-001", productId: "prod-2", name: "HydraGlow Moisture Cream", price: 42.00, quantity: 1, total: 42.00 },
    ],
    createdAt: "2026-03-10T10:30:00",
    updatedAt: "2026-03-10T10:30:00",
  },
  {
    id: "ord-002",
    status: "PROCESSING",
    total: 54.99,
    subtotal: 54.99,
    shipping: 0,
    tax: 0,
    discount: 0,
    paymentMethod: "PayPal",
    paymentStatus: "PAID",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    billingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    items: [
      { id: "item-3", orderId: "ord-002", productId: "prod-1", name: "Radiance Vitamin C Serum", price: 54.99, quantity: 1, total: 54.99 },
    ],
    createdAt: "2026-03-09T14:00:00",
    updatedAt: "2026-03-09T14:00:00",
  },
  {
    id: "ord-003",
    status: "SHIPPED",
    total: 124.50,
    subtotal: 112.00,
    shipping: 12.50,
    tax: 0,
    discount: 0,
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    billingAddress: "789 Pine Rd, Chicago, IL 60601",
    items: [
      { id: "item-4", orderId: "ord-003", productId: "prod-5", name: "Repair & Restore Hair Oil", price: 32.00, quantity: 2, total: 64.00 },
      { id: "item-5", orderId: "ord-003", productId: "prod-6", name: "Gentle Cleansing Balm", price: 36.00, quantity: 1, total: 36.00 },
    ],
    createdAt: "2026-03-08T09:00:00",
    updatedAt: "2026-03-08T09:00:00",
  },
  {
    id: "ord-004",
    status: "DELIVERED",
    total: 32.00,
    subtotal: 32.00,
    shipping: 0,
    tax: 0,
    discount: 0,
    paymentMethod: "Stripe",
    paymentStatus: "PAID",
    shippingAddress: "321 Elm St, Miami, FL 33101",
    billingAddress: "321 Elm St, Miami, FL 33101",
    items: [
      { id: "item-6", orderId: "ord-004", productId: "prod-4", name: "Velvet Matte Lipstick - Rose Petal", price: 24.99, quantity: 1, total: 24.99 },
    ],
    createdAt: "2026-03-05T11:00:00",
    updatedAt: "2026-03-05T11:00:00",
  },
  {
    id: "ord-005",
    status: "CANCELLED",
    total: 189.99,
    subtotal: 189.99,
    shipping: 0,
    tax: 0,
    discount: 0,
    paymentMethod: "PayPal",
    paymentStatus: "REFUNDED",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
    billingAddress: "654 Maple Dr, Seattle, WA 98101",
    items: [
      { id: "item-7", orderId: "ord-005", productId: "prod-12", name: "Elegance Eau de Parfum - 50ml", price: 89.00, quantity: 1, total: 89.00 },
    ],
    createdAt: "2026-03-01T16:00:00",
    updatedAt: "2026-03-01T16:00:00",
  },
]

export default function AdminOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={selectedOrder ? `Order #${selectedOrder.id.slice(0, 8)}` : "Orders"}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {selectedOrder ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-sm text-[#B76E79] hover:text-[#A45A65] mb-4 inline-block"
              >
                &larr; Back to Orders
              </button>
              <OrderDetails
                order={selectedOrder}
                onStatusUpdate={(id, status) => {
                  console.log("Status update:", id, status)
                }}
                onClose={() => setSelectedOrder(null)}
              />
            </motion.div>
          ) : (
            <div className="space-y-6">
              <h2 className="font-heading text-lg font-semibold">All Orders ({ORDERS_DATA.length})</h2>
              <OrdersTable
                orders={ORDERS_DATA}
                onView={(order) => setSelectedOrder(order)}
                onProcess={(order) => console.log("Process:", order.id)}
                onShip={(order) => console.log("Ship:", order.id)}
                onComplete={(order) => console.log("Complete:", order.id)}
                onCancel={(order) => console.log("Cancel:", order.id)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
