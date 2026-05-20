"use client"

import { Select } from "@/components/ui/select"

interface ProductSortingProps {
  value: string
  onChange: (value: string) => void
}

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
]

export function ProductSorting({ value, onChange }: ProductSortingProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-muted-foreground whitespace-nowrap">
        Sort by:
      </label>
      <Select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-auto min-w-[160px]"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
