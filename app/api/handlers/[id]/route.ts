import { NextResponse } from "next/server"
import { getHandlerById } from "@/services/handler.service"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const handler = await getHandlerById(id)

        if (!handler) {
            return NextResponse.json(
                { error: "Handler not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ handler })
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch handler" },
            { status: 500 }
        )
    }
}