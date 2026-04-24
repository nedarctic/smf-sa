"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useIncidents } from "@/hooks/use-incidents"
import Link from "next/link"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const { data, isLoading } = useIncidents()

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Incidents" },
    ])
  }, [])

  const incidents = data?.incidents ?? []

  if (isLoading) {
    return <div className="p-6">Loading incidents...</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">

      {/* HEADER SUMMARY */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Total Incidents</p>
          <p className="text-2xl font-semibold">{incidents.length}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Open</p>
          <p className="text-2xl font-semibold">
            {incidents.filter(i => i.status !== "Closed").length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Resolved</p>
          <p className="text-2xl font-semibold">
            {incidents.filter(i => i.status === "Resolved").length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Closed</p>
          <p className="text-2xl font-semibold">
            {incidents.filter(i => i.status === "Closed").length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border">
        <div className="p-4 border-b">
          <h2 className="font-semibold">All Incidents</h2>
        </div>

        {/* HEADER ROW */}
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b">
          <div>Incident</div>
          <div>Client</div>
          <div>Category</div>
          <div>Status</div>
        </div>

        {/* ROWS */}
        <div className="divide-y">
          {incidents.map((incident) => (
            <Link
              key={incident.id}
              href={`/incidents/${incident.id}`}
              className="grid grid-cols-4 gap-4 px-4 py-4 items-center hover:bg-muted/40 transition"
            >
              {/* Incident ID */}
              <div className="font-medium">
                {incident.incidentIdDisplay}
              </div>

              {/* Client */}
              <div className="text-sm text-muted-foreground">
                {incident.company?.name ?? "Unknown Client"}
              </div>

              {/* Category */}
              <div className="text-sm">
                {incident.category}
              </div>

              {/* Status */}
              <div>
                <span className="text-xs px-2 py-1 rounded bg-muted">
                  {incident.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div >
  )
}