"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Wallet, Truck } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UseFormReturn } from "react-hook-form"

const PAYMENT_OPTIONS = [
  { id: "card", label: "Credit Card", icon: CreditCard, description: "Pay with Visa, Mastercard, or Amex" },
  { id: "paypal", label: "PayPal", icon: Wallet, description: "Fast & secure PayPal checkout" },
  { id: "cod", label: "Cash on Delivery", icon: Truck, description: "Pay when you receive" },
] as const

interface PaymentMethodProps {
  value: string
  onChange: (value: string) => void
  form: UseFormReturn<any>
}

export function PaymentMethod({ value, onChange, form }: PaymentMethodProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>

      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => {
          const Icon = option.icon
          const selected = value === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                selected
                  ? "border-[#B76E79] bg-[#B76E79]/5"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <div
                className={cn(
                  "h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                  selected ? "border-[#B76E79]" : "border-gray-300"
                )}
              >
                {selected && <div className="h-2.5 w-2.5 rounded-full bg-[#B76E79]" />}
              </div>
              <Icon className={cn("h-5 w-5", selected ? "text-[#B76E79]" : "text-gray-400")} />
              <div>
                <span className={cn(
                  "text-sm font-medium",
                  selected ? "text-[#B76E79]" : "text-gray-900"
                )}>
                  {option.label}
                </span>
                <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {value === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="space-y-1.5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <p className="text-xs text-red-500">{errors.cardNumber.message as string}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input id="cardExpiry" placeholder="MM/YY" {...register("cardExpiry")} />
                  {errors.cardExpiry && (
                    <p className="text-xs text-red-500">{errors.cardExpiry.message as string}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input id="cardCvc" placeholder="123" {...register("cardCvc")} />
                  {errors.cardCvc && (
                    <p className="text-xs text-red-500">{errors.cardCvc.message as string}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
