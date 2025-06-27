import { useState, useRef } from "react";
import { MiniProfile } from "./MiniProfile";

interface ChatPageProps {
  name: string;
  time: string;
  message: string[];
}

// 채팅방 내 채팅
export function ChatPage(props: ChatPageProps) {
  const [showProfile, setShowProfile] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <div className="flex p-[8px_20px] hover:bg-[#f8f8f8]">
      <div className="relative">
        <button
          className="w-[36px] mr-[8px] cursor-pointer"
          onMouseEnter={() => {
            hoverTimeout.current = setTimeout(() => setShowProfile(true), 800);
          }}
          onMouseLeave={() => {
            if (hoverTimeout.current !== null) {
              clearTimeout(hoverTimeout.current);
              hoverTimeout.current = null;
            }
            setShowProfile(false);
          }}
        >
          <img src="/profileTest.png" className="w-[36px] h-[36px] mt-1 rounded-md" />
          {showProfile && (
            <div className="absolute bottom-full left-0 z-19">
              <MiniProfile />
            </div>
          )}
        </button>
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
