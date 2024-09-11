import { AppHeader, AppButton } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function LogOut() {
  return (
    <>
      <AppMeta title="로그아웃" description="로그아웃 페이지 입니다." />
      <AppHeader>로그아웃</AppHeader>
      <section className="mx-auto my-0 w-340px" aria-label="로그아웃 알림 창">
        <div className=" mt-s50 rounded-md w-s278 h-s296 from-neutral-950 from-1% bg-gradient-to-t bg-subBg flex flex-col justify-center items-center">
          <svg
            role="icon"
            aria-label="체크"
            className=" fill-mainColor w-s120 h-s120 mb-s22"
          >
            <use href="/assets/sprite.svg#checkmark-circle-click"></use>
          </svg>
          <ul className="flex flex-col items-center justify-center text-white">
            <li className="font-bold text-f18 mb-s10">로그아웃 되셨습니다!</li>
            <li className="text-f14">다음에도 꼭 찾아 주세요!!</li>
          </ul>
        </div>
        <form className="w-340px">
          <AppButton className=" w-s278 h-s46">홈으로 가기</AppButton>
        </form>
      </section>
    </>
  );
}

export default memo(LogOut);
