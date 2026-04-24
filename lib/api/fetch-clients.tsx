import { ClientsResponse } from "@/types/client"

export async function fetchClients(): Promise<ClientsResponse> {
  const res = await fetch("/api/clients")

  if (!res.ok) {
    throw new Error("Failed to fetch clients")
  }

  const data = await res.json()
  return data.companies;
}