"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types"

interface RecentPostsProps {
  posts: BlogPost[]
  className?: string
}

export function RecentPosts({ posts, className }: RecentPostsProps) {
  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm", className)}>
      <h3 className="font-heading text-lg font-semibold mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex gap-3 group"
          >
            <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden">
              <Image
                src={post.featuredImage || "/images/blog/placeholder.jpg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-[#B76E79] transition-colors">
                {post.title}
              </h4>
              <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <CalendarDays className="w-3 h-3" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
