"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit3, Trash2, ChevronRight, ChevronDown, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

interface CategoriesManagerProps {
  categories: Category[]
  onAdd?: (category: Partial<Category>) => void
  onEdit?: (category: Category) => void
  onDelete?: (category: Category) => void
}

export function CategoriesManager({
  categories,
  onAdd,
  onEdit,
  onDelete,
}: CategoriesManagerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [editing, setEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: "", slug: "" })
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState({ name: "", slug: "", parentId: "" })

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const renderCategory = (cat: Category, depth: number = 0) => {
    const isExpanded = expanded.has(cat.id)
    const hasChildren = cat.children && cat.children.length > 0

    return (
      <div key={cat.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group",
            editing === cat.id && "bg-muted"
          )}
          style={{ paddingLeft: `${12 + depth * 24}px` }}
        >
          <button
            onClick={() => hasChildren && toggleExpand(cat.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <span className="w-4" />
            )}
          </button>

          <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />

          {editing === cat.id ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
                className="h-8 text-sm"
                autoFocus
              />
              <Button
                size="sm"
                className="bg-[#B76E79] hover:bg-[#A45A65] text-white h-8"
                onClick={() => {
                  onEdit?.({ ...cat, name: editForm.name, slug: editForm.slug })
                  setEditing(null)
                }}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <span className="flex-1 text-sm font-medium">{cat.name}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {cat.productCount || 0}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditing(cat.id)
                    setEditForm({ name: cat.name, slug: cat.slug })
                  }}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete?.(cat)}
                  className="p-1 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
        {hasChildren && isExpanded && (
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {cat.children!.map((child) => renderCategory(child, depth + 1))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Categories</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-muted rounded-lg p-4 space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                placeholder="Category name"
                value={addForm.name}
                onChange={(e) =>
                  setAddForm((f) => ({
                    ...f,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
              />
              <Input
                placeholder="Slug (auto-generated)"
                value={addForm.slug}
                onChange={(e) => setAddForm((f) => ({ ...f, slug: e.target.value }))}
              />
              <select
                value={addForm.parentId}
                onChange={(e) => setAddForm((f) => ({ ...f, parentId: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">No parent (top level)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
                onClick={() => {
                  onAdd?.({
                    name: addForm.name,
                    slug: addForm.slug,
                    parentId: addForm.parentId || undefined,
                  })
                  setAddForm({ name: "", slug: "", parentId: "" })
                  setShowAddForm(false)
                }}
              >
                Create
              </Button>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border border-border rounded-lg divide-y divide-border">
        {categories.map((cat) => renderCategory(cat))}
        {categories.length === 0 && (
          <p className="p-8 text-center text-muted-foreground">No categories yet</p>
        )}
      </div>
    </div>
  )
}
