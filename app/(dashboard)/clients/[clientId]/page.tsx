"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useClient } from "@/hooks/use-client"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const params = useParams()
  const id = params.clientId as string

  const { data: client, isLoading } = useClient(id)

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Clients", href: "/clients" },
      { label: "Client Details" },
    ])
  }, [])

  if (isLoading) {
    return <div className="p-6">Loading client...</div>
  }

  if (!client) {
    return <div className="p-6">Client not found</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* HEADER */}
      <div className="rounded-xl border p-6">
        <h1 className="text-xl font-semibold">{client.name}</h1>
        <p className="text-sm text-muted-foreground">
          {client.email}
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border p-4">
          Incidents: {client.incidentsCount}
        </div>
        <div className="rounded-xl border p-4">
          Handlers: {client.handlersCount}
        </div>
        <div className="rounded-xl border p-4">
          Admins: {client.adminsCount}
        </div>
        <div className="rounded-xl border p-4">
          SLA: {client.slaDays ?? "N/A"} days
        </div>
      </div>

      {/* META */}
      <div className="rounded-xl border p-4">
        <p>Status: {client.status}</p>
        <p>Reporting Link: {client.reportingLinkSlug}</p>
      </div>

    </div>
  )
}