import { prisma } from "@/lib/db/prisma"

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      company: true,
      assignedIncidents: true,
    },
  })

  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt.toISOString(),

    company: user.company
      ? {
          id: user.company.id,
          name: user.company.name,
        }
      : null,

    assignedIncidents: user.assignedIncidents.map(a => ({
      id: a.id,
    })),
  }
}