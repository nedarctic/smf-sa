import { prisma } from "@/lib/db/prisma"

export async function getIncidentById(id: string) {
  const incident = await prisma.incident.findUnique({
    where: { id },
    include: {
      company: true,
      handlers: {
        include: {
          handler: true,
        },
      },
      messages: true,
      reporter: true,
      attachments: true,
    },
  })

  if (!incident) return null

  return {
    id: incident.id,
    incidentIdDisplay: incident.incidentIdDisplay,
    category: incident.category,
    description: incident.description,
    status: incident.status,
    location: incident.location,
    createdAt: incident.createdAt.toISOString(),
    deadlineAt: incident.deadlineAt?.toISOString() ?? null,
    company: {
      name: incident.company?.name ?? null,
    },
  }
}