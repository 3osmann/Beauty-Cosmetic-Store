"use client"

import Image from "next/image"
import Link from "next/link"
import { CATEGORIES_MEGA } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function MegaMenu() {
  const promo = CATEGORIES_MEGA[0]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-6 w-[700px]">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {CATEGORIES_MEGA.slice(0, 6).map((cat) => (
            <div key={cat.slug}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="text-sm font-semibold text-gray-900 hover:text-[#B76E79] transition-colors"
              >
                {cat.name}
              </Link>
              <ul className="mt-2 space-y-1">
                {cat.subcategories.map((sub) => (
                  <li key={sub}>
                    <Link
                      href={`/shop?category=${cat.slug}&subcategory=${sub.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-xs text-gray-500 hover:text-[#B76E79] transition-colors"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative h-full min-h-[250px] rounded-xl overflow-hidden group">
          <Image
            src={promo.image}
            alt={promo.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm font-semibold">{promo.name}</p>
            <Link
              href={`/shop?category=${promo.slug}`}
              className="text-xs text-white/80 hover:text-white transition-colors inline-block mt-1 underline underline-offset-2"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
