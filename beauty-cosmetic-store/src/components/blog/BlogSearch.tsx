"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface BlogSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function BlogSearch({ value, onChange, className }: BlogSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 h-11"
      />
    </div>
  )
}
