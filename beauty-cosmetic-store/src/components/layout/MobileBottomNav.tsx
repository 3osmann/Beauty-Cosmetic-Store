"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartStore, useWishlistStore } from "@/lib/store"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Shop", href: "/shop" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: ShoppingBag, label: "Cart", href: "/cart" },
  { icon: User, label: "Account", href: "/account" },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const totalItems = useCartStore((s) => s.totalItems())
  const wishlistCount = useWishlistStore((s) => s.items.length)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/5 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href)

          const badge = href === "/wishlist" ? wishlistCount : href === "/cart" ? totalItems : null

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 relative px-3 py-1",
                isActive
                  ? "text-[#B76E79]"
                  : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {badge != null && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-[#B76E79] text-[8px] font-bold text-white flex items-center justify-center">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#B76E79]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
