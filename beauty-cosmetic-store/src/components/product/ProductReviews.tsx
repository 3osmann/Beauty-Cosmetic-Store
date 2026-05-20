"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { Review } from "@/types"

interface ProductReviewsProps {
  reviews: Review[]
  productId: string
}

interface RatingBarProps {
  rating: number
  count: number
  total: number
}

function RatingBar({ rating, count, total }: RatingBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground w-8">{rating} ★</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
    </div>
  )
}

export function ProductReviews({ reviews, productId }: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    rating: 0,
    userName: "",
    title: "",
    comment: "",
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalReviews = reviews.length
  const avgRating = totalReviews > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
    : 0

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.rating === 0 || !formData.comment.trim()) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ rating: 0, userName: "", title: "", comment: "" })
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <p className="text-5xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
          <div className="flex items-center justify-center md:justify-start gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(avgRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          {ratingCounts.map(({ rating, count }) => (
            <RatingBar
              key={rating}
              rating={rating}
              count={count}
              total={totalReviews}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Customer Reviews
        </h3>
        <Button onClick={() => setShowForm(!showForm)} variant="secondary" size="sm">
          Write a Review
          <ChevronDown
            className={cn(
              "h-4 w-4 ml-1 transition-transform duration-200",
              showForm && "rotate-180"
            )}
          />
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4 p-6 bg-muted/50 rounded-lg"
        >
          {submitted ? (
            <div className="text-center py-6">
              <p className="text-green-600 font-medium text-lg">Thank you for your review!</p>
              <p className="text-sm text-muted-foreground mt-1">Your review has been submitted.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Your Rating *
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={cn(
                          "h-6 w-6",
                          star <= (hoverRating || formData.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-name" className="text-sm font-medium text-foreground block mb-1">
                  Your Name
                </label>
                <Input
                  id="review-name"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  placeholder="Enter your name (optional)"
                />
              </div>

              <div>
                <label htmlFor="review-title" className="text-sm font-medium text-foreground block mb-1">
                  Review Title
                </label>
                <Input
                  id="review-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Summarize your review"
                />
              </div>

              <div>
                <label htmlFor="review-comment" className="text-sm font-medium text-foreground block mb-1">
                  Your Review *
                </label>
                <textarea
                  id="review-comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200"
                  required
                />
              </div>

              <Button type="submit" disabled={formData.rating === 0 || !formData.comment.trim() || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </>
          )}
        </motion.form>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary uppercase shrink-0">
                {(review.userName || "A")[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {review.userName || "Anonymous"}
                  </p>
                  {review.isVerified && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {review.title && (
                  <p className="text-sm font-medium text-foreground mb-1">
                    {review.title}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
