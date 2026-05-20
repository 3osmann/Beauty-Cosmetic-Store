"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Edit3,
  Trash2,
  Copy,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"

interface ProductsTableProps {
  products: Product[]
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  onDuplicate?: (product: Product) => void
}

type SortKey = "name" | "price" | "stock" | "createdAt"

export function ProductsTable({ products, onEdit, onDelete, onDuplicate }: ProductsTableProps) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronsUpDown className="w-3.5 h-3.5" />
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5" />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-10 h-10"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 w-12">Image</th>
              <th
                className="text-left p-3 cursor-pointer select-none"
                onClick={() => toggleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name <SortIcon column="name" />
                </div>
              </th>
              <th className="text-left p-3">SKU</th>
              <th
                className="text-left p-3 cursor-pointer select-none"
                onClick={() => toggleSort("price")}
              >
                <div className="flex items-center gap-1">
                  Price <SortIcon column="price" />
                </div>
              </th>
              <th
                className="text-left p-3 cursor-pointer select-none"
                onClick={() => toggleSort("stock")}
              >
                <div className="flex items-center gap-1">
                  Stock <SortIcon column="stock" />
                </div>
              </th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <td className="p-3">
                  <div className="w-10 h-10 rounded-md bg-muted overflow-hidden">
                    {product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3 text-muted-foreground">{product.sku}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={cn(
                      product.stock > 50
                        ? "text-green-600"
                        : product.stock > 10
                          ? "text-amber-500"
                          : "text-red-500"
                    )}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">{product.category?.name || "—"}</td>
                <td className="p-3">
                  <Badge
                    variant={product.isActive ? "default" : "default"}
                    className={cn(
                      product.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {product.isActive ? "Active" : "Draft"}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit?.(product)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDuplicate?.(product)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(product)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-8 h-8 rounded-md text-sm transition-colors",
                  p === page
                    ? "bg-[#B76E79] text-white"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {p}
              </button>
            ))}
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
