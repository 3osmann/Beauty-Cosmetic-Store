"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const INITIAL_ITEMS: CartItem[] = [
  { id: "1", name: "Radiance Vitamin C Serum", price: 54.99, quantity: 1, image: "/images/products/vitamin-c-serum.jpg" },
  { id: "2", name: "HydraGlow Moisture Cream", price: 42.00, quantity: 2, image: "/images/products/moisture-cream.jpg" },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [coupon, setCoupon] = useState("")

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 99 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{items.length} items in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything yet</p>
            <Link href="/shop">
              <Button className="bg-[#B76E79] hover:bg-[#A45A65] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 bg-white dark:bg-gray-900 rounded-lg border border-border p-4"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-md bg-muted overflow-hidden">
                    <img
                      src={item.image || "/images/products/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.id}`}
                      className="font-medium hover:text-[#B76E79] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[#B76E79] font-bold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-input rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 py-1.5 text-sm font-medium min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  href="/shop"
                  className="text-sm text-[#B76E79] hover:text-[#A45A65] inline-flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 sticky top-24 space-y-4">
                <h3 className="font-heading text-lg font-semibold">Order Summary</h3>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="h-10 text-sm"
                  />
                  <Button variant="secondary" size="sm" className="h-10 shrink-0">
                    Apply
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={cn("font-medium", shipping === 0 && "text-green-600")}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-[#B76E79]">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-[#B76E79] hover:bg-[#A45A65] text-white h-12">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground">
                  Free shipping on orders over $99
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
