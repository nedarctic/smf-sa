export type IncidentStatus =
  | "New"
  | "InReview"
  | "Investigation"
  | "Resolved"
  | "Closed"

export type Incident = {
  id: string
  incidentIdDisplay: string
  category: string
  status: IncidentStatus
  createdAt: string
  deadlineAt: string | null
  company?: {
    name: string | null
  }
}

export type IncidentsResponse = {
  incidents: Incident[]
}