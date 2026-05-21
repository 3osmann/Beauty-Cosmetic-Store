"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, RotateCcw, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types"

interface FilterState {
  categories: string[]
  brands: string[]
  ratings: number[]
  priceMin: string
  priceMax: string
}

interface ProductFiltersProps {
  categories: Category[]
  brands?: string[]
  onFilterChange: (filters: FilterState) => void
}

interface FilterSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <Separator />
    </div>
  )
}

export function ProductFilters({ categories, brands = [], onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    ratings: [],
    priceMin: "",
    priceMax: "",
  })

  const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    const next = { ...filters, [key]: value }
    setFilters(next)
    onFilterChange(next)
  }

  const toggleArrayFilter = (key: "categories" | "brands" | "ratings", value: string | number) => {
    const current = filters[key] as (string | number)[]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, next as any)
  }

  const clearAll = () => {
    const cleared: FilterState = {
      categories: [],
      brands: [],
      ratings: [],
      priceMin: "",
      priceMax: "",
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.ratings.length > 0 ||
    filters.priceMin !== "" ||
    filters.priceMax !== ""

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>
      <Separator className="mb-2" />

      <FilterSection title="Category">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Checkbox
              checked={filters.categories.includes(cat.id)}
              onCheckedChange={() => toggleArrayFilter("categories", cat.id)}
            />
            <span className="text-sm text-foreground flex-1">{cat.name}</span>
            {cat.productCount !== undefined && (
              <span className="text-xs text-muted-foreground">({cat.productCount})</span>
            )}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => updateFilter("priceMin", e.target.value)}
            className="h-9"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => updateFilter("priceMax", e.target.value)}
            className="h-9"
          />
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Checkbox
              checked={filters.ratings.includes(rating)}
              onCheckedChange={() => toggleArrayFilter("ratings", rating)}
            />
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">& up</span>
          </label>
        ))}
      </FilterSection>

      {brands.length > 0 && (
        <FilterSection title="Brand">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleArrayFilter("brands", brand)}
              />
              <span className="text-sm text-foreground">{brand}</span>
            </label>
          ))}
        </FilterSection>
      )}

      {hasActiveFilters && (
        <Button onClick={clearAll} variant="secondary" size="sm" className="w-full mt-4">
          Clear All Filters
        </Button>
      )}
    </div>
  )
}
