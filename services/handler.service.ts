import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function getAllHandlers() {
    const handlers = await prisma.user.findMany({
        where: {
            role: "Handler",
        },
        include: {
            company: true,
            assignedIncidents: {
                include: {
                    incident: true,
                },
            },
        },
    })

    return handlers.map((h) => {
        const overdue = h.assignedIncidents.filter(
            (a) => a.incident.deadlineAt && new Date(a.incident.deadlineAt) < new Date()
        ).length

        return {
            id: h.id,
            name: h.name,
            email: h.email,
            status: h.status,
            company: h.company,
            assignedIncidentsCount: h.assignedIncidents.length,
            overdueIncidentsCount: overdue,
            lastLogin: null, // not in schema yet
            createdAt: h.createdAt,
        }
    })
}

export async function getHandlerById(id: string) {
  const handler = await prisma.user.findUnique({
    where: {
      id,
      role: "Handler",
    },
    include: {
      company: true,
      assignedIncidents: true,
    },
  })

  if (!handler) return null

  return {
    id: handler.id,
    name: handler.name,
    email: handler.email,
    role: handler.role,
    status: handler.status,
    createdAt: handler.createdAt.toISOString(),

    company: handler.company
      ? {
          id: handler.company.id,
          name: handler.company.name,
        }
      : null,

    assignedIncidents: handler.assignedIncidents.map(a => ({
      id: a.id,
    })),
  }
}