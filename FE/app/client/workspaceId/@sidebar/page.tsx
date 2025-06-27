"use client";

import { useParams } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, MessageSquare, Users, Settings } from "lucide-react";

type SidebarProps = {
  width: number;
};

export default function AppSidebar({ width }: SidebarProps) {
  const { workspaceId } = useParams();

  const navItems = [
    {
      label: "너비 조절 테스트",
      icon: Home,
      href: `/${workspaceId}`,
    },
    { label: "너비 조절 테스트", icon: MessageSquare, href: `/${workspaceId}/channels` },
    { label: "너비 조절 테스트", icon: Users, href: `/${workspaceId}/members` },
    { label: "너비 조절 테스트", icon: Settings, href: `/${workspaceId}/settings` },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="h-full w-full">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>워크스페이스</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.href}
                        className="flex items-center px-2 py-1 space-x-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
}
