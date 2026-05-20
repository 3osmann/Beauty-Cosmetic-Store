"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"

interface SearchResultsProps {
  query: string
  products: Product[]
  isLoading?: boolean
  onSelect?: () => void
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "gi"))

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-amber-200 text-foreground rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function SearchResults({ query, products, isLoading, onSelect }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="h-12 w-12 rounded-md bg-muted" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/4 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Start typing to search products...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm font-medium">No results found</p>
        <p className="text-xs mt-1">
          No products match &ldquo;{query}&rdquo;
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="divide-y divide-border"
    >
      <div className="px-4 py-2 text-xs text-muted-foreground">
        {products.length} result{products.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
      </div>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.slug}`}
          onClick={onSelect}
          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
        >
          <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden bg-muted">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {highlightMatch(product.name, query)}
            </p>
            <p className="text-xs text-muted-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </motion.div>
  )
}
