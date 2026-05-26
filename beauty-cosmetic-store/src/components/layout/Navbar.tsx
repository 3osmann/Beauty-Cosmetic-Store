"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { MegaMenu } from "./MegaMenu"
import { CartDropdown } from "./CartDropdown"
import { SearchModal } from "./SearchModal"
import { MobileMenu } from "./MobileMenu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const totalItems = useCartStore((s) => s.totalItems())
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b-0 shadow-none",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl"
            : "bg-white"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
            {SITE_NAME}
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-nowrap">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative whitespace-nowrap"
                onMouseEnter={() => {
                  if (link.label === "Categories" || link.label === "Shop") {
                    setActiveMega(link.label)
                  }
                }}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:text-[#B76E79]"
                  )}
                >
                  {link.label}
                  {(link.label === "Shop" || link.label === "Categories") && (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </Link>
                {(link.label === "Shop" || link.label === "Categories") && (
                  <AnimatePresence>
                    {activeMega === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0"
                        onMouseEnter={() => setActiveMega(link.label)}
                        onMouseLeave={() => setActiveMega(null)}
                      >
                        <MegaMenu />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-[#B76E79] transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-2 hover:text-[#B76E79] transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#B76E79] text-[10px] font-medium text-white flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
            >
              <button className="relative p-2 hover:text-[#B76E79] transition-colors" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#B76E79] text-[10px] font-medium text-white flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showCart && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2"
                  >
                    <CartDropdown onClose={() => setShowCart(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setShowUser(true)}
              onMouseLeave={() => setShowUser(false)}
            >
              <button className="p-2 hover:text-[#B76E79] transition-colors" aria-label="Account">
                <User className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {showUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-black/5 p-2 min-w-[180px]">
                      <Link
                        href="/auth/login"
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        Register
                      </Link>
                      <Link
                        href="/account"
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        My Account
                      </Link>
                      <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-zinc-50 transition-colors text-red-500">
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
