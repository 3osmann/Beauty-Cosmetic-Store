"use client"

import { cn } from "@/lib/utils"
import { forwardRef, useState } from "react"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onError?: () => void
}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt, onError, ...props }, ref) => {
    const [hasError, setHasError] = useState(false)

    if (hasError) return null

    return (
      <img
        ref={ref}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        onError={() => {
          setHasError(true)
          onError?.()
        }}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
        className
      )}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
