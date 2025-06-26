"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";

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

      <ChatPage
        name="박은채(정글8기-60)"
        time={getCurrentTimeString()}
        message={["@here", "채팅1", "채팅2", "채팅3"]}
      />

      <img></img>
      <Alert variant="default">
        <Terminal />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
      </Alert>
    </div>
  );
}

// 채팅방 내 채팅
export function ChatPage(props) {
  return (
    <div className="flex p-[8px_20px]">
      <div className="w-[36px] mr-[8px]">
        <img src="./profileTest.png" className="w-[36px] h-[36px] rounded-md" />
      </div>
      <div className="w-[100%] m-[-12px -8px -16px -16px] p-[8px 8px 8px 16px]">
        <div className="flex items-baseline space-x-1.5">
          <div className="text-m-bold">{props.name}</div>
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
