"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/shop/ProductCard"
import type { Product } from "@/types"

interface RelatedProductsProps {
  products: Product[]
  title?: string
}

export function RelatedProducts({
  products,
  title = "Related Products",
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (products.length === 0) return null

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1 snap-x snap-mandatory"
      >
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="min-w-[250px] sm:min-w-[280px] lg:min-w-[300px] snap-start"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
