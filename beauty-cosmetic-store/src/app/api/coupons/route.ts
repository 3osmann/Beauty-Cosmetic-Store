import { NextResponse } from "next/server"

const coupons = [
  { code: "WELCOME10", discountType: "PERCENTAGE", discountValue: 10, minAmount: 50, isActive: true },
  { code: "FREESHIP", discountType: "FIXED", discountValue: 0, minAmount: 30, description: "Free shipping", isActive: true },
  { code: "SUMMER20", discountType: "PERCENTAGE", discountValue: 20, minAmount: 75, isActive: true },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  
  if (code) {
    const coupon = coupons.find(c => c.code === code.toUpperCase() && c.isActive)
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid or expired coupon" })
    }
    return NextResponse.json({ valid: true, coupon })
  }
  
  return NextResponse.json({ coupons })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ message: "Coupon created", coupon: body }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
