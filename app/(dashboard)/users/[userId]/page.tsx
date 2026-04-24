"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useUser } from "@/hooks/use-user"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const params = useParams()
  const id = params.userId as string

  const { data: user, isLoading } = useUser(id)

  console.log("user data", user)

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Users", href: "/users" },
      { label: "User Details" },
    ])
  }, [])

  if (isLoading) {
    return <div className="p-6">Loading user...</div>
  }

  if (!user) {
    return <div className="p-6">User not found</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* HEADER */}
      <div className="rounded-xl border p-6">
        <h1 className="text-xl font-semibold">
          {user.name ?? "Unnamed User"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {user.email}
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          Role: {user.role}
        </div>

        <div className="rounded-xl border p-4">
          Status: {user.status}
        </div>

        <div className="rounded-xl border p-4">
          Incidents: {user.assignedIncidents?.length ?? 0}
        </div>
      </div>

      {/* COMPANY */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Company</p>
        <p className="font-medium">
          {user.company?.name ?? "No company"}
        </p>
      </div>

    </div>
  )
}