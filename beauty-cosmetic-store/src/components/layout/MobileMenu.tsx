"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ChevronDown, Search } from "lucide-react"
import { NAV_LINKS, CATEGORIES_MEGA, SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedCat, setExpandedCat] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-black/5">
              <Link href="/" onClick={onClose} className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                {SITE_NAME}
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-zinc-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 border-b border-black/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-zinc-50 rounded-xl border border-black/5 outline-none focus:ring-2 focus:ring-[#B76E79]/20 focus:border-[#B76E79] transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {NAV_LINKS.map((link) => {
                const hasChildren = link.label === "Pages" && link.children && link.children.length > 0
                const isCategories = link.label === "Categories"

                if (hasChildren) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setExpandedCat(!expandedCat)}
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", expandedCat && "rotate-180")}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedCat && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3 py-1 space-y-0.5">
                              {link.children?.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className="block px-3 py-2 text-sm rounded-lg hover:bg-zinc-50 text-gray-600 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                if (isCategories) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setExpandedCat(!expandedCat)}
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        Categories
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", expandedCat && "rotate-180")}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedCat && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3 py-1 space-y-0.5">
                              {CATEGORIES_MEGA.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  href={`/shop?category=${cat.slug}`}
                                  onClick={onClose}
                                  className="block px-3 py-2 text-sm rounded-lg hover:bg-zinc-50 text-gray-600 transition-colors"
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="p-4 border-t border-black/5">
              <Link
                href="/auth/login"
                onClick={onClose}
                className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-[#B76E79] text-white hover:bg-[#A45A65] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={onClose}
                className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg mt-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
