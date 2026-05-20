import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

export const metadata: Metadata = {
  title: "Admin Dashboard - Beauté",
  description: "Admin dashboard",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#1A1A1A]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
