"use client";

type ProfileProps = { width: number };

export default function ProfilePage({ width }: ProfileProps) {
  return (
    <div
      className="h-full w-full overflow-auto p-4 bg-background text-foreground"
      style={{ flexBasis: "100%" }} // 패널 내부이므로 100%
    >
      <h1 className="text-2xl font-bold mb-4">프로필</h1>
      {/* 실제 프로필 내용 */}
    </div>
  );
}
