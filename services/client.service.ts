import { prisma } from "@/lib/db/prisma"

export async function getClients() {
  const clients = await prisma.company.findMany({
    include: {
      users: true,
      incidents: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return {
    clients: clients.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.users?.[0]?.email ?? null,
      status: "Active",
      incidentsCount: c.incidents.length,
      handlersCount: c.users.filter(u => u.role === "Handler").length,
      adminsCount: c.users.filter(u => u.role === "Admin").length,
      reportingLinkSlug: c.reportingLinkSlug,
      slaDays: c.slaDays,
      createdAt: c.createdAt.toISOString(),
    })),
  }
}


export async function getClientById(id: string) {
  const client = await prisma.company.findUnique({
    where: { id },
    include: {
      users: true,
      incidents: true,
      reportingPages: true,
    },
  })

  if (!client) return null

  return {
    id: client.id,
    name: client.name,
    email: client.users?.[0]?.email ?? null,
    status: "Active",
    incidentsCount: client.incidents.length,
    handlersCount: client.users.filter(u => u.role === "Handler").length,
    adminsCount: client.users.filter(u => u.role === "Admin").length,
    reportingLinkSlug: client.reportingLinkSlug,
    slaDays: client.slaDays,
    createdAt: client.createdAt.toISOString(),
  }
}