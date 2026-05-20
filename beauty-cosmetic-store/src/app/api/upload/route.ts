import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }
    
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name}`
    
    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename,
    })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
