// 시간 관리 - 현재 시간을 알려줌
export function getCurrentTimeString() {
  const date = new Date();

  const getHour = date.getHours();
  const hour = getHour % 12 === 0 ? 12 : getHour % 12;
  const minute = String(date.getMinutes()).padStart(2, "0");
  const ampm = getHour < 12 ? "오전" : "오후";

  return `${ampm} ${hour}:${minute}`;
}
