"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "sale" | "new" | "best"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-[#B76E79] text-white": variant === "default",
          "bg-red-500 text-white": variant === "sale",
          "bg-green-600 text-white": variant === "new",
          "bg-amber-500 text-white": variant === "best",
        },
        className
      )}
      {...props}
    />
  )
}
