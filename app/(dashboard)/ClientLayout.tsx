"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  BreadcrumbContext,
  type BreadcrumbItem as BreadcrumbItemType,
} from "@/lib/context/breadcrumb-ctx";

import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = React.useState<BreadcrumbItemType[]>([]);

  return (
    <SidebarProvider>
      <BreadcrumbContext.Provider value={{ items, setItems }}>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />

              <Breadcrumb>
                <BreadcrumbList>
                  {items.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <BreadcrumbItem>
                        {item.href ? (
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>

                      {index < items.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <TooltipProvider>{children}</TooltipProvider>
        </SidebarInset>
      </BreadcrumbContext.Provider>
    </SidebarProvider>
  );
}