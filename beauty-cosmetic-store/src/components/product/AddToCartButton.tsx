"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  variant?: { id: string; name: string; price?: number } | null
  className?: string
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = null,
  className,
}: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle")
  const addItem = useCartStore((s) => s.addItem)

  const handleClick = async () => {
    if (state === "loading") return
    setState("loading")

    await new Promise((resolve) => setTimeout(resolve, 500))

    addItem(
      {
        id: product.id,
        name: product.name,
        price: variant?.price ?? product.price,
        image: product.images[0],
        stock: product.stock,
      },
      quantity,
      variant
    )

    setState("success")
    setTimeout(() => setState("idle"), 1500)
  }

  const isDisabled = product.stock === 0 || state === "loading"

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      size="lg"
      className={`relative overflow-hidden min-w-[180px] ${className || ""}`}
    >
      <motion.span
        animate={state === "success" ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        {state === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ShoppingBag className="h-5 w-5" />
        )}
        {state === "loading"
          ? "Adding..."
          : product.stock === 0
          ? "Out of Stock"
          : "Add to Cart"}
      </motion.span>
      <motion.span
        initial={{ y: 30, opacity: 0 }}
        animate={state === "success" ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center gap-2"
      >
        <Check className="h-5 w-5" />
        Added!
      </motion.span>
    </Button>
  )
}
