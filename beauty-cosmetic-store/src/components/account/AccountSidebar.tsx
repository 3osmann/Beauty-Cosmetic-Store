"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface AccountSidebarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const NAV_ITEMS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/orders", label: "Orders", icon: ShoppingBag },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/settings", label: "Settings", icon: Settings },
]

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname()

  const userName = user?.name || "Guest User"
  const userEmail = user?.email || "guest@example.com"

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <div className="p-6 text-center border-b border-gray-100">
        <Avatar className="h-16 w-16 mx-auto mb-3">
          <AvatarImage src={user?.image || ""} alt={userName} />
          <AvatarFallback className="bg-[#B76E79]/10 text-[#B76E79] text-lg">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-semibold text-gray-900 truncate">{userName}</h3>
        <p className="text-xs text-gray-500 truncate mt-0.5">{userEmail}</p>
      </div>

      <nav className="p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#B76E79]/10 text-[#B76E79]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 transition-colors",
                isActive ? "text-[#B76E79]" : "text-gray-400 group-hover:text-gray-600"
              )} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-[#B76E79]"
                />
              )}
            </Link>
          )
        })}
      </nav>

      <Separator />

      <div className="p-3">
        <button
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
          onClick={() => console.log("Logout")}
        >
          <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          <span>Logout</span>
          <ChevronRight className="h-3.5 w-3.5 ml-auto text-gray-300 group-hover:text-red-400" />
        </button>
      </div>
    </motion.aside>
  )
}
