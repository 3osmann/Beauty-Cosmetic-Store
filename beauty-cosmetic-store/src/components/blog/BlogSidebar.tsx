"use client"

import { useState } from "react"
import { BlogSearch } from "./BlogSearch"
import { CategoriesWidget } from "./CategoriesWidget"
import { RecentPosts } from "./RecentPosts"
import { TagsWidget } from "./TagsWidget"
import type { BlogPost } from "@/types"

const SAMPLE_CATEGORIES = [
  { name: "Skincare Tips", slug: "skincare-tips", count: 12 },
  { name: "Makeup Trends", slug: "makeup-trends", count: 8 },
  { name: "Clean Beauty", slug: "clean-beauty", count: 6 },
  { name: "Ingredient Spotlight", slug: "ingredient-spotlight", count: 10 },
  { name: "Beauty Tips", slug: "beauty-tips", count: 15 },
]

const SAMPLE_TAGS = [
  "Skincare",
  "Makeup",
  "Clean Beauty",
  "Vitamin C",
  "Anti-Aging",
  "Natural",
  "Organic",
  "Hair Care",
  "Body Care",
  "Fragrance",
]

interface BlogSidebarProps {
  recentPosts: BlogPost[]
  onSearch?: (query: string) => void
}

export function BlogSidebar({ recentPosts, onSearch }: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <aside className="space-y-6">
      <BlogSearch value={searchQuery} onChange={handleSearch} />
      <CategoriesWidget categories={SAMPLE_CATEGORIES} />
      <RecentPosts posts={recentPosts} />
      <TagsWidget tags={SAMPLE_TAGS} />
    </aside>
  )
}
