"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "@/lib/context/breadcrumb-ctx"

export default function Page() {

  const { setItems } = useBreadcrumbs()

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Settings" },
    ])
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <p>Coming soon</p>
    </div>
  )
}
