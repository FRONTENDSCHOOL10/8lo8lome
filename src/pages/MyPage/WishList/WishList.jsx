import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function WishList() {
  return (
    <>
      <AppMeta title="찜 목록" description="찜 목록 페이지 입니다." />
      <AppHeader>찜 목록</AppHeader>
    </>
  );
}

export default memo(WishList);
