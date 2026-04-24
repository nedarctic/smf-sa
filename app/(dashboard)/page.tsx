"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/dashboard/card"
import { Alert } from "@/components/dashboard/alert"

import { fetchDashboard } from "@/lib/api/fetch-dashboard"

type Stats = {
  totalClients: number
  totalIncidents: number
  openIncidents: number
  overdueIncidents: number
  activeHandlers: number
}

type Incident = {
  id: string
  incidentIdDisplay: string
  status: string
  company: {
    name: string | null
  }
}

export default function Page() {
  const { setItems } = useBreadcrumbs()

  useEffect(() => {
    setItems([{ label: "Dashboard" }])
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,

    // 🔥 caching behavior
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    gcTime: 1000 * 60 * 30,   // 30 minutes cache
    refetchOnWindowFocus: false,
  })

  const stats: Stats | null = data?.stats ?? null
  const incidents: Incident[] = data?.recentIncidents ?? []

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load dashboard</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">

      {/* TOP CARDS */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card title="Total Clients" value={stats?.totalClients ?? 0} />
        <Card title="Total Incidents" value={stats?.totalIncidents ?? 0} />
        <Card title="Open Incidents" value={stats?.openIncidents ?? 0} />
        <Card title="Overdue Incidents" value={stats?.overdueIncidents ?? 0} />
        <Card title="Active Handlers" value={stats?.activeHandlers ?? 0} />
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* RECENT INCIDENTS */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-4">Recent Incidents</h2>

          <div className="space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    {incident.incidentIdDisplay}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {incident.company?.name ?? "Unknown"}
                  </p>
                </div>

                <span className="text-sm">
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ALERTS */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-4">Alerts</h2>

          <div className="space-y-3">
            {stats?.overdueIncidents! > 0 && (
              <Alert text={`${stats?.overdueIncidents} overdue incidents`} />
            )}

            {stats?.openIncidents! > 20 && (
              <Alert text="High number of open incidents" />
            )}

            {stats?.activeHandlers === 0 && (
              <Alert text="No active handlers in system" />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}