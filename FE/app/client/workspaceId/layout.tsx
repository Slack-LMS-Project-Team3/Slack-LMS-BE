"use client";

import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useState } from "react";
import { OpenProfile } from "./OpenProfile";
import { ProfileDrawer } from "../../../components/profile/ProfileDrawer";

export default function WorkspaceLayout({
  children,
  channel,
  sidebar,
  profile,
}: {
  children: React.ReactNode;
  channel: React.ReactNode;
  sidebar: React.ReactElement<{ width: number }>;
  profile: React.ReactElement<{ width: number }>;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(20);
  const [profileWidth, setProfileWidth] = useState(20);
  const [channelWidth, setChannelWidth] = useState(80);

  // 프로필 표시를 위한 state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 패널 크기 변경 시 상태 업데이트
  const handleLayout = (sizes: number[]) => {
    setSidebarWidth(sizes[0]);
    if (isProfileOpen) {
      setChannelWidth(sizes[1]);
      setProfileWidth(sizes[2]);
    } else {
      setChannelWidth(sizes[1]);
    }
  };

  // 프로필 표시 테스트용 버튼
  const toggleProfile = () => {
    if (isProfileOpen) {
      setChannelWidth(100 - sidebarWidth);
    } else {
      setChannelWidth(100 - sidebarWidth - profileWidth);
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex-1 flex flex-row h-full w-full">
      <ProfileDrawer sidebar={sidebar} channel={channel} />
    </div>
  );
}
