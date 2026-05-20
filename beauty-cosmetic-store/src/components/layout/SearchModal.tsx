"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

const mockResults = [
  { id: "1", name: "Hydrating Face Serum", category: "Skincare" },
  { id: "2", name: "Matte Lipstick", category: "Makeup" },
  { id: "3", name: "Volumizing Mascara", category: "Makeup" },
  { id: "4", name: "Nourishing Hair Oil", category: "Hair Care" },
  { id: "5", name: "Vitamin C Moisturizer", category: "Skincare" },
]

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const results = query
    ? mockResults.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white mx-auto mt-20 max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-black/5">
              <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 text-base outline-none placeholder:text-gray-400"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2">
              {query && results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No results found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
              {results.length > 0 && (
                <div className="space-y-0.5">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={onClose}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-zinc-50 transition-colors text-left"
                    >
                      <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{result.name}</p>
                        <p className="text-xs text-gray-400">{result.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {!query && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm">Start typing to search products</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
