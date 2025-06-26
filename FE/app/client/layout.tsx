"use client"
import "../globals.css";

export default function clientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 바 */}
      <header className="w-full h-11 flex items-center px-4 bg-gray-800 shadow-xl">                
        <span className="font-bold text-xl text-white">SLAM</span>        
      </header> 
      {children}
    </div>
  );
}