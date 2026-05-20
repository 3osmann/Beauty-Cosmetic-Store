"use client"

import { BlogCard } from "./BlogCard"
import { Skeleton } from "@/components/ui/skeleton"
import type { BlogPost } from "@/types"

interface BlogGridProps {
  posts: BlogPost[]
  isLoading?: boolean
}

export function BlogGrid({ posts, isLoading }: BlogGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-56 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="text-center py-20">
        <h3 className="font-heading text-2xl mb-2">No posts found</h3>
        <p className="text-muted-foreground">Check back later for new articles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  )
}
