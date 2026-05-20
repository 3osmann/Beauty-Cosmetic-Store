"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-heading text-2xl font-bold">
              <span className="text-[#B76E79]">Beauté</span>
            </Link>
            <h1 className="font-heading text-2xl font-bold mt-4">
              {sent ? "Check Your Email" : "Forgot Password"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {sent
                ? "We've sent a reset link to your email"
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <p className="text-sm text-muted-foreground">
                If an account with that email exists, you'll receive a password reset link shortly.
              </p>
              <Link href="/login">
                <Button variant="secondary" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#B76E79] hover:bg-[#A45A65] text-white h-11"
              >
                Send Reset Link
              </Button>

              <p className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-[#B76E79] hover:text-[#A45A65] inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
