import { IncidentsResponse } from "@/types/incident"

export async function fetchIncidents(): Promise<IncidentsResponse> {
  const res = await fetch("/api/incidents")

  if (!res.ok) {
    throw new Error("Failed to fetch incidents")
  }

  return res.json()
}