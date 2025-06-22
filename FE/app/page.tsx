"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  console.log(process.env.NEXT_PUBLIC_API_URL)
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`) // Docker Compose 내부 네트워크 주소
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));

    console.log(message);
  }, []);

  return (
    <div>
      <h1>프론트엔드</h1>
      <p>백엔드 응답: {message}</p>
      <Alert variant="default">
        <Terminal />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}