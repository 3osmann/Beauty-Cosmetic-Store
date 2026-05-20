"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Lock, ShieldCheck } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  compact?: boolean
}

export function OrderSummary({ compact = false }: OrderSummaryProps) {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal())

  const shippingCost = 0
  const tax = subtotal * 0.08
  const discount = 0
  const total = subtotal + shippingCost + tax - discount

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {compact ? "Order Summary" : "Order Summary"}
      </h3>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-zinc-50 flex-shrink-0 border border-black/5">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
              {item.variant && (
                <p className="text-xs text-gray-400 mt-0.5">{item.variant.name}</p>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">FREE</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
      </div>

      {!compact && (
        <>
          <Button variant="primary" size="lg" className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            Place Order
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Secure checkout with SSL encryption</span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            {["Visa", "Mastercard", "Amex", "PayPal"].map((brand) => (
              <span key={brand} className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                {brand}
              </span>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
