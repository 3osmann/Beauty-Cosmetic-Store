"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightbox, setIsLightbox] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const goTo = (index: number) => {
    setSelectedIndex((index + images.length) % images.length)
  }

  if (!images.length) return null

  return (
    <>
      <div className="space-y-4">
        <div
          ref={imageRef}
          className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-crosshair"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightbox(true)}
        >
          <Image
            src={images[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover select-none"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {showZoom && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `url(${images[selectedIndex]}) no-repeat`,
                backgroundSize: "200%",
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                opacity: 0,
              }}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-200",
              showZoom ? "opacity-100" : "opacity-0"
            )}
            style={{
              backgroundImage: `url(${images[selectedIndex]})`,
              backgroundSize: "250%",
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            }}
          />
        </div>

        {images.length > 1 && (
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={cn(
                    "relative aspect-square w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                    idx === selectedIndex
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
            {images.length > 4 && (
              <>
                <button
                  onClick={() => goTo(selectedIndex - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => goTo(selectedIndex + 1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center shadow-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsLightbox(false)}
          >
            <button
              onClick={() => setIsLightbox(false)}
              className="absolute top-6 right-6 text-white hover:text-white/70 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(selectedIndex - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="80vw"
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(selectedIndex + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(idx) }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    idx === selectedIndex ? "bg-white w-6" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
