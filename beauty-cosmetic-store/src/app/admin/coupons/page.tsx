"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { CouponsTable } from "@/components/admin/CouponsTable"
import type { Coupon } from "@/types"

const COUPONS_DATA: Coupon[] = [
  {
    id: "cpn-1",
    code: "WELCOME20",
    description: "Welcome discount for new customers",
    discountType: "PERCENTAGE",
    discountValue: 20,
    minAmount: 50,
    maxUses: 500,
    usedCount: 145,
    isActive: true,
    startsAt: "2026-01-01",
    expiresAt: "2026-12-31",
  },
  {
    id: "cpn-2",
    code: "SPRING10",
    description: "Spring sale discount",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minAmount: 30,
    maxUses: 1000,
    usedCount: 321,
    isActive: true,
    startsAt: "2026-03-01",
    expiresAt: "2026-05-31",
  },
  {
    id: "cpn-3",
    code: "FREESHIP",
    description: "Free shipping on all orders",
    discountType: "FIXED",
    discountValue: 9.99,
    minAmount: 0,
    maxUses: 200,
    usedCount: 200,
    isActive: false,
    startsAt: "2026-02-01",
    expiresAt: "2026-03-01",
  },
  {
    id: "cpn-4",
    code: "VIP25",
    description: "VIP customer discount",
    discountType: "PERCENTAGE",
    discountValue: 25,
    minAmount: 100,
    maxUses: 100,
    usedCount: 32,
    isActive: true,
    startsAt: "2026-01-01",
    expiresAt: "2026-06-30",
  },
  {
    id: "cpn-5",
    code: "SAVE15",
    description: "Flash sale discount",
    discountType: "FIXED",
    discountValue: 15,
    minAmount: 75,
    maxUses: 300,
    usedCount: 89,
    isActive: true,
    startsAt: "2026-03-15",
    expiresAt: "2026-04-15",
  },
]

export default function AdminCouponsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Coupons" onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <h2 className="font-heading text-lg font-semibold">All Coupons ({COUPONS_DATA.length})</h2>
            <CouponsTable
              coupons={COUPONS_DATA}
              onAdd={(coupon) => console.log("Add:", coupon)}
              onEdit={(coupon) => console.log("Edit:", coupon)}
              onDelete={(coupon) => console.log("Delete:", coupon)}
              onToggleActive={(coupon) => console.log("Toggle:", coupon)}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
