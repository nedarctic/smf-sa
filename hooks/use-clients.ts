import { useQuery } from "@tanstack/react-query"
import { fetchClients } from "@/lib/api/fetch-clients"
import { ClientsResponse } from "@/types/client"

export function useClients() {
  return useQuery<ClientsResponse>({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 5,
  })
}