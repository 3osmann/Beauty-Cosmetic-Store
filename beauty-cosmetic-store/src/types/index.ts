export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  comparePrice?: number
  sku: string
  stock: number
  isActive: boolean
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
  images: string[]
  categoryId: string
  category?: Category
  tags: string[]
  rating?: number
  reviewCount?: number
  variants?: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  sku: string
  price?: number
  stock: number
  images: string[]
  sortOrder: number
}

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

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string | null
  children?: Category[]
  productCount?: number
}

export interface Order {
  id: string
  userId?: string
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount: number
  couponCode?: string
  paymentMethod: string
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED"
  shippingAddress: string
  billingAddress: string
  notes?: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  total: number
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName?: string
  rating: number
  title?: string
  comment: string
  isVerified: boolean
  createdAt: string
}

export interface User {
  id: string
  name?: string
  email: string
  image?: string
  role: "USER" | "ADMIN"
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featuredImage?: string
  author?: { name?: string; image?: string }
  category?: { name: string; slug: string }
  tags: string[]
  publishedAt?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  content: string
  rating: number
}

export interface Coupon {
  id: string
  code: string
  description?: string
  discountType: "PERCENTAGE" | "FIXED"
  discountValue: number
  minAmount?: number
  maxUses?: number
  usedCount: number
  isActive: boolean
  startsAt: string
  expiresAt: string
}

export interface Address {
  id: string
  type: "SHIPPING" | "BILLING"
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}
