import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(3, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
})

export const couponSchema = z.object({
  code: z.string().min(3, "Coupon code must be at least 3 characters"),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().positive("Discount value must be positive"),
  minAmount: z.number().optional(),
  maxUses: z.number().optional(),
  startsAt: z.date(),
  expiresAt: z.date(),
})

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  title: z.string().optional(),
  comment: z.string().min(10, "Review must be at least 10 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type CouponInput = z.infer<typeof couponSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
