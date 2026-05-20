"use client"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRODUCTS } from "@/data/products"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState(
    initialQuery
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(initialQuery.toLowerCase()))
        )
      : []
  )

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!query.trim()) {
        setResults([])
        return
      }
      const q = query.toLowerCase()
      setResults(
        PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q)
        )
      )
    },
    [query]
  )

  const clearSearch = () => {
    setQuery("")
    setResults([])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Search</h1>
          <p className="text-muted-foreground">Find your perfect beauty products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products, categories, brands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg rounded-xl"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {query && !results.length && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching &ldquo;{query}&rdquo;
            </p>
            <Button variant="secondary" onClick={clearSearch}>
              Clear Search
            </Button>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product, i) => (
                <motion.a
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#B76E79] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <span className="font-bold text-[#B76E79]">${product.price.toFixed(2)}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
