"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Beauty & Care",
    subtitle: "From $299",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
  },
  {
    id: 2,
    title: "Get Your 50% Off",
    subtitle: "Nourish your skin",
    cta: "Grab Deal",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
  },
  {
    id: 3,
    title: "Body Lotion",
    subtitle: "From $39",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600",
  },
]

export function PromoBanners() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative h-72 overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-sm">
                  <h3 className="font-heading text-2xl text-white mb-1">
                    {banner.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">{banner.subtitle}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-4 py-2 rounded-none"
                  >
                    {banner.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
