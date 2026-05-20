"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  max?: number
  min?: number
}

export function QuantitySelector({
  value,
  onChange,
  max = 99,
  min = 1,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-border rounded-md w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10)
          if (!isNaN(val)) onChange(Math.max(min, Math.min(val, max)))
        }}
        className="h-10 w-14 text-center text-sm bg-transparent border-x border-border outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
      />
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
