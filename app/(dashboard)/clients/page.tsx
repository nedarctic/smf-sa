"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useClients } from "@/hooks/use-clients"
import { Card } from "@/components/dashboard/card"
import Link from "next/link"

export default function Page() {
  const { setItems } = useBreadcrumbs()

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Clients" },
    ])
  }, [])

  const { data, isLoading } = useClients()
  const clients = data?.clients ?? []

  console.log("companies at client", clients)

  if (isLoading) {
    return <div className="p-6">Loading clients...</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">

      {/* TOP STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card
          title="Total Clients"
          value={clients.length}
        />
        <Card
          title="Active Clients"
          value={clients.filter(c => c.status === "Active").length}
        />
        <Card
          title="Suspended"
          value={clients.filter(c => c.status === "Suspended").length}
        />
        <Card
          title="Expired"
          value={clients.filter(c => c.status === "Expired").length}
        />
      </div>

      {/* CLIENT LIST */}
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-4">All Clients</h2>

        <div className="space-y-3">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/40 transition"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium">{client.name ?? "Unnamed"}</p>
                <p className="text-sm text-muted-foreground">
                  {client.email}
                </p>
              </div>

              {/* MIDDLE */}
              <div className="text-sm text-muted-foreground">
                <p>Incidents: {client.incidentsCount}</p>
                <p>Handlers: {client.handlersCount}</p>
                <p>Admins: {client.adminsCount}</p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <span className="text-sm px-2 py-1 rounded bg-muted">
                  {client.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}