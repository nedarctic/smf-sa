"use client"

import { useQuery } from "@tanstack/react-query"
import type { Handler } from "@/types/handler"

async function fetchHandlers(): Promise<Handler[]> {
  const res = await fetch("/api/handlers")

  if (!res.ok) {
    throw new Error("Failed to fetch handlers")
  }

  const data = await res.json()
  return data.handlers
}

export function useHandlers() {
  return useQuery({
    queryKey: ["handlers"],
    queryFn: fetchHandlers,
  })
}