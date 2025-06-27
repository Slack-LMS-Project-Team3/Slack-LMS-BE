"use client";

import { notoSansKr, lato } from "./ui/fonts"; // 글꼴
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${notoSansKr.variable} ${lato.variable} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
