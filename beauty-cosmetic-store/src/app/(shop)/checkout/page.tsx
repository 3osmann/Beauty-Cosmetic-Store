"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, MapPin, Package, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const STEPS = ["Information", "Shipping", "Payment"]

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  const updateForm = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, 2))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

          <div className="flex items-center justify-center mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      i < step
                        ? "bg-[#B76E79] text-white"
                        : i === step
                          ? "bg-[#B76E79]/10 text-[#B76E79] border-2 border-[#B76E79]"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:block",
                      i <= step ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-12 md:w-20 h-0.5 mx-2 md:mx-4",
                      i < step ? "bg-[#B76E79]" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 space-y-6"
            >
              {step === 0 && (
                <>
                  <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#B76E79]" />
                    Contact & Address
                  </h2>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First name"
                        value={form.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        required
                      />
                    </div>
                    <Input
                        placeholder="Address"
                        value={form.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                        required
                      />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Input
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        required
                        className="md:col-span-2"
                      />
                      <Input
                        placeholder="State"
                        value={form.state}
                        onChange={(e) => updateForm("state", e.target.value)}
                      />
                      <Input
                        placeholder="ZIP code"
                        value={form.zip}
                        onChange={(e) => updateForm("zip", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#B76E79]" />
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Standard Shipping", price: "Free", eta: "5-7 business days" },
                      { id: "express", label: "Express Shipping", price: "$12.99", eta: "2-3 business days" },
                      { id: "overnight", label: "Overnight Shipping", price: "$24.99", eta: "1 business day" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors",
                          form.shippingMethod === method.id
                            ? "border-[#B76E79] bg-[#B76E79]/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={form.shippingMethod === method.id}
                            onChange={(e) => updateForm("shippingMethod", e.target.value)}
                            className="w-4 h-4 text-[#B76E79]"
                          />
                          <div>
                            <p className="font-medium text-sm">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.eta}</p>
                          </div>
                        </div>
                        <span className={cn("font-medium text-sm", method.price === "Free" && "text-green-600")}>
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#B76E79]" />
                    Payment
                  </h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={(e) => updateForm("cardNumber", e.target.value)}
                      maxLength={19}
                      required
                    />
                    <Input
                      placeholder="Name on card"
                      value={form.cardName}
                      onChange={(e) => updateForm("cardName", e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={(e) => updateForm("expiry", e.target.value)}
                        maxLength={5}
                        required
                      />
                      <Input
                        placeholder="CVC"
                        value={form.cvc}
                        onChange={(e) => updateForm("cvc", e.target.value)}
                        maxLength={4}
                        required
                      />
                    </div>
                    <div className="bg-muted rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$96.99</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-[#B76E79]">$96.99</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            <div className="flex items-center justify-between mt-6">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={prevStep} className="gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < 2 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#B76E79] hover:bg-[#A45A65] text-white min-w-[160px]"
                >
                  Place Order
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
