"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl md:text-9xl font-heading font-bold text-[#B76E79]/20 mb-4 select-none"
        >
          404
        </motion.div>

        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#B76E79] to-[#D4AF37] rounded-full opacity-20 blur-3xl absolute -top-8 left-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-[#B76E79]/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! It seems like the page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="bg-[#B76E79] hover:bg-[#A45A65] text-white gap-2 min-w-[160px]">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="secondary" className="gap-2 min-w-[160px]">
              <Search className="w-4 h-4" />
              Search Products
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
