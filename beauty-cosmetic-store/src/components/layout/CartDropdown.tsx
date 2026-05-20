"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { cn, formatPrice } from "@/lib/utils"

interface CartDropdownProps {
  onClose: () => void
}

export function CartDropdown({ onClose }: CartDropdownProps) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotal())

  return (
    <div className="bg-white rounded-xl shadow-xl border border-black/5 w-80 max-h-[450px] flex flex-col">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <ShoppingBag className="h-10 w-10 text-gray-300 mb-3" />
          <p className="text-sm text-gray-500 font-medium">Your cart is empty</p>
          <p className="text-xs text-gray-400 mt-1">Add some items to get started</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 group">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-zinc-50 flex-shrink-0 border border-black/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.variant.name}</p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {item.quantity} &times; {formatPrice(item.price)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500 self-start mt-1"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-black/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Subtotal</span>
              <span className="text-sm font-semibold text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/cart"
                onClick={onClose}
                className={cn(
                  "flex-1 text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                  "border border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className={cn(
                  "flex-1 text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                  "bg-[#B76E79] text-white hover:bg-[#A45A65]"
                )}
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
