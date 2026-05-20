"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CouponInput } from "./CouponInput"
import { ShippingCalculator } from "./ShippingCalculator"
import { useState } from "react"

interface CartSummaryProps {
  couponDiscount?: number
  couponCode?: string | null
  onApplyCoupon?: (code: string) => void
  onRemoveCoupon?: () => void
  shipping?: number
  tax?: number
}

export function CartSummary({
  couponDiscount = 0,
  couponCode = null,
  onApplyCoupon,
  onRemoveCoupon,
  shipping = 0,
  tax = 0,
}: CartSummaryProps) {
  const subtotal = useCartStore((s) => s.subtotal())
  const [calculatedShipping, setCalculatedShipping] = useState(shipping)
  const [calculatedTax] = useState(tax)

  const total = subtotal - couponDiscount + calculatedShipping + calculatedTax

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 sticky top-24"
    >
      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>

      <CouponInput
        onApply={onApplyCoupon}
        onRemove={onRemoveCoupon}
        appliedCode={couponCode}
      />

      <ShippingCalculator onShippingCalculated={setCalculatedShipping} />

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">Coupon Discount</span>
            <span className="font-medium text-green-600">-{formatPrice(couponDiscount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {calculatedShipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(calculatedShipping)
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{formatPrice(calculatedTax)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
      </div>

      <Link href="/checkout">
        <Button variant="primary" size="lg" className="w-full">
          Proceed to Checkout
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>

      <Link
        href="/shop"
        className="block text-center text-sm text-gray-500 hover:text-[#B76E79] transition-colors"
      >
        Continue Shopping
      </Link>

      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4" />
        <span>Secure checkout with SSL encryption</span>
      </div>
    </motion.div>
  )
}
