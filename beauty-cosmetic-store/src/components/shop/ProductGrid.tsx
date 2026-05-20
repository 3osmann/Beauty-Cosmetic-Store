"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  columns?: number
  isLoading?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

function ProductSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  )
}

export function ProductGrid({
  products,
  columns = 4,
  isLoading = false,
}: ProductGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  }

  return (
    <motion.div
      className={`grid gap-6 ${gridCols[columns as keyof typeof gridCols] || gridCols[4]}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        : products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
    </motion.div>
  )
}
