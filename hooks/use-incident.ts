import { fetchIncident } from "@/lib/api/fetch-incident"
import { useQuery } from "@tanstack/react-query"

export function useIncident(id: string) {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => fetchIncident(id),
    enabled: !!id,
  })
}