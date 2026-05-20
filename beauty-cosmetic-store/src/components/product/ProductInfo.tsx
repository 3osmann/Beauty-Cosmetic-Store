"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Heart, Minus, Plus, Check, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShareButtons } from "./ShareButtons"
import { useCartStore, useWishlistStore } from "@/lib/store"
import type { Product, ProductVariant } from "@/types"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<ProductVariant | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))

  const sizes = product.variants?.filter((v) => v.name.match(/ml|oz|size|g/i)) || []
  const colors = product.variants?.filter((v) =>
    ["red", "blue", "black", "white", "pink", "gold", "rose", "nude", "brown", "green", "purple", "coral"].some((c) =>
      v.name.toLowerCase().includes(c)
    )
  ) || []

  const currentPrice = selectedSize?.price ?? product.price
  const currentStock = selectedSize?.stock ?? product.stock
  const maxQuantity = Math.min(currentStock, 10)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(
      {
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: product.images[0],
        stock: currentStock,
      },
      quantity,
      selectedSize ? { id: selectedSize.id, name: selectedSize.name, price: selectedSize.price } : null
    )
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 1500)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {product.category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category.name}
          </p>
        )}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          {product.name}
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating || 0)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating?.toFixed(1)} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-foreground">
          {formatPrice(currentPrice)}
        </span>
        {product.comparePrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.comparePrice)}
          </span>
        )}
        {product.comparePrice && (
          <span className="text-sm font-medium text-red-500">
            {Math.round(((product.comparePrice - currentPrice) / product.comparePrice) * 100)}% OFF
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.shortDescription}
      </p>

      {sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Size: <span className="font-normal text-muted-foreground">{selectedSize?.name || "Select"}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 text-sm rounded-md border transition-all",
                  selectedSize?.id === size.id
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border text-foreground hover:border-primary"
                )}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Color: <span className="font-normal text-muted-foreground">{selectedColor || "Select"}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.name)}
                className={cn(
                  "h-8 w-8 rounded-full border-2 transition-all",
                  selectedColor === color.name
                    ? "border-primary scale-110"
                    : "border-border hover:border-muted-foreground"
                )}
                style={{ backgroundColor: color.name.toLowerCase() }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (!isNaN(val)) setQuantity(Math.max(1, Math.min(val, maxQuantity)))
              }}
              className="h-10 w-14 text-center text-sm bg-transparent border-x border-border outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={maxQuantity}
            />
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              disabled={quantity >= maxQuantity}
              className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {currentStock <= 5 && currentStock > 0 && (
            <span className="text-sm text-amber-600 font-medium">
              Only {currentStock} left
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={currentStock === 0 || isAdding}
          size="lg"
          className="flex-1 relative overflow-hidden"
        >
          <motion.span
            animate={isAdding ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {currentStock === 0 ? "Out of Stock" : "Add to Cart"}
          </motion.span>
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={showSuccess ? { y: 0, opacity: 1 } : {}}
            className="absolute inset-0 flex items-center justify-center gap-2"
          >
            <Check className="h-5 w-5" />
            Added!
          </motion.span>
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => toggleItem(product.id)}
          className="px-4"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isInWishlist ? "fill-red-500 text-red-500" : ""
            )}
          />
        </Button>
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Truck className="h-4 w-4" />
          Free shipping on orders over $99
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          30-day easy returns
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          Secure checkout
        </div>
      </div>

      <ShareButtons productName={product.name} productSlug={product.slug} />

      <div className="border-t border-border pt-4 space-y-2 text-sm">
        <p>
          <span className="font-semibold text-foreground">SKU:</span>{" "}
          <span className="text-muted-foreground">{product.sku}</span>
        </p>
        {product.category && (
          <p>
            <span className="font-semibold text-foreground">Category:</span>{" "}
            <span className="text-muted-foreground">{product.category.name}</span>
          </p>
        )}
        {product.tags.length > 0 && (
          <p className="flex gap-1">
            <span className="font-semibold text-foreground">Tags:</span>
            <span className="flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </span>
          </p>
        )}
        <p>
          <span className="font-semibold text-foreground">Availability:</span>{" "}
          <span
            className={cn(
              currentStock > 0 ? "text-green-600" : "text-red-500"
            )}
          >
            {currentStock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
      </div>
    </div>
  )
}
