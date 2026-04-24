import { useQuery } from "@tanstack/react-query"
import { fetchIncidents } from "@/lib/api/fetch-incidents"
import { IncidentsResponse } from "@/types/incident"

export function useIncidents() {
  return useQuery<IncidentsResponse>({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  })
}