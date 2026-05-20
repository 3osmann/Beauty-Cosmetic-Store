"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Edit3, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Coupon } from "@/types"

interface CouponsTableProps {
  coupons: Coupon[]
  onAdd?: (coupon: Partial<Coupon>) => void
  onEdit?: (coupon: Coupon) => void
  onDelete?: (coupon: Coupon) => void
  onToggleActive?: (coupon: Coupon) => void
}

export function CouponsTable({
  coupons,
  onAdd,
  onEdit,
  onDelete,
  onToggleActive,
}: CouponsTableProps) {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENTAGE" as "PERCENTAGE" | "FIXED",
    discountValue: 0,
    minAmount: 0,
    maxUses: 0,
  })

  const filtered = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search coupons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Coupon
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted rounded-lg p-4 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              placeholder="Coupon code"
              value={form.code}
              onChange={(e) =>
                setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
              }
            />
            <select
              value={form.discountType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  discountType: e.target.value as "PERCENTAGE" | "FIXED",
                }))
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed Amount</option>
            </select>
            <Input
              type="number"
              placeholder="Discount value"
              value={form.discountValue || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, discountValue: Number(e.target.value) }))
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min amount (optional)"
              value={form.minAmount || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, minAmount: Number(e.target.value) }))
              }
            />
            <Input
              type="number"
              placeholder="Max uses (optional)"
              value={form.maxUses || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, maxUses: Number(e.target.value) }))
              }
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
              onClick={() => {
                onAdd?.(form)
                setForm({
                  code: "",
                  discountType: "PERCENTAGE",
                  discountValue: 0,
                  minAmount: 0,
                  maxUses: 0,
                })
                setShowForm(false)
              }}
            >
              Create Coupon
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Code</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Value</th>
              <th className="text-left p-3">Min Amount</th>
              <th className="text-left p-3">Uses</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Expires</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((coupon, i) => (
              <motion.tr
                key={coupon.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <td className="p-3 font-mono font-bold text-xs uppercase">{coupon.code}</td>
                <td className="p-3 text-muted-foreground">
                  {coupon.discountType === "PERCENTAGE" ? "%" : "$"}
                </td>
                <td className="p-3 font-medium">
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </td>
                <td className="p-3 text-muted-foreground">
                  {coupon.minAmount ? `$${coupon.minAmount}` : "—"}
                </td>
                <td className="p-3">
                  <span className="text-muted-foreground">
                    {coupon.usedCount}
                    {coupon.maxUses ? `/${coupon.maxUses}` : ""}
                  </span>
                </td>
                <td className="p-3">
                  <Badge
                    className={cn(
                      coupon.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {coupon.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-3 text-muted-foreground text-xs">
                  {new Date(coupon.expiresAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onToggleActive?.(coupon)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Toggle status"
                    >
                      {coupon.isActive ? (
                        <ToggleRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onEdit?.(coupon)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(coupon)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
