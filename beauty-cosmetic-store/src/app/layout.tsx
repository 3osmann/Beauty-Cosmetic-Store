import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { TopBar } from "@/components/layout/TopBar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { QueryProvider } from "@/providers/QueryProvider"
import { CartProvider } from "@/providers/CartProvider"
import { Toaster } from "sonner"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Beauté - Premium Beauty & Cosmetic Store",
  description: "Discover luxury beauty products, skincare, makeup, and cosmetics. Free shipping over $30.",
  keywords: "beauty, cosmetics, skincare, makeup, luxury beauty",
  openGraph: {
    title: "Beauté - Premium Beauty & Cosmetic Store",
    description: "Discover luxury beauty products, skincare, makeup, and cosmetics.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CartProvider>
              <TopBar />
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <MobileBottomNav />
              <Toaster position="top-right" richColors />
            </CartProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
