import { User } from "@/types/user"

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch user")
  }

  const data = await res.json()
  return data.user;
}