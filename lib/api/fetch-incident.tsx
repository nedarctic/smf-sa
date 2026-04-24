import { Incident } from "@/types/incident"

export async function fetchIncident(id: string): Promise<Incident> {
  const res = await fetch(`/api/incidents/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch incident")
  }

  const data = await res.json()
  return data.incident
}