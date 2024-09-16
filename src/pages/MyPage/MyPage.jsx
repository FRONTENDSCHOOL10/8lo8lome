import { AppHeader } from '@/components';
import { AppNav } from '@/components';
import MyCoupon from './MyCoupon';
import MyProfile from './MyProfile';
import MyInfo from './MyInfo';
import AppMeta from '@/components/AppMeta';
import { useLogoutStore } from '@/stores/logOutStore';
import { AppStatusPage } from '@/components';
import { memo, useEffect } from 'react';

function MyPage() {
  const { handleLogout, isLoggedOut, resetLogoutState } = useLogoutStore(
    (s) => ({
      handleLogout: s.handleLogout,
      isLoggedOut: s.isLoggedOut,
      resetLogoutState: s.resetLogoutState,
    })
  );

  useEffect(() => {
    resetLogoutState(); 
    
    // 로그인 시 상태 초기화
  }, [resetLogoutState]);

  console.log(isLoggedOut);

  if (isLoggedOut) {
    return <AppStatusPage status="logout" />;
  }

  return (
    <>
      <AppMeta title="마이페이지" description="마이페이지 페이지입니다" />
      <AppHeader>마이 페이지</AppHeader>
      <MyProfile />
      <MyCoupon />
      <MyInfo />
      <AppNav />

      <ul className="w-full px-s20 mb-s50">
        <li className="flex items-center border-b border-solid h-s62 border-strokeBlack">
          <button className="flex items-center w-full" onClick={handleLogout}>
            <svg
              role="icon"
              aria-label="로그아웃"
              className="text-white w-s18 h-s18 mr-s10 ml-s10"
            >
              <use href="/assets/sprite.svg#log-out" />
            </svg>
            <p>로그아웃</p>
            <svg
              role="icon"
              aria-label="로그아웃 버튼"
              className="text-white w-s18 h-s18 mr-s10"
            >
              <use href="/assets/sprite.svg#arrow-forward" />
            </svg>
          </button>
        </li>
      </ul>
    </>
  );
}
export default memo(MyPage);
