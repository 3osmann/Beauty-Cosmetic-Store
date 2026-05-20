"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, ChevronRight } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

const footerLinks = {
  topCategories: [
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
  helpCenter: [
    { label: "Customer Service", href: "/contact" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
    { label: "Track Order", href: "/track-order" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  partner: [
    { label: "Become a Partner", href: "/partner" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Influencer Program", href: "/influencer" },
    { label: "Brand Collaboration", href: "/collaboration" },
    { label: "Supplier Information", href: "/supplier" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

const paymentIcons = [
  { name: "Visa", src: "/images/payments/visa.svg" },
  { name: "Mastercard", src: "/images/payments/mastercard.svg" },
  { name: "PayPal", src: "/images/payments/paypal.svg" },
  { name: "Amex", src: "/images/payments/amex.svg" },
  { name: "Stripe", src: "/images/payments/stripe.svg" },
]

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-zinc-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 max-w-xs">
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
                <a href="tel:+1234567890" className="hover:text-[#B76E79] transition-colors text-zinc-500">
                  (025) 3686 25 16
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[#B76E79] shrink-0" />
                <a href="mailto:hello@beaute.com" className="hover:text-[#B76E79] transition-colors text-zinc-500">
                  hello@beaute.com
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full border border-zinc-700 flex items-center justify-center hover:border-[#B76E79] hover:text-[#B76E79] transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Top Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.topCategories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm flex items-center gap-1 group transition-colors hover:text-[#B76E79]"
                  >
                    <ChevronRight className="h-3 w-3 text-[#B76E79] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm flex items-center gap-1 group transition-colors hover:text-[#B76E79]"
                  >
                    <ChevronRight className="h-3 w-3 text-[#B76E79] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Help Center
            </h3>
            <ul className="space-y-3">
              {footerLinks.helpCenter.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm flex items-center gap-1 group transition-colors hover:text-[#B76E79]"
                  >
                    <ChevronRight className="h-3 w-3 text-[#B76E79] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Partner
            </h3>
            <ul className="space-y-3">
              {footerLinks.partner.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm flex items-center gap-1 group transition-colors hover:text-[#B76E79]"
                  >
                    <ChevronRight className="h-3 w-3 text-[#B76E79] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-600 mr-1">We accept</span>
            {paymentIcons.map((payment) => (
              <div
                key={payment.name}
                className="h-7 w-11 rounded bg-zinc-800 flex items-center justify-center px-1"
                title={payment.name}
              >
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                  {payment.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
