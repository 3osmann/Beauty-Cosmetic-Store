"use client"

import { motion } from "framer-motion"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our curated collection of premium beauty products
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.a
              key={category.id}
              href={`/shop?category=${category.slug}`}
              variants={item}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 border-2 border-gray-100 group-hover:border-[#B76E79] transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#B76E79]/20">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
              </div>
              <h3 className="font-heading text-lg md:text-xl text-gray-800 group-hover:text-[#B76E79] transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {category.productCount} Products
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
