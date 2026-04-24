"use client"

import { createContext, useContext } from "react"

export type BreadcrumbItem = {
  label: string
  href?: string
}

export const BreadcrumbContext = createContext<{
  items: BreadcrumbItem[]
  setItems: (items: BreadcrumbItem[]) => void
}>({
  items: [],
  setItems: () => {},
})

export const useBreadcrumbs = () => useContext(BreadcrumbContext)