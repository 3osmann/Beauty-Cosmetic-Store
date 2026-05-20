"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CartTable() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-8 text-center max-w-sm">
            Looks like you haven&apos;t added anything yet. Explore our collection and find your perfect beauty products.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="hidden md:grid grid-cols-[80px_1fr_120px_140px_120px_48px] gap-4 pb-4 border-b border-gray-200">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Product</div>
        <div />
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Price</div>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Quantity</div>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Subtotal</div>
        <div />
      </div>

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[80px_1fr_120px_140px_120px_48px] max-md:grid-cols-[80px_1fr] max-md:gap-y-3 gap-4 py-5 border-b border-gray-100 relative"
          >
            <Link href={`/product/${item.productId}`} className="relative h-20 w-full rounded-lg overflow-hidden bg-zinc-50 border border-black/5 group">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="80px"
              />
            </Link>

            <div className="flex flex-col justify-center min-w-0">
              <Link
                href={`/product/${item.productId}`}
                className="text-sm font-medium text-gray-900 hover:text-[#B76E79] transition-colors truncate"
              >
                {item.name}
              </Link>
              {item.variant && (
                <span className="text-xs text-gray-400 mt-0.5">{item.variant.name}</span>
              )}
              <span className="text-xs text-gray-400 mt-0.5">SKU: {item.id.split("-")[0]}</span>
              <div className="flex items-center gap-3 mt-2 md:hidden">
                <span className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</span>
                <span className="text-xs text-gray-400">x {item.quantity}</span>
                <span className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-end">
              <span className="text-sm text-gray-600">{formatPrice(item.price)}</span>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    if (item.quantity <= 1) {
                      removeItem(item.id)
                    } else {
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  }}
                  className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="h-9 w-12 flex items-center justify-center text-sm font-medium text-gray-900 border-x border-gray-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-end">
              <span className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <button
                onClick={() => removeItem(item.id)}
                className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="md:hidden col-span-2 flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    if (item.quantity <= 1) {
                      removeItem(item.id)
                    } else {
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  }}
                  className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="h-8 w-10 flex items-center justify-center text-sm font-medium text-gray-900 border-x border-gray-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
