"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 mx-auto bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
        >
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </motion.div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-2 leading-relaxed">
          An unexpected error occurred. Our team has been notified.
        </p>
        <p className="text-xs text-muted-foreground mb-8 font-mono bg-muted inline-block px-3 py-1 rounded-md">
          {error.digest ? `Error ID: ${error.digest}` : error.message}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="bg-[#B76E79] hover:bg-[#A45A65] text-white gap-2 min-w-[160px]"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/")} className="min-w-[160px]">
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
