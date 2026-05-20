"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { CalendarDays, User, Tag, ArrowLeft } from "lucide-react"
import { CommentsSection } from "@/components/blog/CommentsSection"
import { BLOG_POSTS } from "@/data/blog"
import { Badge } from "@/components/ui/badge"

export default function SingleBlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-2">Post not found</h1>
          <Link href="/blog" className="text-[#B76E79] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[#B76E79] hover:text-[#A45A65] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.featuredImage || "/images/blog/placeholder.jpg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <Badge className="bg-[#B76E79]/10 text-[#B76E79] text-xs">
              {post.category}
            </Badge>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          <div className="flex items-center gap-2 mt-8 pt-8 border-t border-border">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                className="text-xs px-3 py-1.5 bg-muted hover:bg-[#B76E79] hover:text-white rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <CommentsSection />
          </div>
        </article>
      </div>
    </div>
  )
}
