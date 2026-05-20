"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { PRODUCTS } from "@/data/products"
import { SORT_OPTIONS } from "@/lib/constants"

const SAMPLE_PRODUCTS = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  price: p.price,
  comparePrice: p.comparePrice,
  image: p.images[0],
  category: p.category,
  rating: p.rating,
  reviewCount: p.reviewCount,
  isNew: p.isNew,
  isBestSeller: p.isBestSeller,
  stock: p.stock,
}))

const CATEGORIES = [
  "All",
  "Makeup",
  "Skincare",
  "Hair Care",
  "Body Care",
  "Natural",
  "Fragrance",
]

const PRICE_RANGES = [
  { label: "Under $20", min: 0, max: 20 },
  { label: "$20 - $50", min: 20, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
]

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = SAMPLE_PRODUCTS.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false
    if (selectedPrice) {
      const range = PRICE_RANGES.find((r) => r.label === selectedPrice)
      if (range && (p.price < range.min || p.price > range.max)) return false
    }
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      case "rating": return b.rating - a.rating
      default: return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">Discover our premium beauty collection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium mb-4 text-[#B76E79]"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
        </button>

        <div className="flex gap-8">
          <aside
            className={cn(
              "w-64 shrink-0 space-y-6",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-5">
              <h3 className="font-heading font-semibold mb-3">Search</h3>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-5">
              <h3 className="font-heading font-semibold mb-3">Categories</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                      selectedCategory === cat
                        ? "bg-[#B76E79]/10 text-[#B76E79] font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-5">
              <h3 className="font-heading font-semibold mb-3">Price Range</h3>
              <div className="space-y-1">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      setSelectedPrice(selectedPrice === range.label ? null : range.label)
                    }
                    className={cn(
                      "block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                      selectedPrice === range.label
                        ? "bg-[#B76E79]/10 text-[#B76E79] font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-900 rounded-lg border border-border p-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filtered.length}</span> results
              </p>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="hidden sm:flex items-center border border-input rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-l-md transition-colors",
                      viewMode === "grid"
                        ? "bg-[#B76E79] text-white"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-r-md transition-colors",
                      viewMode === "list"
                        ? "bg-[#B76E79] text-white"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product, i) => (
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
                        src={product.image || "/images/products/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.isNew && (
                        <Badge variant="new" className="absolute top-3 left-3">New</Badge>
                      )}
                      {product.isBestSeller && (
                        <Badge variant="best" className="absolute top-3 right-3">Best</Badge>
                      )}
                      {product.comparePrice && (
                        <Badge variant="sale" className="absolute top-3 left-3">
                          -{Math.round((1 - product.price / product.comparePrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#B76E79] transition-colors mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#B76E79]">${product.price.toFixed(2)}</span>
                        {product.comparePrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.comparePrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((product, i) => (
                  <motion.a
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 bg-white dark:bg-gray-900 rounded-lg border border-border p-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-md bg-muted overflow-hidden">
                      <img
                        src={product.image || "/images/products/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <h3 className="font-medium group-hover:text-[#B76E79] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-[#B76E79]">${product.price.toFixed(2)}</span>
                        {product.comparePrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.comparePrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
