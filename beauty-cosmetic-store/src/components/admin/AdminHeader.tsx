"use client"

import { useState } from "react"
import { Menu, Search, Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AdminHeaderProps {
  title: string
  onMenuToggle: () => void
}

export function AdminHeader({ title, onMenuToggle }: AdminHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="h-16 bg-white dark:bg-gray-900 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "hidden md:block relative",
            searchOpen && "block"
          )}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 w-48 lg:w-64"
          />
        </div>
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <Search className="w-5 h-5" />
        </button>

        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 ml-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/images/avatars/admin.jpg" alt="Admin" />
              <AvatarFallback className="bg-[#B76E79] text-white text-xs">
                AD
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">Admin</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
