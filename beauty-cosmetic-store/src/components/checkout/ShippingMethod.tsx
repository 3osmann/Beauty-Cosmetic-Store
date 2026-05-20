"use client"

import { cn, formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"
import { Clock, Zap, Rocket } from "lucide-react"

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard",
    duration: "5-7 business days",
    cost: 0,
    icon: Clock,
    description: "Free delivery on all orders",
  },
  {
    id: "express",
    label: "Express",
    duration: "2-3 business days",
    cost: 12.99,
    icon: Zap,
    description: "Fast tracked delivery",
  },
  {
    id: "overnight",
    label: "Overnight",
    duration: "1 business day",
    cost: 24.99,
    icon: Rocket,
    description: "Next day delivery",
  },
] as const

interface ShippingMethodProps {
  value: string
  onChange: (value: string) => void
}

export function ShippingMethod({ value, onChange }: ShippingMethodProps) {
  return (
    <div className="space-y-3">
      {SHIPPING_OPTIONS.map((option, idx) => {
        const Icon = option.icon
        const selected = value === option.id

        return (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <button
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

              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                selected ? "bg-[#B76E79] text-white" : "bg-gray-100 text-gray-500"
              )}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm font-medium",
                    selected ? "text-[#B76E79]" : "text-gray-900"
                  )}>
                    {option.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {option.cost === 0 ? "FREE" : formatPrice(option.cost)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{option.duration}</p>
                <p className="text-xs text-gray-400 mt-0.5">{option.description}</p>
              </div>
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}
