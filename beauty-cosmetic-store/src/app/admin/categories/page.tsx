"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { CategoriesManager } from "@/components/admin/CategoriesManager"
import { categories } from "@/data/categories"
import type { Category } from "@/types"

const CATEGORIES_DATA: Category[] = [
  {
    id: "cat-1",
    name: "Makeup",
    slug: "makeup",
    productCount: 120,
    children: [
      { id: "cat-1a", name: "Face", slug: "face", productCount: 35, children: [] },
      { id: "cat-1b", name: "Eyes", slug: "eyes", productCount: 42, children: [] },
      { id: "cat-1c", name: "Lips", slug: "lips", productCount: 28, children: [] },
      { id: "cat-1d", name: "Cheeks", slug: "cheeks", productCount: 15, children: [] },
    ],
  },
  {
    id: "cat-2",
    name: "Skincare",
    slug: "skin-care",
    productCount: 85,
    children: [
      { id: "cat-2a", name: "Moisturizers", slug: "moisturizers", productCount: 20, children: [] },
      { id: "cat-2b", name: "Serums", slug: "serums", productCount: 18, children: [] },
      { id: "cat-2c", name: "Cleansers", slug: "cleansers", productCount: 22, children: [] },
      { id: "cat-2d", name: "Masks", slug: "masks", productCount: 15, children: [] },
      { id: "cat-2e", name: "Sunscreen", slug: "sunscreen", productCount: 10, children: [] },
    ],
  },
  {
    id: "cat-3",
    name: "Hair Care",
    slug: "hair-care",
    productCount: 64,
    children: [
      { id: "cat-3a", name: "Shampoo", slug: "shampoo", productCount: 18, children: [] },
      { id: "cat-3b", name: "Conditioner", slug: "conditioner", productCount: 15, children: [] },
      { id: "cat-3c", name: "Styling", slug: "styling", productCount: 20, children: [] },
      { id: "cat-3d", name: "Treatment", slug: "treatment", productCount: 11, children: [] },
    ],
  },
  {
    id: "cat-4",
    name: "Body Care",
    slug: "body-care",
    productCount: 48,
    children: [
      { id: "cat-4a", name: "Body Lotion", slug: "body-lotion", productCount: 14, children: [] },
      { id: "cat-4b", name: "Body Wash", slug: "body-wash", productCount: 12, children: [] },
      { id: "cat-4c", name: "Scrubs", slug: "scrubs", productCount: 10, children: [] },
      { id: "cat-4d", name: "Hand Cream", slug: "hand-cream", productCount: 12, children: [] },
    ],
  },
  {
    id: "cat-5",
    name: "Natural",
    slug: "natural",
    productCount: 32,
    children: [],
  },
  {
    id: "cat-6",
    name: "Fragrance",
    slug: "fragrance",
    productCount: 28,
    children: [],
  },
]

export default function AdminCategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Categories" onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <CategoriesManager
            categories={CATEGORIES_DATA}
            onAdd={(cat) => console.log("Add:", cat)}
            onEdit={(cat) => console.log("Edit:", cat)}
            onDelete={(cat) => console.log("Delete:", cat)}
          />
        </main>
      </div>
    </div>
  )
}
