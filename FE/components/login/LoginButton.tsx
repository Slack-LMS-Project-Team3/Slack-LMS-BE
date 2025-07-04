"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <div>
      <Button variant="outline" className="flex max-w-min py-7 px-10 cursor-pointer hover:bg-gray-300">
        <a href="http://localhost:8000/auth/google">
          <img src="./googleLogo.png" className="w-7" />
          <p className="text-xl">Google 계정으로 로그인하기</p>
        </a>
      </Button>
    </div>
  );
}
