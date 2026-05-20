"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { useWishlistStore } from "@/lib/store"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        stock: product.stock,
      },
      1,
      null
    )
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isHovered && "scale-110"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {discount > 0 && (
          <Badge
            variant="sale"
            className="absolute top-3 left-3 z-10"
          >
            -{discount}%
          </Badge>
        )}
        {product.isNew && (
          <Badge
            variant="new"
            className="absolute top-3 right-3 z-10"
          >
            New
          </Badge>
        )}
        {product.isBestSeller && !product.isNew && (
          <Badge
            variant="best"
            className="absolute top-3 right-3 z-10"
          >
            Best Seller
          </Badge>
        )}

        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-colors duration-300",
            isHovered && "bg-black/10"
          )}
        />

        <motion.button
          onClick={() => toggleItem(product.id)}
          className={cn(
            "absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:bg-white",
            isInWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          whileTap={{ scale: 0.85 }}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isInWishlist ? "fill-red-500 text-red-500" : "text-foreground"
            )}
          />
        </motion.button>
      </div>

      <div className="pt-4 space-y-1.5">
        {product.category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category.name}
          </p>
        )}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-heading text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < Math.floor(product.rating || 0)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
          {product.reviewCount !== undefined && (
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          size="sm"
          className="w-full mt-2"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {product.stock === 0 ? "Out of Stock" : isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  )
}
