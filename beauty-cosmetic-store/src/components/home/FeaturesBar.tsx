"use client"

import { motion } from "framer-motion"
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $99",
  },
  {
    icon: RotateCcw,
    title: "30 Days Return",
    description: "Money back guarantee",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer care",
  },
]

export function FeaturesBar() {
  return (
    <section className="py-12 bg-amber-50/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#B76E79]/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[#B76E79]" />
              </div>
              <h3 className="font-medium text-gray-800 text-sm md:text-base">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
