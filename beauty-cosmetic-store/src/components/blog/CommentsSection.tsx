"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Reply } from "lucide-react"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  author: string
  avatar?: string
  date: string
  content: string
  replies?: Comment[]
}

interface CommentsSectionProps {
  comments?: Comment[]
  className?: string
}

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Sophie Laurent",
    avatar: "/images/avatars/avatar-1.jpg",
    date: "2026-03-15",
    content:
      "This is such an informative post! I've been looking for a comprehensive guide like this. The tips about vitamin C are especially helpful.",
    replies: [
      {
        id: "c1-r1",
        author: "Beauté Team",
        date: "2026-03-16",
        content:
          "Thank you, Sophie! We're glad you found it helpful. Stay tuned for more skincare guides!",
      },
    ],
  },
  {
    id: "c2",
    author: "Emma Richardson",
    avatar: "/images/avatars/avatar-2.jpg",
    date: "2026-03-14",
    content:
      "Great article! I would love to see a follow-up about nighttime routines specifically for combination skin.",
  },
]

export function CommentsSection({ comments = SAMPLE_COMMENTS, className }: CommentsSectionProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName("")
    setEmail("")
    setComment("")
  }

  return (
    <div className={cn("space-y-8", className)}>
      <h2 className="font-heading text-2xl font-semibold flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        Comments ({comments.length})
      </h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
                <button
                  onClick={() =>
                    setShowReplyForm(showReplyForm === comment.id ? null : comment.id)
                  }
                  className="flex items-center gap-1 text-xs text-[#B76E79] hover:text-[#A45A65] mt-2 transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>

                {showReplyForm === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <Input
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="h-9 text-sm"
                    />
                    <Button
                      size="sm"
                      className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
                      onClick={() => {
                        setReplyText("")
                        setShowReplyForm(null)
                      }}
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {comment.replies?.map((reply) => (
              <div key={reply.id} className="flex gap-4 ml-14">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={reply.avatar} alt={reply.author} />
                  <AvatarFallback>{reply.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-sm">{reply.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(reply.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{reply.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-6">
        <h3 className="font-heading text-lg font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <textarea
            placeholder="Your Comment *"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={5}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          />
          <Button
            type="submit"
            className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
          >
            Post Comment
          </Button>
        </form>
      </div>
    </div>
  )
}
