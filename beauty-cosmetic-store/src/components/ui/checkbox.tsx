"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type InputHTMLAttributes } from "react"

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary",
          className
        )}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
