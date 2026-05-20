"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { cn, formatPrice, getDiscountPercentage } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8)

export function BestSellers() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900">
            Best Seller Of Cosmetics
          </h2>
          <Link
            href="/shop"
            className="text-sm text-[#B76E79] hover:underline font-medium"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-100 rounded-sm overflow-hidden"
            >
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                <Badge variant="best">Best Seller</Badge>
                {product.comparePrice && (
                  <Badge variant="sale">
                    -{getDiscountPercentage(product.price, product.comparePrice)}%
                  </Badge>
                )}
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    wishlist.has(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  )}
                />
              </button>

              <Link href={`/product/${product.slug}`} className="block">
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                </div>
              </Link>

              <div className="p-3 md:p-4">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.round(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      )}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-medium text-sm md:text-base text-gray-800 hover:text-[#B76E79] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mt-1.5 mb-3">
                  <span className="font-semibold text-[#B76E79] text-sm md:text-base">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                <Button className="w-full text-xs py-2 h-auto rounded-none bg-[#B76E79] hover:bg-[#A45A65] text-white flex items-center justify-center gap-1.5">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
