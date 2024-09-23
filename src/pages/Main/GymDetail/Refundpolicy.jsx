import { memo } from 'react';
import { useState } from 'react';
import { AppAccordion } from '@/components';

function Refundpolicy() {
  const [isHidden, setIsHidden] = useState(false);

  const handleToggleHidden = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <section className="mx-s31">
      <AppAccordion
        title="환불규정"
        isOpen={isHidden}
        toggleAccordion={handleToggleHidden}
      >
        <ul
          className={`flex flex-col text-f14 font-normal p-[1.25rem] gap-5 bg-subBg rounded`}
        >
          <li>헬스장 이용권은 7일 이내 미사용시 전액 환불</li>
          <li>PT 1회 이용 후 나머지 환불 시 90% 환불</li>
        </ul>
      </AppAccordion>
    </section>
  );
}

export default memo(Refundpolicy);
