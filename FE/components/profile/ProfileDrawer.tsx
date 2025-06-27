"use client";

import React from "react";
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { OpenProfile } from "../../app/client/workspaceId/OpenProfile";

export function ProfileDrawer({
  sidebar,
  channel,
}: {
  sidebar: React.ReactElement<{ width: number }>;
  channel: React.ReactNode;
}) {
  // 내부에 isOpen 상태를 관리
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarSize, setSidebarSize] = useState(20);
  const [channelSize, setChannelSize] = useState(80);
  const [profileSize, setProfileSize] = useState(20);

  // 토글 시 패널 사이즈 조정
  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        // 열 때: sidebar + channel + profile = 100
        setChannelSize(100 - sidebarSize - profileSize);
      } else {
        // 닫을 때: sidebar + channel = 100
        setChannelSize(100 - sidebarSize);
      }
      return next;
    });
  };

  // 패널 사이즈 변경 핸들러
  const onLayout = (sizes: number[]) => {
    setSidebarSize(sizes[0]);
    if (isOpen) {
      setChannelSize(sizes[1]);
      setProfileSize(sizes[2]);
    } else {
      setChannelSize(sizes[1]);
    }
  };

  return (
    <div className="flex-1 flex flex-row h-full w-full">
      {/* 열기/닫기 버튼 */}
      <OpenProfile isOpen={isOpen} toggle={toggle} />

      <ResizablePanelGroup direction="horizontal" className="h-full w-full" onLayout={onLayout}>
        <ResizablePanel id="sidebar" defaultSize={sidebarSize} minSize={10} maxSize={30}>
          {/* 사이드바 */}
          {React.isValidElement(sidebar) ? React.cloneElement(sidebar, { width: sidebarSize }) : sidebar}
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel id="channel" defaultSize={channelSize} minSize={30} maxSize={90}>
          {/* 채널 영역 */}
          {channel}
        </ResizablePanel>

        {isOpen && (
          <>
            <ResizableHandle />
            <ResizablePanel
              id="profile"
              defaultSize={profileSize}
              minSize={20}
              maxSize={40}
              style={{ boxShadow: "-8px 0 16px rgba(0, 0, 0, 0.1)" }}
            ></ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
