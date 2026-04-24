import { NextResponse } from "next/server"
import { getIncidentById } from "@/services/incident.service"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    try {
        const incident = await getIncidentById(id)

        if (!incident) {
            return NextResponse.json(
                { error: "Not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ incident })
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch incident" },
            { status: 500 }
        )
    }
}