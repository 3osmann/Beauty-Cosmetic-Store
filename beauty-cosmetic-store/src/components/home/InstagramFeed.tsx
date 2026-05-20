"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram } from "lucide-react"

const images = [
  { id: 1, gradient: "from-pink-400 to-rose-400" },
  { id: 2, gradient: "from-purple-400 to-pink-400" },
  { id: 3, gradient: "from-rose-400 to-red-400" },
  { id: 4, gradient: "from-amber-400 to-orange-400" },
  { id: 5, gradient: "from-teal-400 to-cyan-400" },
  { id: 6, gradient: "from-indigo-400 to-purple-400" },
]

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900">
            Instagram Feed
          </h2>
          <Link
            href="https://instagram.com/cosmeticstore"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-[#B76E79] hover:underline font-medium mt-2"
          >
            <Instagram className="h-4 w-4" />
            @cosmeticstore
          </Link>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {images.map((img, index) => (
            <motion.a
              key={img.id}
              href="https://instagram.com/cosmeticstore"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden"
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${img.gradient}`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Instagram className="h-6 w-6 md:h-8 md:w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
