"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#B76E79] text-white hover:bg-[#A45A65]": variant === "primary",
            "bg-white text-[#B76E79] border border-[#B76E79] hover:bg-[#B76E79] hover:text-white":
              variant === "secondary",
            "border border-white text-white hover:bg-white hover:text-black":
              variant === "outline",
            "text-white hover:text-white/80": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-10 py-6 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
