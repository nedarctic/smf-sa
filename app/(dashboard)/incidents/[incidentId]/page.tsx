"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useIncident } from "@/hooks/use-incident"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const params = useParams()

  const id = params.incidentId as string

  const { data: incident, isLoading } = useIncident(id)

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Incidents", href: "/incidents" },
      { label: "Incident Details" },
    ])
  }, [setItems])

  if (isLoading) {
    return <div className="p-6">Loading incident...</div>
  }

  if (!incident) {
    return <div className="p-6">Incident not found</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* HEADER */}
      <div className="rounded-xl border p-6">
        <h1 className="text-xl font-semibold">
          {incident.incidentIdDisplay}
        </h1>

        <p className="text-sm text-muted-foreground">
          {incident.company?.name ?? "Unknown Client"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="text-lg font-medium">{incident.category}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="text-lg font-medium">{incident.status}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Deadline</p>
          <p className="text-lg font-medium">
            {incident.deadlineAt ?? "N/A"}
          </p>
        </div>
      </div>

      {/* META */}
      <div className="rounded-xl border p-4">
        <p>Created: {incident.createdAt}</p>
      </div>

    </div>
  )
}