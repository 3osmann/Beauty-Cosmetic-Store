"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { motion } from "framer-motion"
import { Star, Play } from "lucide-react"
import { TESTIMONIALS } from "@/data/testimonials"
import { cn } from "@/lib/utils"
import "swiper/css"
import "swiper/css/pagination"

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&q=80",
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-pink-50/50 to-rose-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-sm overflow-hidden group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80)",
              }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play className="h-6 w-6 md:h-8 md:w-8 text-white fill-white ml-1" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center -space-x-3">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  </div>
                ))}
              </div>
              <span className="ml-4 text-sm font-medium text-gray-500">
                99+ happy customers
              </span>
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="[&_.swiper-pagination-bullet]:bg-[#B76E79]/50 [&_.swiper-pagination-bullet-active]:bg-[#B76E79] [&_.swiper-pagination]:!static [&_.swiper-pagination]:!mt-6"
            >
              {TESTIMONIALS.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-5 w-5",
                            i < testimonial.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200"
                          )}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
