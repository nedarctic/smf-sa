export type Client = {
  id: string
  name: string | null
  email: string | null
  status: "Active" | "Suspended" | "Trial" | "Expired"
  incidentsCount: number
  handlersCount: number
  adminsCount: number
  reportingLinkSlug: string | null
  slaDays: string | null
}

export type ClientsResponse = {
  clients: Client[]
}