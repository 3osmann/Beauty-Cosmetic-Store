"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Facebook, Twitter, ExternalLink, Link2, Mail, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareButtonsProps {
  productName: string
  productSlug: string
}

export function ShareButtons({ productName, productSlug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/shop/${productSlug}`
    : `/shop/${productSlug}`

  const encodedUrl = encodeURIComponent(url)
  const encodedName = encodeURIComponent(productName)

  const shareLinks = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: "hover:text-[#1877F2]",
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedName}&url=${encodedUrl}`,
      icon: Twitter,
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedName}`,
      icon: ExternalLink,
      color: "hover:text-[#E60023]",
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedName}&body=${encodedUrl}`,
      icon: Mail,
      color: "hover:text-[#EA4335]",
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-current",
            link.color
          )}
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
      <motion.button
        onClick={handleCopyLink}
        whileTap={{ scale: 0.9 }}
        aria-label="Copy link"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
          copied
            ? "border-green-400 text-green-500 bg-green-50"
            : "border-border text-muted-foreground hover:border-primary"
        )}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </motion.button>
    </div>
  )
}
