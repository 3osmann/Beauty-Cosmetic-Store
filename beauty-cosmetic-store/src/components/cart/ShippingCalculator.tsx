"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, Loader2 } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
]

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "France",
  "Germany",
  "Italy",
  "Spain",
]

interface ShippingCalculatorProps {
  onShippingCalculated?: (cost: number) => void
}

export function ShippingCalculator({ onShippingCalculated }: ShippingCalculatorProps) {
  const [country, setCountry] = useState("United States")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [calculating, setCalculating] = useState(false)
  const [result, setResult] = useState<{ cost: number; label: string } | null>(null)
  const [expanded, setExpanded] = useState(false)

  const handleCalculate = () => {
    setCalculating(true)
    setResult(null)

    setTimeout(() => {
      const cost = country === "United States" ? 0 : 15.99
      const label = country === "United States" ? "Free Shipping" : "International Shipping"
      setResult({ cost, label })
      setCalculating(false)
      onShippingCalculated?.(cost)
    }, 1200)
  }

  return (
    <div className="border-t border-gray-100 pt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#B76E79] transition-colors"
      >
        <Truck className="h-4 w-4" />
        Estimate Shipping
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-gray-400"
        >
          &#9660;
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Country</label>
                <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>

              {country === "United States" && (
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">State / Region</label>
                  <Select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select state</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">ZIP / Postal Code</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="Enter ZIP code"
                  className="w-full h-10 px-3 text-sm rounded-lg border border-gray-200 bg-white text-gray-900 outline-none focus:border-[#B76E79] transition-colors"
                />
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleCalculate}
                disabled={calculating || !zip}
              >
                {calculating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Shipping"
                )}
              </Button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5"
                >
                  <span className="text-sm text-gray-600">{result.label}</span>
                  <span className={cn(
                    "text-sm font-semibold",
                    result.cost === 0 ? "text-green-600" : "text-gray-900"
                  )}>
                    {result.cost === 0 ? "FREE" : formatPrice(result.cost)}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
