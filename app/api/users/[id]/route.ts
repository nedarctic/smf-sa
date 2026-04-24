import { NextResponse } from "next/server"
import { getUserById } from "@/services/user.service"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const user = await getUserById(id)

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ user })
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 }
        )
    }
}