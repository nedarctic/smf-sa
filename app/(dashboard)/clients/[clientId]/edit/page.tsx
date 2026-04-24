"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"
import { useClient } from "@/hooks/use-client"

export default function Page() {
  const { setItems } = useBreadcrumbs()
  const params = useParams()
  const id = params.clientId as string

  const { data: client } = useClient(id)

  const [name, setName] = useState("")

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Clients", href: "/clients" },
      { label: "Edit Client" },
    ])
  }, [])

  useEffect(() => {
    if (client) {
      setName(client.name ?? "")
    }
  }, [client])

  return (
    <div className="p-6 flex flex-col gap-4">

      <h1 className="text-xl font-semibold">Edit Client</h1>

      <div className="rounded-xl border p-4">
        <label className="text-sm">Name</label>
        <input
          className="w-full border rounded p-2 mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button className="w-fit px-4 py-2 rounded bg-black text-white">
        Save Changes
      </button>

    </div>
  )
}