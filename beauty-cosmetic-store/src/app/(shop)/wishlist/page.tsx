"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PRODUCTS } from "@/data/products"

const initialWishlist = PRODUCTS.slice(0, 6).map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  price: p.price,
  comparePrice: p.comparePrice,
  image: p.images[0],
  inStock: p.stock > 0,
}))

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist)

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">{items.length} saved items</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save items you love to your wishlist</p>
            <Link href="/shop">
              <Button className="bg-[#B76E79] hover:bg-[#A45A65] text-white">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white dark:bg-gray-900 rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={item.image || "/images/products/placeholder.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  {!item.inStock && (
                    <Badge variant="default" className="absolute bottom-3 left-3 bg-gray-800/80 text-white">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <Link href={`/shop/${item.slug}`}>
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#B76E79] transition-colors mb-2">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-[#B76E79]">${item.price.toFixed(2)}</span>
                    {item.comparePrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${item.comparePrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button
                    disabled={!item.inStock}
                    className="w-full bg-[#B76E79] hover:bg-[#A45A65] text-white text-sm h-9"
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
