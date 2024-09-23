import { AppHeader, AppStatusPage, AppNav, AppMeta } from '@/components';
import MyCoupon from './MyCoupon';
import MyProfile from './MyProfile';
import MyInfo from './MyInfo';
import { useLogoutStore } from '@/stores/logOutStore';
import { memo } from 'react';

function MyPage() {
  const { isLoggedOut, isLoggedIn } = useLogoutStore((s) => ({
    isLoggedOut: s.isLoggedOut,
    isLoggedIn: s.isLoggedIn,
  }));

  if (!isLoggedIn && !isLoggedOut) {
    return <AppStatusPage status="notLogin" />;
  }

  if (isLoggedOut) {
    return <AppStatusPage status="logout" />;
  }

  return (
    <>
      <AppMeta title="마이페이지" description="마이페이지 페이지입니다" />
      <AppHeader navigation>마이 페이지</AppHeader>
      <MyProfile />
      <MyCoupon />
      <MyInfo />
      <AppNav />
    </>
  );
}

export default memo(MyPage);
