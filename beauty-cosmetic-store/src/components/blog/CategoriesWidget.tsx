"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryEntry {
  name: string
  slug: string
  count: number
}

interface CategoriesWidgetProps {
  categories: CategoryEntry[]
  className?: string
}

export function CategoriesWidget({ categories, className }: CategoriesWidgetProps) {
  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm", className)}>
      <h3 className="font-heading text-lg font-semibold mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/blog?category=${cat.slug}`}
              className="flex items-center justify-between py-2 px-3 rounded-md text-sm hover:bg-muted transition-colors group"
            >
              <span className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-[#B76E79] group-hover:translate-x-0.5 transition-transform" />
                {cat.name}
              </span>
              <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
