"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Share2, Minus, Plus, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PRODUCTS } from "@/data/products"
import { SITE_NAME } from "@/lib/constants"

const productData = PRODUCTS[0]
const relatedProducts = PRODUCTS.slice(1, 5)
const reviews = [
  { id: "r1", author: "Sophie L.", rating: 5, date: "2026-02-15", content: "Absolutely love this product! My skin has never looked better.", verified: true },
  { id: "r2", author: "Maria C.", rating: 4, date: "2026-02-10", content: "Great quality. Shipping was fast and packaging was beautiful.", verified: true },
  { id: "r3", author: "Emma R.", rating: 5, date: "2026-01-28", content: "Been using this for a month and I can see visible results.", verified: false },
]

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description")

  const p = productData

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-[#B76E79]">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-[#B76E79]">Shop</a>
          <span className="mx-2">/</span>
          <a href={`/shop?category=${p.category}`} className="hover:text-[#B76E79]">{p.category}</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg bg-muted overflow-hidden">
              <Image
                src={p.images[selectedImage] || "/images/products/placeholder.jpg"}
                alt={p.name}
                fill
                className="object-cover"
                priority
              />
              {p.isNew && <Badge variant="new" className="absolute top-4 left-4">New</Badge>}
              {p.isBestSeller && <Badge variant="best" className="absolute top-4 right-4">Best Seller</Badge>}
              {p.comparePrice && (
                <Badge variant="sale" className="absolute top-4 left-4">
                  -{Math.round((1 - p.price / p.comparePrice) * 100)}%
                </Badge>
              )}
            </div>
            {p.images.length > 1 && (
              <div className="flex gap-3">
                {p.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                      selectedImage === i ? "border-[#B76E79]" : "border-transparent"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{p.category}</p>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold">{p.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {p.rating} ({p.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#B76E79]">${p.price.toFixed(2)}</span>
              {p.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${p.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{p.shortDescription}</p>

            <div className="flex items-center gap-1">
              <span className={cn(
                "w-2.5 h-2.5 rounded-full",
                p.stock > 0 ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="text-sm">{p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-input rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-medium text-sm min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button className="flex-1 bg-[#B76E79] hover:bg-[#A45A65] text-white h-12">
                Add to Cart
              </Button>
              <button className="p-3 border border-input rounded-md hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 border border-input rounded-md hover:bg-muted transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-[#B76E79]" />
                <span>Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-[#B76E79]" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-[#B76E79]" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="border-b border-border">
            <div className="flex gap-6">
              {(["description", "reviews", "shipping"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-medium capitalize transition-colors relative",
                    activeTab === tab
                      ? "text-[#B76E79]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "description" ? "Description" : tab === "reviews" ? `Reviews (${reviews.length})` : "Shipping & Returns"}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B76E79]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Product Type", value: p.category },
                    { label: "Skin Type", value: "All Skin Types" },
                    { label: "Size", value: "Standard" },
                    { label: "Ingredients", value: "See packaging" },
                  ].map((item) => (
                    <div key={item.label} className="bg-muted rounded-lg p-4">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-border">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#B76E79]">{p.rating}</p>
                    <div className="flex items-center justify-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(p.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{p.reviewCount} reviews</p>
                  </div>
                </div>
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[#B76E79]/10 flex items-center justify-center text-sm font-medium text-[#B76E79]">
                        {review.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{review.author}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3 h-3",
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                          {review.verified && (
                            <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">Shipping</h4>
                  <p>Free standard shipping on all orders over $99. Express shipping available for an additional fee. Orders are processed within 1-2 business days.</p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">Returns</h4>
                  <p>We offer a 30-day return policy for unused and unopened products. To initiate a return, please contact our customer service team.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 border-t border-border pt-12">
            <h2 className="font-heading text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rp) => (
                <a
                  key={rp.id}
                  href={`/shop/${rp.slug}`}
                  className="group bg-white dark:bg-gray-900 rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img src={rp.images[0] || "/images/products/placeholder.jpg"} alt={rp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-1 group-hover:text-[#B76E79] transition-colors">{rp.name}</h3>
                    <span className="text-sm font-bold text-[#B76E79]">${rp.price.toFixed(2)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
