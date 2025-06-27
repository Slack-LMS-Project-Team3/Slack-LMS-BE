"use client";

import { ChatPage } from "@/components/chat/ChatPage";
import { ShowDate } from "@/components/chat/ShowDate";
import { getCurrentTimeString } from "@/components/utils/date";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChannelPage() {
  const now = getCurrentTimeString();

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <ScrollArea className="h-full w-full">
        <ShowDate />
        <ChatPage name="홍길동" time={now} message={["안녕하세요!", "첫 번째 테스트 메시지"]} />
        {/* 테스트용 채팅 여러 줄 */}
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />{" "}
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />{" "}
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />{" "}
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />{" "}
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />{" "}
        <ChatPage
          name="김영희"
          time="오후 2:30"
          message={["@here 환영합니다!", "두 번째 메시지입니다.", "테스트용 세 번째 메시지"]}
        />
      </ScrollArea>
    </div>
  );
}
