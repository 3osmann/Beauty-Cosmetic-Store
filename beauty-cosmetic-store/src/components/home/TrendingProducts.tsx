"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { cn, formatPrice, getDiscountPercentage } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const trending = PRODUCTS.slice(0, 3)

export function TrendingProducts() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const mainProduct = trending[0]
  const sideProducts = trending.slice(1)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900">
            Trending This Week
          </h2>
          <p className="text-gray-500 mt-2">
            Most popular products loved by our customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            key={mainProduct.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 group relative bg-white border border-gray-100 rounded-sm overflow-hidden"
          >
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              {mainProduct.isBestSeller && (
                <Badge variant="best">Best Seller</Badge>
              )}
              {mainProduct.comparePrice && (
                <Badge variant="sale">
                  -{getDiscountPercentage(mainProduct.price, mainProduct.comparePrice)}%
                </Badge>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(mainProduct.id)}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  wishlist.has(mainProduct.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                )}
              />
            </button>

            <Link href={`/product/${mainProduct.slug}`} className="block">
              <div className="aspect-[2/1] md:aspect-[3/1] overflow-hidden bg-gray-50">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${mainProduct.images[0]})` }}
                />
              </div>
            </Link>

            <div className="p-4 md:p-6">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(mainProduct.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    )}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-1">
                  ({mainProduct.reviewCount})
                </span>
              </div>

              <Link href={`/product/${mainProduct.slug}`}>
                <h3 className="font-heading text-xl md:text-2xl text-gray-800 hover:text-[#B76E79] transition-colors">
                  {mainProduct.name}
                </h3>
              </Link>

              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {mainProduct.shortDescription}
              </p>

              <div className="flex items-center gap-2 mt-2 mb-4">
                <span className="font-semibold text-[#B76E79] text-lg">
                  {formatPrice(mainProduct.price)}
                </span>
                {mainProduct.comparePrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(mainProduct.comparePrice)}
                  </span>
                )}
              </div>

              <Button className="bg-[#B76E79] hover:bg-[#A45A65] text-white rounded-none flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {sideProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-gray-100 rounded-sm overflow-hidden flex flex-row"
              >
                <div className="absolute top-2 left-2 z-10">
                  {product.isNew && <Badge variant="new">New</Badge>}
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

                <Link href={`/product/${product.slug}`} className="block w-1/2">
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.images[0]})` }}
                    />
                  </div>
                </Link>

                <div className="w-1/2 p-3 flex flex-col justify-center">
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
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-medium text-sm text-gray-800 hover:text-[#B76E79] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1.5 mb-2">
                    <span className="font-semibold text-[#B76E79] text-sm">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>

                  <Button className="text-xs py-1.5 h-auto rounded-none bg-[#B76E79] hover:bg-[#A45A65] text-white flex items-center justify-center gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
