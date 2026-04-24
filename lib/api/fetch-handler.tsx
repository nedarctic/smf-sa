import { Handler } from "@/types/handler"

export async function fetchHandler(id: string): Promise<Handler> {
  const res = await fetch(`/api/handlers/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch handler")
  }

  const data = await res.json();
  return data.handler;
}