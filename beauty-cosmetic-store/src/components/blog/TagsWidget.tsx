"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface TagsWidgetProps {
  tags: string[]
  className?: string
}

export function TagsWidget({ tags, className }: TagsWidgetProps) {
  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm", className)}>
      <h3 className="font-heading text-lg font-semibold mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
            className="text-xs px-3 py-1.5 bg-muted hover:bg-[#B76E79] hover:text-white rounded-full transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}
