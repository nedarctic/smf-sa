import { NextResponse } from "next/server"
import { getAllHandlers } from "@/services/handler.service"

export async function GET() {
  try {
    const handlers = await getAllHandlers()
    return NextResponse.json({ handlers })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load handlers" },
      { status: 500 }
    )
  }
}