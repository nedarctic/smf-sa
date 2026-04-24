"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useHandler } from "@/hooks/use-handler"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const params = useParams()
  const id = params.handlerId as string

  const { data: handler, isLoading } = useHandler(id)

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Handlers", href: "/handlers" },
      { label: "Handler Details" },
    ])
  }, [])

  if (isLoading) {
    return <div className="p-6">Loading handler...</div>
  }

  if (!handler) {
    return <div className="p-6">Handler not found</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* HEADER */}
      <div className="rounded-xl border p-6">
        <h1 className="text-xl font-semibold">
          {handler.name ?? "Unnamed Handler"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {handler.email}
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-4">
          Status: {handler.status}
        </div>

        <div className="rounded-xl border p-4">
          Incidents: {handler.assignedIncidentsCount ?? 0}
        </div>
      </div>

      {/* COMPANY */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Company</p>
        <p className="font-medium">
          {handler.company?.name ?? "No company"}
        </p>
      </div>

    </div>
  )
}