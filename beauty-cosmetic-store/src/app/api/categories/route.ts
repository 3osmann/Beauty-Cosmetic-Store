import { NextResponse } from "next/server"
import { categories } from "@/data/categories"

export async function GET() {
  return NextResponse.json({ categories })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ message: "Category created", category: body }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
