import { NextResponse } from "next/server"
import { getClients } from "@/services/client.service"

export async function GET() {
  const companies = await getClients()
  return NextResponse.json({ companies })
}