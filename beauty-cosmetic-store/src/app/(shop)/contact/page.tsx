"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CONTACT_INFO = [
  { icon: MapPin, label: "Address", value: "123 Beauty Lane, New York, NY 10001" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, label: "Email", value: "hello@beaute.com" },
  { icon: Clock, label: "Hours", value: "Mon-Fri: 9AM-7PM, Sat: 10AM-5PM" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="bg-white dark:bg-gray-900 rounded-lg border border-border p-4">
                    <Icon className="w-5 h-5 text-[#B76E79] mb-2" />
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
                  </div>
                )
              })}
            </div>

            <div className="bg-muted rounded-lg h-64 overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Map Placeholder</p>
                <p className="text-xs text-muted-foreground">123 Beauty Lane, New York</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-6">Send a Message</h2>

            {sent ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
                <Send className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <h3 className="font-heading text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => setSent(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    placeholder="Tell us more..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    rows={6}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#B76E79] hover:bg-[#A45A65] text-white h-11 px-8"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
