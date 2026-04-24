import { useQuery } from "@tanstack/react-query"
import { fetchHandler } from "@/lib/api/fetch-handler"
import { Handler } from "@/types/handler"

export function useHandler(id: string) {
  return useQuery<Handler>({
    queryKey: ["handler", id],
    queryFn: async () => await fetchHandler(id),
    enabled: !!id,
  })
}