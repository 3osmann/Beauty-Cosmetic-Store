"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardData {
  label: string
  value: number
  prefix?: string
  suffix?: string
  change: number
  icon: React.ElementType
}

const STATS: StatCardData[] = [
  { label: "Total Sales", value: 84750, prefix: "$", change: 12.5, icon: DollarSign },
  { label: "Orders", value: 1234, change: 8.2, icon: ShoppingCart },
  { label: "Products", value: 356, change: -3.1, icon: Package },
  { label: "Customers", value: 8921, change: 15.7, icon: Users },
]

function useCountUp(target: number, duration: number = 2, start: boolean = true) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, start])

  return count
}

function StatCard({ stat, index }: { stat: StatCardData; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(stat.value, 2, isVisible)
  const Icon = stat.icon

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isPositive = stat.change >= 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
        <div className="w-10 h-10 rounded-lg bg-[#B76E79]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#B76E79]" />
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-sm",
        isPositive ? "text-green-600" : "text-red-500"
      )}>
        <span>{isPositive ? "↑" : "↓"}</span>
        <span>{Math.abs(stat.change)}%</span>
        <span className="text-muted-foreground ml-1">vs last month</span>
      </div>
    </motion.div>
  )
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  )
}
