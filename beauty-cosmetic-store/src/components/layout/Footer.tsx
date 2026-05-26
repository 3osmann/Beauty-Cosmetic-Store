"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Facebook, Instagram, Twitter, Youtube,
  Phone, Mail, MapPin, ArrowRight, Send,
  Heart, Sparkles, ShieldCheck, Truck, RotateCcw
} from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

const footerLinks = {
  shop: [
    { label: "Makeup", href: "/shop?category=makeup" },
    { label: "Skincare", href: "/shop?category=skin-care" },
    { label: "Hair Care", href: "/shop?category=hair-care" },
    { label: "Body Care", href: "/shop?category=body-care" },
    { label: "Fragrance", href: "/shop?category=fragrance" },
    { label: "Natural Products", href: "/shop?category=natural" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  help: [
    { label: "Customer Service", href: "/contact" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
    { label: "Track Order", href: "/track-order" },
    { label: "Size Guide", href: "/size-guide" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-[#1877F2]" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-[#E4405F]" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-[#1DA1F2]" },
  { icon: Youtube, href: "#", label: "Youtube", color: "hover:text-[#FF0000]" },
]

const features = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
  { icon: RotateCcw, label: "Free Returns", desc: "Within 30 days" },
  { icon: ShieldCheck, label: "Secure Payment", desc: "100% protected" },
  { icon: Heart, label: "24/7 Support", desc: "Dedicated service" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate newsletter API
    setEmail("")
  }

  return (
    <footer className="bg-[#1A1A1A]">
      {/* Features Bar */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#B76E79]/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-[#B76E79]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-zinc-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Sparkles className="h-6 w-6 text-[#B76E79] mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Join Our Beauty Community
            </h3>
            <p className="text-zinc-500 text-sm mb-6">
              Subscribe for exclusive offers, beauty tips, and new arrivals
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#B76E79]/40 focus:border-[#B76E79] transition-all"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-[#B76E79] text-white rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#A45A65] transition-colors shrink-0"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight font-serif">
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 max-w-sm">
              Discover luxury beauty products, premium skincare, and professional-grade cosmetics.
              Your journey to timeless beauty starts here.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[#B76E79] shrink-0" />
                <span className="text-zinc-500">123 Beauty Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-[#B76E79] shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-zinc-500 hover:text-[#B76E79] transition-colors"
                >
                  (025) 3686 25 16
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[#B76E79] shrink-0" />
                <a
                  href="mailto:hello@beaute.com"
                  className="text-zinc-500 hover:text-[#B76E79] transition-colors"
                >
                  hello@beaute.com
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 ${color} transition-all duration-300`}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
              Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            Crafted with care for beauty enthusiasts.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-600">We accept</span>
            {["Visa", "Mastercard", "PayPal", "Amex", "Stripe"].map((name) => (
              <div
                key={name}
                className="h-8 w-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700/50"
                title={name}
              >
                <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
