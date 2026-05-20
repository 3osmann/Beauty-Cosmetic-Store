"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, Phone } from "lucide-react"

const announcements = [
  "Free Shipping Over $30",
  "Get 20% Off First Order",
  "24/7 Customer Support",
  "Free Returns Within 30 Days",
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

export function TopBar() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-10 bg-[#1A1A1A] text-white text-xs">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0"
            >
              {announcements[current]}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#B76E79] transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <div className="h-4 w-px bg-white/20 mx-2" />
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1 hover:text-[#B76E79] transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            (025) 3686 25 16
          </a>
        </div>
      </div>
    </div>
  )
}
