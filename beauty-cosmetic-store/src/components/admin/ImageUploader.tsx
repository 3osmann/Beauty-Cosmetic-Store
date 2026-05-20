"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  className,
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const remaining = maxImages - images.length
    const validFiles = files.slice(0, remaining)
    if (!validFiles.length) return

    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          const newImages = validFiles.map(
            (f) => URL.createObjectURL(f)
          )
          onImagesChange([...images, ...newImages])
          setUploading(false)
          setProgress(0)
          return 0
        }
        return prev + 20
      })
    }, 200)
  }

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          dragActive
            ? "border-[#B76E79] bg-[#B76E79]/5"
            : "border-border hover:border-[#B76E79]/50 hover:bg-muted/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || [])
            handleFiles(files)
            e.target.value = ""
          }}
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium">
            Drag & drop images here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Max {maxImages} images. Supports JPG, PNG, WebP
          </p>
        </div>
      </div>

      {uploading && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-[#B76E79]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          <AnimatePresence>
            {images.map((img, index) => (
              <motion.div
                key={`${img}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-lg overflow-hidden border border-border group"
              >
                <img
                  src={img}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {images.length < maxImages && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-[#B76E79]/50 transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
