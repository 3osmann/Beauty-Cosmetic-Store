"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CouponInputProps {
  onApply?: (code: string) => void
  onRemove?: () => void
  appliedCode?: string | null
}

export function CouponInput({ onApply, onRemove, appliedCode }: CouponInputProps) {
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle")

  const handleApply = () => {
    if (!code.trim()) return
    if (code.trim().toLowerCase() === "beaute20") {
      setStatus("valid")
      onApply?.(code.trim())
    } else {
      setStatus("invalid")
      setTimeout(() => setStatus("idle"), 2500)
    }
  }

  const handleRemove = () => {
    setCode("")
    setStatus("idle")
    onRemove?.()
  }

  if (appliedCode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <div>
            <span className="text-sm font-medium text-green-800">{appliedCode}</span>
            <span className="text-xs text-green-600 ml-2">applied</span>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="h-6 w-6 flex items-center justify-center rounded-full text-green-600 hover:bg-green-100 transition-colors"
          aria-label="Remove coupon"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase())
              setStatus("idle")
            }}
            placeholder="Coupon code"
            className={cn(
              "w-full h-10 pl-9 pr-3 text-sm rounded-lg border transition-colors duration-200 outline-none",
              status === "invalid"
                ? "border-red-300 bg-red-50 text-red-900"
                : "border-gray-200 bg-white text-gray-900 focus:border-[#B76E79]"
            )}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleApply}
          disabled={!code.trim()}
        >
          Apply
        </Button>
      </div>

      <AnimatePresence>
        {status === "invalid" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1 text-xs text-red-500 mt-1.5"
          >
            <AlertCircle className="h-3 w-3" />
            Invalid coupon code
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
