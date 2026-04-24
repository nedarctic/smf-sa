"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useUsers } from "@/hooks/use-users"
import Link from "next/link"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const { data, isLoading, error } = useUsers()

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Users" },
    ])
  }, [])

  const users = data?.users ?? []

  if (isLoading) {
    return <div className="p-6">Loading users...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load users</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">

      {/* TOP STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-semibold">{users.length}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-semibold">
            {users.filter(u => u.status === "Active").length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Invited</p>
          <p className="text-2xl font-semibold">
            {users.filter(u => u.status === "Invited").length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Handlers</p>
          <p className="text-2xl font-semibold">
            {users.filter(u => u.role === "Handler").length}
          </p>
        </div>
      </div>

      {/* USER LIST */}
      <div className="rounded-xl border">
        <div className="p-4 border-b">
          <h2 className="font-semibold">All Users</h2>
        </div>

        {/* HEADER */}
        <div className="grid grid-cols-5 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b">
          <div>User</div>
          <div>Company</div>
          <div>Role</div>
          <div>Status</div>
          <div>Incidents</div>
        </div>

        {/* ROWS */}
        <div className="divide-y">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="grid grid-cols-5 gap-4 px-4 py-4 items-center hover:bg-muted/40 transition"
            >
              {/* USER */}
              <div>
                <p className="font-medium">
                  {user.name ?? "Unnamed User"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>

              {/* COMPANY */}
              <div className="text-sm text-muted-foreground">
                {user.company?.name ?? "No company"}
              </div>

              {/* ROLE */}
              <div>
                <span className="px-2 py-1 rounded bg-muted text-sm">
                  {user.role}
                </span>
              </div>

              {/* STATUS */}
              <div>
                <span className="px-2 py-1 rounded border text-sm">
                  {user.status}
                </span>
              </div>

              {/* INCIDENTS */}
              <div className="text-sm text-muted-foreground">
                {user.assignedIncidents?.length ?? 0}
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}