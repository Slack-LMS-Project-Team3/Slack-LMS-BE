"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const scope = params.get("scope");
  const prompt = params.get("prompt");
  const errorParam = params.get("error");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!code) {
      setError("Google 로그인 code가 없습니다.");
      setIsLoading(false);
      return;
    }

    const getToken = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/auth/google/callback?code=${code}&scope=${scope}&prompt=${prompt}`,
          {
            credentials: "include", // refresh_token 받을 때 필요
          },
        );

        if (errorParam) { // 추후 수정
          setError(errorParam === "not_found" ? "등록된 사용자가 아닙니다." : "알 수 없는 오류입니다.");
          setIsLoading(false);
          return;
        }

        if (!res.ok) throw new Error("백엔드 요청 실패");

        const data = await res.json();
        const accessToken = data.access_token;

        if (!accessToken) {
          setError("access_token이 없습니다.");
          setIsLoading(false);
          return;
        }

        localStorage.setItem("access_token", accessToken);

        setTimeout(() => {
          router.replace("/client/workspaceId");
        }, 1500);
      } catch (err: any) {
        setError("인증 처리 중 오류: " + err.message);
        setIsLoading(false);
      }
    };

    getToken();
  }, [code, scope, prompt, errorParam, router]);

  // 실패 시 UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-2">로그인 실패</h1>
        <p className="mb-6 text-red-600">{error}</p>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          홈으로 가기
        </button>
      </div>
    );
  }

  // 로딩 UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-t-blue-400 border-gray-600 rounded-full animate-spin mb-4" />
        <div className="text-lg">로그인 처리 중입니다</div>
      </div>
    );
  }

  return null; // 성공 시 자동 리디렉트됨
}