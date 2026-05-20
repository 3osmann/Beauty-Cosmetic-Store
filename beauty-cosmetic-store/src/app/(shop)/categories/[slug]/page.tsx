"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { PRODUCTS } from "@/data/products"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"

export default function SingleCategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categories.find((c) => c.slug === slug)

  const catProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug
  )

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-2">Category not found</h1>
          <a href="/categories" className="text-[#B76E79] hover:underline">Browse all categories</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-48 md:h-64 bg-muted overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-white/80">{catProducts.length} Products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {catProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium mb-2">No products in this category yet</p>
            <a href="/shop" className="text-[#B76E79] hover:underline">Browse all products</a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {catProducts.map((product, i) => (
              <motion.a
                key={product.id}
                href={`/shop/${product.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white dark:bg-gray-900 rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={product.images[0] || "/images/products/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.isNew && <Badge variant="new" className="absolute top-3 left-3">New</Badge>}
                  {product.isBestSeller && (
                    <Badge variant="best" className="absolute top-3 right-3">Best</Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#B76E79] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <span className="font-bold text-[#B76E79]">${product.price.toFixed(2)}</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
