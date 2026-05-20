"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ProductsTable } from "@/components/admin/ProductsTable"
import { ProductForm } from "@/components/admin/ProductForm"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { PRODUCTS } from "@/data/products"
import { categories } from "@/data/categories"
import type { Product, Category } from "@/types"

const CATEGORIES: Category[] = categories.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  image: c.image,
  productCount: c.productCount,
}))

const PRODUCTS_DATA: Product[] = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  shortDescription: p.shortDescription,
  price: p.price,
  comparePrice: p.comparePrice,
  sku: `SKU-${p.id}`,
  stock: p.stock,
  isActive: true,
  isFeatured: p.isFeatured,
  isNew: p.isNew,
  isBestSeller: p.isBestSeller,
  images: p.images,
  categoryId: CATEGORIES.find((c) => c.name === p.category)?.id || "",
  category: CATEGORIES.find((c) => c.name === p.category),
  tags: p.tags,
  rating: p.rating,
  reviewCount: p.reviewCount,
  createdAt: "2026-01-01",
  updatedAt: "2026-03-10",
}))

export default function AdminProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={showForm ? (editingProduct ? "Edit Product" : "Add Product") : "Products"}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {showForm ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProductForm
                product={editingProduct}
                categories={CATEGORIES}
                onSubmit={(data) => {
                  console.log("Product saved:", data)
                  setShowForm(false)
                  setEditingProduct(undefined)
                }}
                onCancel={() => {
                  setShowForm(false)
                  setEditingProduct(undefined)
                }}
              />
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold">All Products ({PRODUCTS_DATA.length})</h2>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-[#B76E79] hover:bg-[#A45A65] text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Button>
              </div>
              <ProductsTable
                products={PRODUCTS_DATA}
                onEdit={(product) => {
                  setEditingProduct(product)
                  setShowForm(true)
                }}
                onDelete={(product) => console.log("Delete:", product.id)}
                onDuplicate={(product) => console.log("Duplicate:", product.id)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
