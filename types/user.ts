export type UserRole = "Admin" | "Handler"
export type UserStatus = "Active" | "Invited" | "Inactive"

export type User = {
  id: string
  name: string | null
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string

  company?: {
    id: string
    name: string | null
  }

  assignedIncidents?: {
    id: string
  }[]
}

export type UsersResponse = {
  users: User[]
}