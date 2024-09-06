import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function LogOut() {
  return (
    <>
      <AppMeta title="로그아웃" description="로그아웃 페이지 입니다." />
      <AppHeader>로그 아웃</AppHeader>
    </>
  );
}

export default memo(LogOut);
