import type { Metadata } from "next"
import { AccountSidebar } from "@/components/account/AccountSidebar"

export const metadata: Metadata = {
  title: "My Account - Beauté",
  description: "Manage your account",
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <AccountSidebar />
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
