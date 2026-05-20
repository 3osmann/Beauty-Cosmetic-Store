"use client"
import { useState, useEffect } from "react"

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        clearInterval(interval)
        return
      }

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return countdown
}
