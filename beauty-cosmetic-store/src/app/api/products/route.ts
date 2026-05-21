import { NextResponse } from "next/server"
import { PRODUCTS } from "@/data/products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")

  let filtered = [...PRODUCTS]

  if (category && category !== "all") {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price)
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price)
  else if (sort === "newest") filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
  else if (sort === "rating") filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return NextResponse.json({
    products: paginated,
    pagination: { page, limit, total, totalPages },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ message: "Product created", product: body }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
