"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react"

interface SheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

function useSheet() {
  const context = useContext(SheetContext)
  if (!context) throw new Error("Sheet components must be used within a Sheet")
  return context
}

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Sheet({ open = false, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange ?? (() => {}) }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({
  asChild,
  children,
  ...props
}: { asChild?: boolean; children: React.ReactNode } & HTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useSheet()
  return (
    <button onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right"
}

const sideVariants = {
  top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
  bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
  left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
  right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
}

const sideStyles = {
  top: "inset-x-0 top-0 border-b",
  bottom: "inset-x-0 bottom-0 border-t",
  left: "inset-y-0 left-0 border-r w-3/4 max-w-sm",
  right: "inset-y-0 right-0 border-l w-3/4 max-w-sm",
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  const { open, onOpenChange } = useSheet()
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    },
    [onOpenChange]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={sideVariants[side].initial}
            animate={sideVariants[side].animate}
            exit={sideVariants[side].exit}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed z-50 gap-4 bg-background p-6 shadow-2xl",
              sideStyles[side],
              className
            )}
            {...props}
          >
            {children}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SheetHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

const SheetTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold text-foreground",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = "SheetDescription"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
