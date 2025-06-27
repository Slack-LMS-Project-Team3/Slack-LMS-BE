"use client";

import React from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useState } from "react";
import { OpenProfile } from "./OpenProfile";

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
      <OpenProfile isOpen={isProfileOpen} toggle={toggleProfile} />
      <ResizablePanelGroup direction="horizontal" className="h-full w-full" onLayout={handleLayout}>
        <ResizablePanel id="sidebar" defaultSize={sidebarWidth} minSize={10} maxSize={30}>
          {/* 사이드바 영역: 너비값을 함께 전달 */}
          {React.isValidElement(sidebar)
            ? React.cloneElement(sidebar, { width: sidebarWidth })
            : sidebar}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel id="channel" defaultSize={channelWidth} minSize={30} maxSize={90}>
          {/* 채널 영역*/}
          {channel}
        </ResizablePanel>
        {/* 프로필이 열렸을 때만 렌더링 */}
        {isProfileOpen && (
          <>
            <ResizableHandle />
            <ResizablePanel
              id="profile"
              defaultSize={profileWidth}
              minSize={20}
              maxSize={40}
              style={{ boxShadow: "-8px 0 16px rgba(0, 0, 0, 0.1)" }}
            >
              {/* 프로필 영역 */}
              {/* 사이드바 영역: 너비값을 함께 전달 */}
              {React.isValidElement(profile)
                ? React.cloneElement(profile, { width: profileWidth })
                : profile}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
