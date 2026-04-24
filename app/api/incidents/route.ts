import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  try {
    const incidents = await prisma.incident.findMany({
      include: {
        company: true,
        handlers: {
          include: {
            handler: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ incidents })
  } catch (error: any) {
    console.error("INCIDENTS API ERROR:", error)

    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    )
  }
}