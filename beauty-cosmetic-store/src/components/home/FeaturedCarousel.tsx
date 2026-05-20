"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import "swiper/css"

const cards = [
  {
    id: 1,
    title: "Skincare",
    subtitle: "Organic Ingredients",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
  },
  {
    id: 2,
    title: "Candice Green",
    subtitle: "Creative Digression, Makeup",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80",
  },
  {
    id: 3,
    title: "What's News",
    subtitle: "Shop Our New Arrivals",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
  },
]

export function FeaturedCarousel() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="hidden md:grid grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative h-80 overflow-hidden cursor-pointer rounded-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="font-heading text-3xl text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-white/80 text-sm mb-3">{card.subtitle}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start text-xs px-6 py-2 rounded-none"
                >
                  {card.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView={1}
          className="md:!hidden"
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div
                className="relative h-72 overflow-hidden cursor-pointer rounded-sm"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="font-heading text-3xl text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">{card.subtitle}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start text-xs px-6 py-2 rounded-none"
                  >
                    {card.cta}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
