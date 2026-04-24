
export type HandlerStatus = "Active" | "Invited" | "Inactive"

export type Handler = {
  id: string
  name: string | null
  email: string
  status: HandlerStatus
  company: {
    id: string
    name: string | null
  }
  assignedIncidentsCount: number
  overdueIncidentsCount: number
  lastLogin: string | null
  createdAt: string
}