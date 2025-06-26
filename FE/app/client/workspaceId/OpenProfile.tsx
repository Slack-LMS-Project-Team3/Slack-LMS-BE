// 프로필 표시 테스트 버튼
export function OpenProfile({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
      <button onClick={toggle} className="fixed top right-4 z-50 text-black">
        {isOpen ? "닫기" : "열기"}
      </button>
    );
}