"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react"

interface DropdownMenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext)
  if (!context)
    throw new Error(
      "DropdownMenu components must be used within a DropdownMenu"
    )
  return context
}

interface DropdownMenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function DropdownMenu({
  open: controlledOpen,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled
    ? (onOpenChange ?? (() => {}))
    : setUncontrolledOpen

  return (
    <DropdownMenuContext.Provider
      value={{ open, onOpenChange: setOpen }}
    >
      {children}
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({
  asChild,
  children,
  className,
  ...props
}: {
  asChild?: boolean
  children: React.ReactNode
} & HTMLAttributes<HTMLButtonElement>) {
  const { open, onOpenChange } = useDropdownMenu()
  return (
    <button
      className={cn("inline-flex items-center", className)}
      onClick={() => onOpenChange(!open)}
      aria-expanded={open}
      aria-haspopup="menu"
      {...props}
    >
      {children}
    </button>
  )
}

function DropdownMenuContent({
  className,
  children,
  align = "start",
  ...props
}: HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }) {
  const { open, onOpenChange } = useDropdownMenu()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    },
    [onOpenChange]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, handleKeyDown])

  const alignClass = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 -translate-x-1/2",
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
            alignClass[align],
            className
          )}
          onClick={() => onOpenChange(false)}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      role="menuitem"
      tabIndex={-1}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuRadioGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function DropdownMenuRadioItem({
  children,
  className,
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      role="menuitemradio"
      aria-checked
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-current" />
      </span>
      {children}
    </div>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
}
