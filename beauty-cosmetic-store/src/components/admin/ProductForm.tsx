"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ImageUploader } from "./ImageUploader"
import { cn } from "@/lib/utils"
import type { Product, Category } from "@/types"

interface ProductFormProps {
  product?: Product
  categories: Category[]
  onSubmit: (data: Partial<Product>) => void
  onCancel: () => void
}

export function ProductForm({ product, categories, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
    price: product?.price || 0,
    comparePrice: product?.comparePrice || 0,
    costPrice: 0,
    sku: product?.sku || "",
    barcode: "",
    stock: product?.stock || 0,
    categoryId: product?.categoryId || "",
    tags: product?.tags?.join(", ") || "",
    images: product?.images || [],
    isFeatured: product?.isFeatured || false,
    isNew: product?.isNew || false,
    isBestSeller: product?.isBestSeller || false,
    isActive: product?.isActive ?? true,
  })

  const [tagList, setTagList] = useState<string[]>(product?.tags || [])

  const addTag = (tag: string) => {
    if (tag && !tagList.includes(tag)) {
      setTagList([...tagList, tag])
      setForm((f) => ({ ...f, tags: "" }))
    }
  }

  const removeTag = (tag: string) => {
    setTagList(tagList.filter((t) => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...form,
      tags: tagList,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    }))
                  }
                  placeholder="Product name"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="product-slug"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={6}
                  placeholder="Full product description..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium">Short Description</label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, shortDescription: e.target.value }))
                  }
                  rows={3}
                  placeholder="Brief description for cards..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Compare Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.comparePrice || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comparePrice: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Cost Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.costPrice || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, costPrice: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">SKU</label>
                <Input
                  value={form.sku}
                  onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Barcode</label>
                <Input
                  value={form.barcode}
                  onChange={(e) => setForm((f) => ({ ...f, barcode: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Stock</label>
                <Input
                  type="number"
                  value={form.stock || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold">Categorization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2">
                  <Input
                    value={form.tags}
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    placeholder="Type and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag(form.tags.trim())
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addTag(form.tags.trim())}
                  >
                    Add
                  </Button>
                </div>
                {tagList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tagList.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-muted text-foreground cursor-pointer hover:bg-red-100 hover:text-red-500 transition-colors"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} &times;
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold">Images</h3>
            <ImageUploader
              images={form.images}
              onImagesChange={(images) => setForm((f) => ({ ...f, images }))}
            />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold">Product Status</h3>
            <div className="space-y-3">
              {[
                { key: "isFeatured", label: "Featured Product" },
                { key: "isNew", label: "New Arrival" },
                { key: "isBestSeller", label: "Best Seller" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form[key as keyof typeof form] as boolean}
                    onChange={() =>
                      setForm((f) => ({
                        ...f,
                        [key]: !f[key as keyof typeof form],
                      }))
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#B76E79] focus:ring-[#B76E79]"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
            <div className="pt-3 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={() =>
                    setForm((f) => ({ ...f, isActive: !f.isActive }))
                  }
                  className="w-4 h-4 rounded border-gray-300 text-[#B76E79] focus:ring-[#B76E79]"
                />
                <span className="text-sm font-medium">Active (published)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#B76E79] hover:bg-[#A45A65] text-white min-w-[120px]"
        >
          {product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
