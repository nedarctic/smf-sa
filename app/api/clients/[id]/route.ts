import { NextResponse } from "next/server"
import { getClientById } from "@/services/client.service"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const client = await getClientById(id)

        if (!client) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        return NextResponse.json({ client })
    } catch (err) {
        console.error("CLIENT API ERROR:", err)

        return NextResponse.json(
            { error: "Failed to fetch client", details: String(err) },
            { status: 500 }
        )
    }
}