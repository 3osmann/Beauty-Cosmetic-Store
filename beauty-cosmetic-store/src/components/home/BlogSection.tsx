"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, User, MessageCircle, ArrowRight } from "lucide-react"
import { BLOG_POSTS } from "@/data/blog"
import { formatDate } from "@/lib/utils"

const posts = BLOG_POSTS.slice(0, 3)

export function BlogSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900">
            Latest News
          </h2>
          <p className="text-gray-500 mt-2">
            Stay updated with beauty tips, trends, and expert advice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-gray-100 rounded-sm overflow-hidden"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block relative aspect-video overflow-hidden bg-gray-100"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.featuredImage})` }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#B76E79] text-white text-xs font-medium px-2.5 py-1 rounded-sm">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    0
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-heading text-lg text-gray-800 group-hover:text-[#B76E79] transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#B76E79] hover:underline"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
