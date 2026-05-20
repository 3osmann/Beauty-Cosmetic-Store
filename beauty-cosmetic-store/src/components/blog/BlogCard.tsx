"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types"

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={post.featuredImage || "/images/blog/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-[#B76E79] text-white text-xs font-semibold px-3 py-1.5 rounded">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Recent"}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.author?.name || "Beauté"}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </span>
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#B76E79] transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-[#B76E79] hover:text-[#A45A65] transition-colors inline-flex items-center gap-1"
          >
            Read More
            <span className="text-lg leading-none">&rarr;</span>
          </Link>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageCircle className="w-3.5 h-3.5" />
            0 Comments
          </span>
        </div>
      </div>
    </motion.article>
  )
}
