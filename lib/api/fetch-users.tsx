import { UsersResponse } from "@/types/user"

export async function fetchUsers(): Promise<UsersResponse> {
  const res = await fetch("/api/users")

  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

  return res.json()
}