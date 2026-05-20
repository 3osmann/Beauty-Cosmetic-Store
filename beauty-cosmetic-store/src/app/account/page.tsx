"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Package,
  Heart,
  User,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const QUICK_LINKS = [
  { label: "My Orders", href: "/account/orders", icon: Package, count: 5 },
  { label: "My Wishlist", href: "/account/wishlist", icon: Heart, count: 3 },
  { label: "My Addresses", href: "#", icon: MapPin, count: 2 },
  { label: "Payment Methods", href: "#", icon: CreditCard, count: 1 },
]

const RECENT_ORDERS = [
  { id: "ORD-001", date: "2026-03-10", status: "Delivered", total: 96.99 },
  { id: "ORD-002", date: "2026-03-05", status: "Shipped", total: 54.99 },
  { id: "ORD-003", date: "2026-02-28", status: "Processing", total: 124.50 },
]

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome back, valued customer</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-1">
            {[
              { label: "Dashboard", href: "/account", icon: User },
              { label: "Orders", href: "/account/orders", icon: Package },
              { label: "Wishlist", href: "/account/wishlist", icon: Heart },
              { label: "Addresses", href: "#", icon: MapPin },
              { label: "Payments", href: "#", icon: CreditCard },
              { label: "Settings", href: "#", icon: Settings },
            ].map((item) => {
              const Icon = item.icon
              const isActive = item.href === "/account"
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#B76E79]/10 text-[#B76E79]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-4">
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#B76E79]/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-[#B76E79]" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-semibold">Welcome!</h2>
                  <p className="text-sm text-muted-foreground">customer@example.com</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="bg-muted rounded-lg p-4 text-center hover:bg-[#B76E79]/5 transition-colors group"
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-[#B76E79] group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.count} items</p>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold">Recent Orders</h3>
                <Link
                  href="/account/orders"
                  className="text-sm text-[#B76E79] hover:text-[#A45A65]"
                >
                  View All
                </Link>
              </div>
              <div className="divide-y divide-border">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-green-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
