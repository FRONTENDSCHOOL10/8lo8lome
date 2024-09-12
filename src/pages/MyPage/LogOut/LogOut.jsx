import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { animate } from 'motion';
import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function LogOut() {
  const liRef = useRef([]);
  useEffect(() => {
    liRef.current.forEach((li, index) => {
      animate(
        li,
        {
          opacity: [0, 1],
          transform: ['translateY(50px)', 'translateY(0)'],
        },
        { duration: 2, delay: index * 0.3 }
      );
    });
  }, []);
  return (
    <>
      <AppMeta title="로그아웃" description="로그아웃 페이지 입니다." />
      <AppHeader>로그아웃</AppHeader>
      <section
        className="mt-[140px] flex flex-col justify-center items-center"
        aria-label="로그아웃 알림 창"
      >
        <div className="flex flex-col items-center justify-center mx-auto my-0">
          <div className=" rounded-md w-s278 h-s296 from-neutral-950 from-1% bg-gradient-to-t bg-subBg flex flex-col justify-center items-center mb-s62">
            <svg
              role="icon"
              aria-label="체크"
              className=" fill-mainColor w-s120 h-s120 mb-s22"
            >
              <use href="/assets/sprite.svg#checkmark-circle-click"></use>
            </svg>
            <ul className="flex flex-col items-center justify-center text-white">
              <li
                ref={(el) => (liRef.current[0] = el)}
                className="font-bold text-f18 mb-s10"
              >
                로그아웃 되셨습니다!
              </li>
              <li ref={(el) => (liRef.current[1] = el)} className="text-f14">
                다음에도 꼭 찾아 주세요!!
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center justify-center font-bold text-center border border-solid rounded text-f14 w-s278 h-s46 border-mainColor bg-mainBg"
          >
            홈으로 가기
          </Link>
        </div>
      </section>
    </>
  );
}

export default memo(LogOut);
