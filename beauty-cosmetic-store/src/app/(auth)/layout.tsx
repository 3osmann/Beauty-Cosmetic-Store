import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account - Beauté",
  description: "Login or create your Beauté account",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB] dark:bg-[#1A1A1A] py-12 px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
