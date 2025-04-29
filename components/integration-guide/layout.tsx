"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Webhook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { documentSections, integrations, notificationChannels } from "@/config/integrations"

interface IntegrationGuideLayoutProps {
  children: React.ReactNode
}

export function IntegrationGuideLayout({ children }: IntegrationGuideLayoutProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Webhook className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">Integration Guide</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/your-org/your-repo" target="_blank">
                GitHub
              </Link>
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-2 py-3">
                <Webhook className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Webhook Platform</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Documentation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {documentSections.map((section) => (
                      <SidebarMenuItem key={section.id}>
                        <SidebarMenuButton asChild isActive={pathname === `/docs/${section.id}`} tooltip={section.name}>
                          <Link href={`/docs/${section.id}`}>
                            <section.icon className="h-5 w-5" />
                            <span>{section.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <span>Platform Integrations</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {integrations.map((integration) => (
                          <SidebarMenuItem key={integration.id}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === `/integrations/${integration.id}`}
                              tooltip={integration.name}
                            >
                              <Link href={`/integrations/${integration.id}`}>
                                <span>{integration.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <span>Notification Channels</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {notificationChannels.map((channel) => (
                          <SidebarMenuItem key={channel.id}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === `/channels/${channel.id}`}
                              tooltip={channel.name}
                            >
                              <Link href={`/channels/${channel.id}`}>
                                <channel.icon className="h-5 w-5" />
                                <span>{channel.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="text-xs text-muted-foreground">
                <p>Documentation v1.0.0</p>
                <p className="mt-1">© 2023 Webhook Platform Inc.</p>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto">
            <div className="container max-w-4xl py-10">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
