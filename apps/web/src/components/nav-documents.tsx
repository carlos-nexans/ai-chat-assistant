"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"

import type { Thread } from "@repo/common/types"

export function NavDocuments() {
  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/threads`)
      return (await res.json()) as Thread[]
    },
  })

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {conversations && conversations.length > 0 && <SidebarGroupLabel>Conversaciones</SidebarGroupLabel>}
      {conversations && conversations.length === 0 && <SidebarGroupLabel>No hay conversaciones</SidebarGroupLabel>}
      <SidebarMenu>
        {conversations && conversations.map((conversation) => (
          <SidebarMenuItem key={conversation.id}>
            <SidebarMenuButton asChild>
              <a href={`/thread/${conversation.id}`}>
                <span>{conversation.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
