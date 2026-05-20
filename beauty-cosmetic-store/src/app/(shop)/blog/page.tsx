"use client"

import { useState } from "react"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
import { BLOG_POSTS } from "@/data/blog"
import type { BlogPost } from "@/types"

const POSTS: BlogPost[] = BLOG_POSTS.map((p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  content: p.content,
  featuredImage: p.featuredImage,
  author: { name: p.author },
  category: { name: p.category, slug: p.category.toLowerCase().replace(/\s+/g, "-") },
  tags: p.tags,
  publishedAt: p.publishedAt,
}))

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = POSTS.filter((post) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Our Blog</h1>
          <p className="text-muted-foreground">Beauty tips, trends, and inspiration</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogGrid posts={filtered} />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar recentPosts={POSTS} onSearch={setSearchQuery} />
          </div>
        </div>
      </div>
    </div>
  )
}
