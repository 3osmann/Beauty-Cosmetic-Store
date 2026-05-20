"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Package, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const STATUS_STEPS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"]

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  total: number
}

interface OrderDetailsProps {
  orderId?: string
  date?: string
  status?: string
  paymentMethod?: string
  subtotal?: number
  shipping?: number
  tax?: number
  discount?: number
  total?: number
  shippingAddress?: string
  items?: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

export function OrderDetails({
  orderId = "ORD-2024-001",
  date = "January 15, 2024",
  status = "SHIPPED",
  paymentMethod = "Credit Card",
  subtotal = 89.99,
  shipping = 0,
  tax = 7.20,
  discount = 0,
  total = 97.19,
  shippingAddress = "123 Main St, New York, NY 10001, United States",
  items = [
    { id: "1", name: "Rose Hydrating Serum", price: 49.99, quantity: 1, image: "/images/products/product-1.jpg", total: 49.99 },
    { id: "2", name: "Vitamin C Brightening Cream", price: 39.99, quantity: 1, image: "/images/products/product-2.jpg", total: 39.99 },
  ],
  trackingNumber = "1Z999AA10123456784",
  estimatedDelivery = "Jan 20, 2024",
}: OrderDetailsProps) {
  const [trackingExpanded, setTrackingExpanded] = useState(true)
  const currentStep = STATUS_STEPS.indexOf(status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Link
          href="/account/orders"
          className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Order #{orderId}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Placed on {date}</p>
        </div>
        <span className={cn(
          "ml-auto text-[10px] font-semibold uppercase px-3 py-1 rounded-full",
          STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
        )}>
          {status}
        </span>
      </div>

      {status !== "CANCELLED" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Order Progress</h3>
            {status !== "DELIVERED" && (
              <p className="text-xs text-gray-500">Estimated delivery: {estimatedDelivery}</p>
            )}
          </div>
          <div className="hidden sm:flex items-center justify-between">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStep
              const isCurrent = idx === currentStep

              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                        isCompleted
                          ? "bg-[#B76E79] text-white"
                          : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {idx + 1}
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium mt-1.5",
                      isCurrent ? "text-[#B76E79]" : isCompleted ? "text-gray-900" : "text-gray-400"
                    )}>
                      {step.charAt(0) + step.slice(1).toLowerCase()}
                    </span>
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-[2px] mx-2 mb-5 transition-colors duration-300",
                        idx < currentStep ? "bg-[#B76E79]" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Shipping Address</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{shippingAddress}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
          <p className="text-sm text-gray-600">{paymentMethod}</p>
          <p className="text-xs text-green-600 font-medium">Payment completed</p>
        </div>
      </div>

      {status === "SHIPPED" && trackingNumber && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setTrackingExpanded(!trackingExpanded)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-[#B76E79]" />
              <div className="text-left">
                <h3 className="text-sm font-semibold text-gray-900">Tracking Information</h3>
                <p className="text-xs text-gray-500 mt-0.5">{trackingNumber}</p>
              </div>
            </div>
            {trackingExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Items Ordered</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-zinc-50 flex-shrink-0 border border-black/5">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity} x {formatPrice(item.price)}</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{formatPrice(item.total)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="max-w-xs ml-auto space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">{formatPrice(tax)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount</span>
              <span className="text-green-600">-{formatPrice(discount)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
