import { prisma } from "@/lib/db/prisma"

export async function getDashboardStats() {
  const [
    totalClients,
    totalIncidents,
    openIncidents,
    overdueIncidents,
    activeHandlers,
  ] = await Promise.all([
    prisma.company.count(),

    prisma.incident.count(),

    prisma.incident.count({
      where: {
        status: {
          in: ["New", "InReview", "Investigation"],
        },
      },
    }),

    prisma.incident.count({
      where: {
        deadlineAt: { lt: new Date() },
        status: {
          notIn: ["Resolved", "Closed"],
        },
      },
    }),

    prisma.user.count({
      where: {
        role: "Handler",
        status: "Active",
      },
    }),
  ])

  return {
    totalClients,
    totalIncidents,
    openIncidents,
    overdueIncidents,
    activeHandlers,
  }
}

export async function getRecentIncidents() {
  return prisma.incident.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      company: true,
    },
  })
}