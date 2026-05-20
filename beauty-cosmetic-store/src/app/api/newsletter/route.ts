import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Successfully subscribed to newsletter!" 
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
