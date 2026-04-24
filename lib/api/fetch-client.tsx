import { Client } from "@/types/client"

export async function fetchClient(id: string): Promise<Client> {
  const res = await fetch(`/api/clients/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch client")
  }

  const data = await res.json()
  return data.client
}