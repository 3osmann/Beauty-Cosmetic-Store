"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check, X } from "lucide-react"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerFormSchema>

const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "Contains uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Contains a number", test: (v: string) => /[0-9]/.test(v) },
  { label: "Passwords match", test: (v: string) => v.length > 0 },
]

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "", email: "", password: "", confirmPassword: "",
      agreeTerms: true as unknown as true,
    },
  })

  const password = watch("password") || ""
  const confirmPassword = watch("confirmPassword") || ""

  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    ...req,
    met: req.label === "Passwords match"
      ? confirmPassword.length > 0 && password === confirmPassword
      : req.test(password),
  }))

  const strengthScore = requirements.filter((r) => r.met).length
  const strengthLabel = ["Weak", "Fair", "Good", "Strong"][strengthScore - 1] || "Weak"
  const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][strengthScore - 1] || "bg-red-500"

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Register:", data)
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="register-name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="register-name"
              type="text"
              placeholder="Jane Doe"
              {...register("name")}
              className="pl-10"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="register-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="register-email"
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

        <div className="space-y-1.5">
          <Label htmlFor="register-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password")}
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {password.length > 0 && (
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-300", strengthColor)}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{strengthLabel}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    {req.met ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-gray-300" />
                    )}
                    <span className={cn("text-xs", req.met ? "text-green-600" : "text-gray-400")}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="register-confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="register-confirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="flex items-start gap-2 cursor-pointer">
            <Checkbox {...register("agreeTerms")} className="mt-0.5" />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-[#B76E79] hover:text-[#A45A65] transition-colors">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#B76E79] hover:text-[#A45A65] transition-colors">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500">{errors.agreeTerms.message}</p>
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
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#B76E79] font-medium hover:text-[#A45A65] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  )
}
