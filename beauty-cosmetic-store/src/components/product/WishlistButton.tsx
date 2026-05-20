"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlistStore } from "@/lib/store"

interface WishlistButtonProps {
  productId: string
  className?: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

export function WishlistButton({
  productId,
  className,
  size = "md",
  showLabel = false,
}: WishlistButtonProps) {
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(productId))

  return (
    <motion.button
      onClick={() => toggleItem(productId)}
      whileTap={{ scale: 0.85 }}
      className={cn(
        "flex items-center justify-center rounded-full border border-border transition-all hover:border-primary",
        isInWishlist ? "bg-red-50 border-red-200" : "bg-background",
        showLabel ? "gap-2 px-4" : "",
        sizeClasses[size],
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <motion.div
        animate={isInWishlist ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            iconSizes[size],
            "transition-colors",
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-muted-foreground hover:text-red-400"
          )}
        />
      </motion.div>
      {showLabel && (
        <span
          className={cn(
            "text-sm font-medium",
            isInWishlist ? "text-red-500" : "text-foreground"
          )}
        >
          {isInWishlist ? "Saved" : "Save"}
        </span>
      )}
    </motion.button>
  )
}
