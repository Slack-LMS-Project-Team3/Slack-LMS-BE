"use client";

import React, { useMemo } from "react";
import { LoginButton } from "../components/login/LoginButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { reissueAccessToken } from "@/apis/authApi";

type Star = {
  id: number;
  size: number; // px 단위
  top: number; // % 단위
  left: number; // % 단위
  delay: number; // s
  duration: number; // s
};

const Stars: React.FC<{ count?: number }> = ({ count = 100 }) => {
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5, // 0.5 ~ 2px
      top: Math.random() * 100, // 0% ~ 100%
      left: Math.random() * 100,
      delay: Math.random() * 4, // 0s ~ 4s
      duration: Math.random() * 4 + 2, // 2s ~ 6s
    }));
  }, [count]);

  return (
    <>
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </>
  );
};

export default function Page() {
  const router = useRouter(); 

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log(token);

        const res = await fetch(`http://localhost:8000/auth/check`, {
          headers: { authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            const errbody: { detail?: string } = await res.clone().json();

            console.log(errbody.detail);
            if (errbody.detail == "EXPIRED TOKEN") {
              console.log(1);
              await reissueAccessToken("EXPIRED TOKEN");
            }
          }
        }
      } catch (err: any) {}
    };

    getToken();
  }, [router]);
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-black">
      {/* 별만 있는 레이어 */}
      <Stars count={150} />

      {/* 기존 콘텐츠 레이어: 가운데 카드 */}
      <div className="relative z-10 p-8 bg-black/50 backdrop-blur-md rounded-2xl flex flex-col items-center w-[30%]">
        <img src="./logo.png" alt="SLAM Logo" className="w-58 mb-1 animate-spin spin-glow" />
        <h1 className="text-4xl font-extrabold text-white mb-4 text-center">WELCOME SLAM!</h1>
        <p className="text-lg text-gray-200 mb-10 text-center">SLAM에 오신 것을 환영합니다</p>
        <LoginButton />
      </div>
    </div>
  );
}
