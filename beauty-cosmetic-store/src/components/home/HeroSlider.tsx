"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-rose-900/60 to-rose-800/30",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920",
    title: "Free Shipping Beauty",
    subtitle:
      "Shop Top Quality Haircare, Makeup, Skincare, Nailcare & Much More.",
    cta: "Shop Now",
  },
  {
    id: 2,
    bg: "bg-gradient-to-l from-amber-900/50 to-amber-800/30",
    image:
      "https://images.unsplash.com/photo-1522335782469-f5a5f2e3c1b3?w=1920",
    title: "Premium Cosmetics",
    subtitle: "Discover our exclusive range of luxury beauty products.",
    cta: "Explore Collection",
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-pink-900/50 to-pink-800/30",
    image:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920",
    title: "New Season Collection",
    subtitle: "Fresh looks for the new season. Be the first to explore.",
    cta: "Discover Now",
  },
]

export function HeroSlider() {
  return (
    <section className="relative h-[85vh] min-h-[600px]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`absolute inset-0 ${slide.bg}`} />
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#B76E79] hover:bg-[#A45A65] text-white px-10 py-6 text-lg rounded-none hover:shadow-xl transition-all duration-300"
                  >
                    {slide.cta}
                  </Button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
