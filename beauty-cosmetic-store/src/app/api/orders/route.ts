import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  return NextResponse.json({
    orders: [],
    message: status ? `Filtered by ${status}` : "All orders",
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      message: "Order created",
      order: { id: "ORD-" + Date.now(), ...body, status: "pending", createdAt: new Date() }
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
