"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [toast, setToast] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setToast(true)
    setEmail("")
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#B76E79] to-[#A45A65]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <Sparkles className="h-8 w-8 text-white/80 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-3">
            Subscribe & Get 10% OFF
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-8">
            for first order. Be the first to know about exclusive deals, new
            arrivals, and beauty tips.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 text-sm rounded-sm bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors"
            />
            <Button
              type="submit"
              className="bg-white text-[#B76E79] hover:bg-white/90 rounded-sm px-8 py-3.5 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-sm shadow-lg text-sm z-50"
        >
          Thank you for subscribing! Check your email for 10% OFF.
        </motion.div>
      )}
    </section>
  )
}
