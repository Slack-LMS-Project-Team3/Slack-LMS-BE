const BASE = "http://127.0.0.1:8000";

export interface Profile {
  id: string;
  userId: string;
  workspaceId: number;
  nickname: string;
  email: string;
  // phone?: string | null;
  image?: string | null;
  role: string;
  groups?: string[] | null;
  github?: string | null;
  blog?: string | null;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

/* 프로필 조회 */
export async function getProfile(targetId: string): Promise<Profile> {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("로그인이 필요합니다.");

  const res = await fetch(`${BASE}/workspace_members/${targetId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
  if (res.status === 401) throw new Error("세션이 만료되었습니다.");
  if (!res.ok) throw new Error("프로필 조회에 실패했습니다.");
  return res.json();
}

/* 프로필 부분 수정 (PATCH) */
export async function patchProfile(userId: string, payload: Partial<Profile>): Promise<Profile> {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("로그인이 필요합니다.");

  const res = await fetch(`${BASE}/workspace_members/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (res.status === 401) throw new Error("세션이 만료되었습니다.");
  if (!res.ok) throw new Error("프로필 수정에 실패했습니다.");
  return res.json();
}
