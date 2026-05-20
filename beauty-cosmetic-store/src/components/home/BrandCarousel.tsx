"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

const brands = [
  { id: 1, name: "LUXE Beauty" },
  { id: 2, name: "Glow Lab" },
  { id: 3, name: "Pure Organics" },
  { id: 4, name: "Velvet Touch" },
  { id: 5, name: "Crystal Clear" },
  { id: 6, name: "Bloom Cosmetics" },
]

export function BrandCarousel() {
  return (
    <section className="py-12 md:py-16 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={1500}
          loop
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 24 },
            640: { slidesPerView: 3, spaceBetween: 32 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 6, spaceBetween: 48 },
          }}
          className="!py-4"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="flex items-center justify-center h-20 px-6 rounded-sm bg-gray-100/50 border border-gray-200 grayscale hover:grayscale-0 hover:bg-white hover:border-[#B76E79]/30 transition-all duration-300 cursor-pointer">
                <span className="font-heading text-lg text-gray-400 group-hover:text-[#B76E79] transition-colors">
                  {brand.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
