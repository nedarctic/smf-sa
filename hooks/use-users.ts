import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/lib/api/fetch-users"
import { UsersResponse } from "@/types/user"

export function useUsers() {
  return useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  })
}