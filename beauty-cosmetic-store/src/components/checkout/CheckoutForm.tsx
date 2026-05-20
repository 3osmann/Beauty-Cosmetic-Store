"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, ChevronLeft, ChevronRight, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShippingAddress } from "./ShippingAddress"
import { BillingAddress } from "./BillingAddress"
import { PaymentMethod } from "./PaymentMethod"
import { OrderSummary } from "./OrderSummary"
import { ShippingMethod } from "./ShippingMethod"

const checkoutFormSchema = z.object({
  shipping: z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    company: z.string().optional(),
    country: z.string().min(2, "Country is required"),
    street: z.string().min(5, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().min(3, "ZIP code is required"),
    phone: z.string().min(7, "Phone number is required"),
    email: z.string().email("Valid email is required"),
  }),
  billing: z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    company: z.string().optional(),
    country: z.string().min(2, "Country is required"),
    street: z.string().min(5, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().min(3, "ZIP code is required"),
    phone: z.string().min(7, "Phone number is required"),
    email: z.string().email("Valid email is required"),
  }),
  shippingMethod: z.string().min(1, "Shipping method is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
})

type CheckoutFormData = z.infer<typeof checkoutFormSchema>

const STEPS = [
  { id: 0, label: "Information" },
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
]

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shipping: {
        firstName: "", lastName: "", company: "", country: "United States",
        street: "", apartment: "", city: "", state: "", zip: "",
        phone: "", email: "",
      },
      billing: {
        firstName: "", lastName: "", company: "", country: "United States",
        street: "", apartment: "", city: "", state: "", zip: "",
        phone: "", email: "",
      },
      shippingMethod: "standard",
      paymentMethod: "card",
      cardNumber: "", cardExpiry: "", cardCvc: "",
      agreeTerms: true as unknown as true,
    },
  })

  const { trigger, formState: { errors } } = form

  const canProceed = () => {
    if (currentStep === 0) return !!(form.watch("shipping.email") && form.watch("shipping.firstName"))
    if (currentStep === 1) return !!form.watch("shippingMethod")
    if (currentStep === 2) return !!form.watch("paymentMethod")
    return true
  }

  const handleNext = async () => {
    let fields: Array<keyof CheckoutFormData> = []
    if (currentStep === 0) {
      fields = ["shipping.firstName", "shipping.lastName", "shipping.email", "shipping.phone"] as any
    } else if (currentStep === 1) {
      fields = ["shippingMethod"]
    } else if (currentStep === 2) {
      fields = ["paymentMethod"]
    }
    const valid = await trigger(fields as any)
    if (valid) setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = () => {
    form.handleSubmit(
      (data) => {
        console.log("Checkout submitted:", data)
      },
      (errs) => console.log("Validation errors:", errs)
    )()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                          ? "bg-[#B76E79] text-white shadow-lg shadow-[#B76E79]/20"
                          : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.id + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:block",
                      currentStep === step.id ? "text-gray-900" : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-[2px] w-12 sm:w-20 md:w-32 mx-2 transition-colors duration-300",
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                    <p className="text-sm text-gray-500 mt-1">We&apos;ll use this to send you order updates.</p>
                  </div>
                  <ShippingAddress form={form} prefix="shipping" />
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Shipping Method</h2>
                    <p className="text-sm text-gray-500 mt-1">Choose your preferred delivery option.</p>
                  </div>
                  <ShippingMethod
                    value={form.watch("shippingMethod")}
                    onChange={(v) => form.setValue("shippingMethod", v)}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
                    <p className="text-sm text-gray-500 mt-1">Choose your payment method.</p>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-[#B76E79]"
                      />
                      <span className="text-sm text-gray-700">Billing same as shipping</span>
                    </label>
                  </div>

                  {!sameAsShipping && <BillingAddress form={form} prefix="billing" />}

                  <PaymentMethod
                    value={form.watch("paymentMethod")}
                    onChange={(v) => form.setValue("paymentMethod", v)}
                    form={form}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>
                    <p className="text-sm text-gray-500 mt-1">Please review before placing your order.</p>
                  </div>
                  <OrderSummary />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <div>
              {currentStep > 0 && (
                <Button variant="secondary" size="md" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {currentStep < 3 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                  <Lock className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <OrderSummary compact />
        </div>
      </div>
    </div>
  )
}
