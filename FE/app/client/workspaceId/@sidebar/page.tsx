"use client";

import "@/app/globals.css";
import React from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Megaphone,
  Landmark,
  Users,
  UserRoundCog,
  LogOut,
  Mail,
  ShieldUser,
  ChevronRight,
  ChevronDown,
  Router,
} from "lucide-react";
import { School } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { logout } from "@/apis/logout";

type SidebarProps = {
  width: number;
};

export default function AppSidebar({ width }: SidebarProps) {
  const { workspaceId } = useParams();
  const open = useProfileStore((s) => s.setOpen);
  const router = useRouter();
  const sections = [
    { label: "Announcements", icon: Megaphone, href: `/${workspaceId}` },
    { label: "Courses", icon: Landmark, href: `/${workspaceId}/channels` },
    { label: "Channels", icon: Users, href: `/${workspaceId}/members` },
    { label: "Direct Messages", icon: Mail, href: `/${workspaceId}/settings` },
    { label: "Admin", icon: ShieldUser, href: `/${workspaceId}/settings` },
  ];

  const tabs = [
    { label: "너비 조절 테스트 1", href: `/${workspaceId}` },
    { label: "너비 조절 테스트 2", href: `/${workspaceId}/channels` },
    { label: "너비 조절 테스트 3", href: `/${workspaceId}/members` },
    { label: "너비 조절 테스트 4", href: `/${workspaceId}/settings` },
  ];

  const subTabs = [
    { label: "[WEEK01] 컴퓨팅 사고로의 전환", href: `/${workspaceId}` },
    { label: "[WEEK02] 컴퓨팅 사고로의 전환", href: `/${workspaceId}/channels` },
    { label: "[WEEK03] 컴퓨팅 사고로의 전환", href: `/${workspaceId}/members` },
    { label: "[WEEK04] 컴퓨팅 사고로의 전환", href: `/${workspaceId}/settings` },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="flex flex-1 min-h-0 min-w-0 flex-col p-1 bg-gray-800 text-gray-400">
        {/* 사이드바 헤더 (mvp에서는 단순 정보 표시) */}
        <SidebarHeader>
          <div className="h-13 p-2">
            <div className="flex flex-row items-center w-full gap-2">
              {/* 아이콘 */}
              <div className="bg-blue-600 rounded-lg p-2 flex items-center justify-center">
                <School size={20} className="text-white" />
              </div>
              {/* 워크스페이스 정보 */}
              <div className="flex flex-col overflow-hidden" style={{ width }}>
                <span className="text-md font-bold text-gray-200 truncate">워크스페이스명</span>
                <span className="text-xs text-gray-400 truncate">교육기관명</span>
              </div>
            </div>
          </div>
        </SidebarHeader>
        {/* 사이드바 컨텐츠 */}
        <SidebarContent className="flex flex-1 min-h-0 flex-col overflow-y-auto scrollbar-thin">
          {/* Announcements */}
          <SidebarGroup className="flex flex-col flex-none">
            <SidebarGroupLabel className="flex items-center gap-2">
              <Megaphone size={22} className="text-gray-200" />
              <span className="text-m font-bold text-gray-200 truncate">Announcements</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-0">
                {tabs.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton className="flex items-center px-2 py-1 space-x-2 rounded flex-1 min-w-0">
                      <a href={item.href} className="truncate">
                        {item.label}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* Courses */}
          <SidebarGroup className="flex flex-col flex-none">
            <SidebarGroupLabel className="flex items-center gap-2">
              <Landmark size={22} className="text-gray-200" />
              <span className="text-m font-bold text-gray-200 truncate">Courses</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-col gap-0">
                {tabs.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center px-2 py-1 space-x-2 rounded">
                      <ChevronRight size={20} className="text-gray-400" />
                      <span className="flex-1 min-w-0 truncate">{item.label}</span>
                      {/* <SidebarGroup className="flex flex-row flex-none">                        
                          <SidebarGroupContent>
                            <SidebarMenu className="flex flex-row gap-0">
                              {subTabs.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                  <SidebarMenuButton>
                                    <a href={item.href} className="flex items-center px-2 py-1 space-x-2 rounded">
                                      <span className="flex-1 min-w-0 truncate">{item.label}</span>
                                    </a>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>                                                                                         */}
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* Channels */}
          <SidebarGroup className="flex flex-col flex-none">
            <SidebarGroupLabel className="flex items-center gap-2">
              <Users size={22} className="text-gray-200" />
              <span className="text-m font-bold text-gray-200 truncate">Channels</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-0">
                {tabs.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton className="flex items-center px-2 py-1 space-x-2 rounded flex-1 min-w-0">
                      <a href={item.href} className="truncate">
                        {item.label}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* Direct Messages */}
          <SidebarGroup className="flex flex-col flex-none">
            <SidebarGroupLabel className="flex items-center gap-2">
              <Mail size={22} className="text-gray-200" />
              <span className="text-m font-bold text-gray-200 truncate">Direct Messages</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-0">
                {tabs.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton className="flex items-center px-2 py-1 space-x-2 rounded flex-1 min-w-0">
                      <a href={item.href} className="truncate">
                        {item.label}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* 사이드바 푸터 */}
        <SidebarFooter>
          {/* 프로필 메뉴 호출 */}
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton className="h-13 p-2">
                <div className="flex flex-row items-center w-full gap-2">
                  {/* 프로필 이미지 */}
                  <div className="bg-gray-600 rounded-lg p-2 size-9 flex items-center justify-center" />

                  {/* 사용자 정보 */}
                  <div className="flex flex-col overflow-hidden" style={{ width }}>
                    <span className="text-md font-bold text-gray-200 truncate">사용자 이름</span>
                    <span className="text-xs text-gray-400 truncate">user@email.com</span>
                  </div>
                </div>
                {/* 사용자 메뉴 */}
                <div className="flex justify-center">
                  <ChevronsUpDown className="text-gray-400" size={16} />
                </div>
              </SidebarMenuButton>
            </PopoverTrigger>
            {/* 프로필 메뉴 구성 */}
            <PopoverContent side="right" sideOffset={12} className="flex overflow-hidden bg-gray-700 rounded-md w-48">
              <div className="flex flex-1 flex-col">
                <PopoverClose>
                  <Button
                    variant="ghost"
                    className="flex flex-1 items-center justify-start px-4 py-4 rounded-none text-gray-200 text-lg"
                    onClick={open}
                  >
                    <UserRoundCog />
                    프로필
                  </Button>
                </PopoverClose>
                <hr className="border-gray-500" />
                <PopoverClose>
                  <Button
                    onClick={() => {
                      logout();
                      window.alert("로그아웃 되었습니다.");
                      router.push("/");
                    }}
                    variant="ghost"
                    className="flex flex-1 items-center justify-start px-4 py-4 rounded-none text-gray-200 text-lg"
                  >
                    <LogOut />
                    로그아웃
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
