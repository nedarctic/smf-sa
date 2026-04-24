"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useHandlers } from "@/hooks/use-handlers"
import Link from "next/link"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const { data, isLoading } = useHandlers()

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Handlers" },
    ])
  }, [])

  const handlers = data ?? []

  if (isLoading) {
    return <div className="p-6">Loading handlers...</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">

      {/* SUMMARY */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Total Handlers</p>
          <p className="text-2xl font-semibold">{handlers.length}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-semibold">
            {handlers.filter(h => h.status === "Active").length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Overdue Workload</p>
          <p className="text-2xl font-semibold">
            {handlers.reduce((acc, h) => acc + h.overdueIncidentsCount, 0)}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border">

        {/* HEADER */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
          <div>Handler</div>
          <div>Email</div>
          <div>Company</div>
          <div>Cases</div>
          <div>Status</div>
        </div>

        {/* ROWS */}
        <div className="divide-y">
          {handlers.map((h) => (
            <Link
              key={h.id}
              href={`/handlers/${h.id}`}
              className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/40 transition"
            >
              {/* Handler */}
              <div>
                <p className="font-medium">
                  {h.name ?? "Unnamed Handler"}
                </p>
              </div>

              {/* Email */}
              <div className="text-sm text-muted-foreground">
                {h.email}
              </div>

              {/* Company */}
              <div className="text-sm">
                {h.company?.name ?? "No Company"}
              </div>

              {/* Cases */}
              <div className="text-sm">
                {h.assignedIncidentsCount} cases
              </div>

              {/* Status */}
              <div>
                <span className="px-2 py-1 rounded bg-muted text-sm">
                  {h.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}