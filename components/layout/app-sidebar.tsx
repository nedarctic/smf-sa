"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"
import { usePathname } from "next/navigation"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
      ],
    },

    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Clients",
          url: "/clients",
        },
        {
          title: "Incidents",
          url: "/incidents",
        },
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Handlers",
          url: "/handlers",
        },
      ],
    },

    {
      title: "Monitoring",
      url: "#",
      items: [
        {
          title: "Audit Logs",
          url: "/audit-logs",
        },
        {
          title: "Notifications",
          url: "/notifications",
        },
      ],
    },

    {
      title: "Platform",
      url: "#",
      items: [
        {
          title: "Reporting Channels",
          url: "/reporting-channels",
        },
        {
          title: "Subscriptions",
          url: "/subscriptions",
        },
      ],
    },

    {
      title: "System",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/settings",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isActive = (url: string) => pathname === url

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEndIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">SemaFacts</span>
                  <span className="">Super Admin Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={isActive(item.url)}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
