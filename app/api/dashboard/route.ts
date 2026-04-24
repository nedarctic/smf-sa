import { NextResponse } from "next/server"
import {
  getDashboardStats,
  getRecentIncidents,
} from "@/services/dashboard.service"

export async function GET() {
  try {
    const [stats, recentIncidents] = await Promise.all([
      getDashboardStats(),
      getRecentIncidents(),
    ])

    return NextResponse.json({
      stats,
      recentIncidents,
    })
  } catch (error: any) {
    console.error("Dashboard API error:", error)

    return NextResponse.json(
      { error: error.message }, // 👈 expose real error
      { status: 500 }
    )
  }
}