import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: {
    id: string
    name: string
    price?: number
  } | null
}

interface CartStore {
  items: CartItem[]
  addItem: (product: { id: string; name: string; price: number; image: string; stock?: number }, quantity?: number, variant?: { id: string; name: string; price?: number } | null) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  subtotal: () => number
}

interface WishlistStore {
  items: string[]
  toggleItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, variant = null) => {
        set((state) => {
          const key = variant ? `${product.id}-${variant.id}` : product.id
          const existingIndex = state.items.findIndex(
            (item) =>
              item.productId === product.id &&
              (variant ? item.variant?.id === variant.id : !item.variant)
          )

          if (existingIndex > -1) {
            const updated = [...state.items]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            }
            return { items: updated }
          }

          return {
            items: [
              ...state.items,
              {
                id: key,
                productId: product.id,
                name: product.name,
                price: variant?.price ?? product.price,
                image: product.image,
                quantity,
                variant: variant
                  ? { id: variant.id, name: variant.name, price: variant.price }
                  : null,
              },
            ],
          }
        })
      },
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: 'beaute-cart-storage' }
  )
)

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId: string) => {
        set((state) => {
          const exists = state.items.includes(productId)
          return {
            items: exists
              ? state.items.filter((id) => id !== productId)
              : [...state.items, productId],
          }
        })
      },
      isInWishlist: (productId: string) => {
        return get().items.includes(productId)
      },
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'beaute-wishlist-storage' }
  )
)
