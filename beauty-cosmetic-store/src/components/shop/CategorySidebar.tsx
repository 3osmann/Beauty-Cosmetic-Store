"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import type { Category } from "@/types"

interface CategorySidebarProps {
  categories: Category[]
  title?: string
}

function CategoryItem({
  category,
  isActive,
  depth = 0,
}: {
  category: Category
  isActive: boolean
  depth?: number
}) {
  const hasChildren = category.children && category.children.length > 0

  return (
    <li>
      <Link
        href={`/categories/${category.slug}`}
        className={cn(
          "flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground hover:bg-muted",
          depth > 0 && "ml-4"
        )}
      >
        <span>{category.name}</span>
        <div className="flex items-center gap-1">
          {category.productCount !== undefined && (
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                isActive ? "bg-primary/20 text-primary" : "bg-muted-foreground/10 text-muted-foreground"
              )}
            >
              {category.productCount}
            </span>
          )}
          {hasChildren && (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </div>
      </Link>
      {hasChildren && (
        <ul className="mt-1 space-y-1">
          {category.children!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              isActive={usePathname() === `/categories/${child.slug}`}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function CategorySidebar({ categories, title = "Categories" }: CategorySidebarProps) {
  const pathname = usePathname()

  return (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      <ul className="space-y-1">
        <li>
          <Link
            href="/shop"
            className={cn(
              "flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors",
              pathname === "/shop"
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span>All Products</span>
          </Link>
        </li>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={
              pathname === `/categories/${category.slug}` ||
              pathname.startsWith(`/categories/${category.slug}/`)
            }
          />
        ))}
      </ul>
    </div>
  )
}
