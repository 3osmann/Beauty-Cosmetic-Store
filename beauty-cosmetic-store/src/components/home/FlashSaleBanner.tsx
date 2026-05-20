"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/useCountdown"

const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

function CountdownBlocks() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) return null

  const blocks = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
      {blocks.map((block) => (
        <div
          key={block.label}
          className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px]"
        >
          <span className="text-2xl md:text-4xl font-bold text-white">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider mt-1">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function FlashSaleBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <motion.div
        style={{ y, backgroundImage: "url(https://images.unsplash.com/photo-1522335782469-f5a5f2e3c1b3?w=1920&q=80)" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#B76E79] font-medium text-sm md:text-base uppercase tracking-widest mb-4">
            Limited Time Offer
          </p>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-6">
            Offer Will Be End
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mb-8">
            Grab your favorite beauty products at unbeatable prices. Hurry,
            deals won't last long!
          </p>

          <CountdownBlocks />

          <Button
            size="lg"
            className="bg-[#B76E79] hover:bg-[#A45A65] text-white px-10 py-6 text-lg rounded-none"
          >
            Shop Now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
