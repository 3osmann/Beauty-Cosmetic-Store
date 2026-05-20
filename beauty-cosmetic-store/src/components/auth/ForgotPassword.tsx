"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Password reset requested for:", data.email)
    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 py-8"
          >
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Check your email</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
            <p className="text-xs text-gray-400">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="text-[#B76E79] hover:text-[#A45A65] transition-colors underline"
              >
                try again
              </button>
            </p>
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-[#B76E79] hover:text-[#A45A65] transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to login
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <p className="text-sm text-gray-500 mb-5">
                Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="forgot-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <p className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-gray-500 hover:text-[#B76E79] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to login
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
