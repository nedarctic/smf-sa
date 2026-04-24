import { useQuery } from "@tanstack/react-query"
import { Client } from "@/types/client"
import { fetchClient } from "@/lib/api/fetch-client"

export function useClient(id: string) {
  return useQuery<Client>({
    queryKey: ["client", id],
    queryFn: () => fetchClient(id),
    enabled: !!id,
  })
}