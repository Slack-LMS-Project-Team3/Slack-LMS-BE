import { useState } from "react";
import { OpenProfile } from "../../app/client/workspaceId/OpenProfile";
import { ProfileDrawer } from "../profile/ProfileDrawer";

export function MiniProfile() {
  return (
    <div className="w-[300px] rounded-md bg-white border border-[#E2E2E2] overflow-hidden mb-2 shadow-xl">
      <div className="bg-[#F6F6F6] h-[36px] pl-[20px] flex items-center">
        <img src="/jungler.png" className="w-[16px] h-[16px] rounded-xs mr-[6px]" />
        <p className="text-m">JUNGLER</p>
      </div>
      <div className="border-t border-[#E2E2E2]" />

      <div className="flex h-[110px] p-[16px]">
        <button className="flex w-[72px] mr-[12px] cursor-pointer">
          <img src="/profileTest.png" className="w-[72px] h-[72px] rounded-xl" />
        </button>
        <button className="text-m-bold cursor-pointer hover:underline">박은채(정글8기-60)</button>
      </div>
      <div className="border-t border-[#E2E2E2]" />
      <div className="h-[50px] pl-[20px] pr-[20px] flex items-center">
        <button className="cursor-pointer text-s border border-[#B6B6B7] w-[180px] h-[28px] rounded-md hover:bg-[#f8f8f8]">
          DM 보내기
        </button>
        <button
          onClick={() => {
            ProfileDrawer;
          }}
          className="cursor-pointer text-s border border-[#B6B6B7] w-[70px] ml-[10px] h-[28px] rounded-md hover:bg-[#f8f8f8]"
        >
          프로필
        </button>
      </div>
    </div>
  );
}
