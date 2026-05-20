"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Clock } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { cn, formatPrice, getDiscountPercentage } from "@/lib/utils"
import { useCountdown } from "@/hooks/useCountdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const deals = PRODUCTS.filter((p) => p.comparePrice).slice(0, 6)

const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

function CountdownTimer() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return <span className="text-red-500 text-sm font-medium">Expired</span>
  }

  const blocks = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ]

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-[#B76E79]" />
      {blocks.map((block) => (
        <div key={block.label} className="flex items-center gap-1">
          <span className="bg-[#B76E79] text-white text-xs font-bold px-1.5 py-0.5 rounded min-w-[24px] text-center">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-gray-500">{block.label}</span>
          {block.label !== "Seconds" && (
            <span className="text-[#B76E79] font-bold mx-0.5">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

export function DealsOfDay() {
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
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="font-heading text-3xl md:text-4xl text-gray-900">
              Deals Of the Day
            </h2>
            <CountdownTimer />
          </div>
          <Link
            href="/shop"
            className="text-sm text-[#B76E79] hover:underline font-medium"
          >
            View All Product
          </Link>
        </motion.div>

        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {deals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-100 rounded-sm overflow-hidden min-w-[200px] md:min-w-0 snap-start"
            >
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="sale">
                  -{getDiscountPercentage(product.price, product.comparePrice!)}%
                </Badge>
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

              <div className="p-3">
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
                  <h3 className="font-medium text-sm text-gray-800 hover:text-[#B76E79] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mt-1.5 mb-3">
                  <span className="font-semibold text-[#B76E79] text-sm">
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
