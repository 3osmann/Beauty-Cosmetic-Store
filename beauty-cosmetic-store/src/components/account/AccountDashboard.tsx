"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  DollarSign,
  Heart,
  Package,
  MapPin,
  Settings,
  ChevronRight,
} from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"

interface DashboardStats {
  totalOrders: number
  totalSpent: number
  wishlistItems: number
}

interface RecentOrder {
  id: string
  orderId: string
  status: string
  total: number
  items: number
  date: string
}

interface AccountDashboardProps {
  userName?: string
  stats?: DashboardStats
  recentOrders?: RecentOrder[]
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

export function AccountDashboard({
  userName = "Guest",
  stats = { totalOrders: 0, totalSpent: 0, wishlistItems: 0 },
  recentOrders = [],
}: AccountDashboardProps) {
  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Spent", value: formatPrice(stats.totalSpent), icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    { label: "Wishlist Items", value: stats.wishlistItems, icon: Heart, color: "text-red-500", bg: "bg-red-50" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {userName}</h1>
        <p className="text-sm text-gray-500 mt-1">Here&apos;s your account overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", stat.bg)}>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          {recentOrders.length > 0 && (
            <Link
              href="/account/orders"
              className="text-sm font-medium text-[#B76E79] hover:text-[#A45A65] transition-colors"
            >
              View All
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-10 text-center">
            <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Package className="h-7 w-7 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900">No orders yet</p>
            <p className="text-xs text-gray-500 mt-1 mb-4">Start shopping to see your orders here.</p>
            <Link
              href="/shop"
              className="inline-flex items-center text-sm font-medium text-[#B76E79] hover:text-[#A45A65] transition-colors"
            >
              Browse Products
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">#{order.orderId}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full",
                    STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                  )}>
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</p>
                  <p className="text-xs text-gray-500">{order.items} items</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/account/addresses"
          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Manage Addresses</p>
              <p className="text-xs text-gray-500">Update your shipping & billing addresses</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </Link>

        <Link
          href="/account/settings"
          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Account Settings</p>
              <p className="text-xs text-gray-500">Manage your profile & preferences</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </Link>
      </div>
    </motion.div>
  )
}
