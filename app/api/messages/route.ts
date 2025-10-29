import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for messages (in production, use a database)
const messages: Array<{
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  timestamp: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create new message
    const newMessage = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    }

    messages.push(newMessage)

    // In production, you would send an email here
    console.log("[v0] New message received:", newMessage)

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error processing message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ messages })
}
