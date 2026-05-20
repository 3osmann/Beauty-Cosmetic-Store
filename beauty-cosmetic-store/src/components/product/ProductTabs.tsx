"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import type { Product, Review } from "@/types"

interface ProductTabsProps {
  product: Product
  reviews?: Review[]
}

type Tab = "description" | "reviews" | "ingredients"

export function ProductTabs({ product, reviews = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description")

  const tabs: { key: Tab; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "reviews", label: `Reviews (${reviews.length || product.reviewCount || 0})` },
    { key: "ingredients", label: product.tags.length ? "Additional Info" : "Ingredients" },
  ]

  return (
    <div>
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "relative px-6 py-3 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      <div className="py-6">
        {activeTab === "description" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-sm max-w-none text-muted-foreground"
          >
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No reviews yet. Be the first to review this product!
              </p>
            )}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-border pb-4 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground uppercase">
                      {(review.userName || "A")[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {review.userName || "Anonymous"}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3",
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-200 text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        {review.isVerified && (
                          <span className="text-xs text-green-600 font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {review.title && (
                    <p className="text-sm font-medium text-foreground mb-1">
                      {review.title}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "ingredients" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {product.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              For detailed ingredient information, please contact our customer support team.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
