"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  console.log(process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`) // Docker Compose 내부 네트워크 주소
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));

    console.log(message);
  }, []);

  return (
    <div>
      <h1>프론트엔드</h1>
      <p>백엔드 응답: {message}</p>
      <ShowDate />
      <ChatPage
        name="박은채(정글8기-60)"
        time={getCurrentTimeString()}
        message={["@here", "채팅1", "채팅2", "채팅3"]}
      />
      <ChatPage
        name="박은채(정글8기-60)"
        time={getCurrentTimeString()}
        message={["@here", "채팅1", "채팅2", "채팅3"]}
      />{" "}
      <ChatPage
        name="박은채(정글8기-60)"
        time={getCurrentTimeString()}
        message={["@here", "채팅1", "채팅2", "채팅3"]}
      />
      <br />
      <hr />
      <br />
      <img></img>
      <Alert variant="default">
        <Terminal />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
      </Alert>
    </div>
  );
}

export function ShowDate() {
  return (
    <div className="relative">
      <hr className="absolute inset-x-0 top-1/2 border-t divider-gray" />
      <div className="relative z-10 mx-auto w-[120px] h-[28px] border-divider-gray flex items-center justify-center rounded-full">
        <span className="text-center text-s-bold">6월 19일 목요일</span>
      </div>
    </div>
  );
}

// 채팅방 내 채팅
export function ChatPage(props) {
  const [showProfile, setShowProfile] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout>();
  return (
    <div
      className="flex p-[8px_20px] hover:bg-[#f8f8f8]"
      onMouseEnter={() => {
        hoverTimeout.current = setTimeout(() => setShowProfile(true), 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(hoverTimeout.current);
        setShowProfile(false);
      }}
    >
      <div className="relative">
        <button className="w-[36px] mr-[8px] cursor-pointer">
          <img src="./profileTest.png" className="w-[36px] h-[36px] rounded-md" />
        </button>
        {showProfile && (
          <div className="absolute bottom-full left-0 mb-2 z-19">
            <MiniProfile />
          </div>
        )}
      </div>
      <div className="w-[100%] m-[-12px -8px -16px -16px] p-[8px 8px 8px 16px]">
        <div className="flex items-baseline space-x-1.5">
          <button className="text-m-bold cursor-pointer hover:underline">{props.name}</button>
          <div className="text-xs chat-time-stamp">{props.time}</div>
        </div>
        <div className="text-m">
          {props.message.map((msg, i) => (
            <p key={i} className={msg.startsWith("@") ? "text-m-bold chat-alarm" : ""}>
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// 시간 관리 - 현재 시간을 알려줌
export function getCurrentTimeString() {
  const date = new Date();

  const getHour = date.getHours();
  const hour = getHour % 12 === 0 ? 12 : getHour % 12;
  const minute = String(date.getMinutes()).padStart(2, "0");
  const ampm = getHour < 12 ? "오전" : "오후";

  return `${ampm} ${hour}:${minute}`;
}

export function MiniProfile() {
  return (
    <div className="w-[300px] rounded-md bg-white border border-[#E2E2E2] overflow-hidden shadow-xl">
      <div className="bg-[#F6F6F6] h-[36px] pl-[20px] flex items-center">
        <img src="./jungler.png" className="w-[16px] h-[16px] rounded-xs mr-[6px]" />
        <p className="text-m">JUNGLER</p>
      </div>
      <div className="border-t border-[#E2E2E2]" />

      <div className="flex h-[110px] p-[16px]">
        <button className="flex w-[72px] mr-[12px] cursor-pointer">
          <img src="./profileTest.png" className="w-[72px] h-[72px] rounded-xl" />
        </button>
        <button className="text-m-bold cursor-pointer hover:underline">박은채(정글8기-60)</button>
      </div>
      <div className="border-t border-[#E2E2E2]" />
      <div className="h-[50px] pl-[20px] pr-[20px] flex items-center">
        <button className="cursor-pointer text-s border border-[#B6B6B7] w-[180px] h-[28px] rounded-md hover:bg-[#f8f8f8]">
          DM 보내기
        </button>
        <button className="cursor-pointer text-s border border-[#B6B6B7] w-[70px] ml-[10px] h-[28px] rounded-md hover:bg-[#f8f8f8]">
          프로필
        </button>
      </div>
    </div>
  );
}
