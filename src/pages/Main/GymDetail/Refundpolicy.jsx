import { memo } from "react";
import { mainStore } from "@/stores/mainStore";

function Refundpolicy(){
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return(

  );
}

export default memo(Refundpolicy)
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { useState } from 'react';

function Refundpolicy() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  const [isHidden, setIsHidden] = useState(false);

  const handleToggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <section className="mx-s31">
      <div className="flex justify-between text-f18 pb-s14 border-b border-solid border-strokeBlack">
        <h3 className="text-f18 font-bold ">환불규정</h3>
        <button onClick={handleToggleHidden}>
          <svg
            role="icon"
            aria-label="환불 규정 펼치기 아이콘"
            className="w-s22 h-s22 fill-white"
          >
            <use
              href={`/assets/sprite.svg#arrow-${isHidden ? 'down' : 'up'}`}
            />
          </svg>
        </button>
      </div>
      <ul
        className={`flex flex-col text-f12 font-normal list-disc list-inside gap-s6 pt-s14 px-s14 ${isHidden ? 'hidden' : ''}`}
      >
        <li>헬스장 이용권은 7일 이내 미사용시 전액 환불</li>
        <li>PT 1회 이용 후 나머지 환불 시 90% 환불</li>
      </ul>
    </section>
  );
}

export default memo(Refundpolicy);
