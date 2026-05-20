"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: "Products", value: 500, suffix: "+" },
  { label: "Active Years", value: 10, suffix: "+" },
  { label: "Branches", value: 6, suffix: "" },
  { label: "Happy Customers", value: 20, suffix: "K+" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-pink-50/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#B76E79] mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
