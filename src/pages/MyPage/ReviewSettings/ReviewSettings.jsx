import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function ReviewSettings() {
  return (
    <>
      <AppMeta title="리뷰 관리" description="리뷰 관리 페이지 입니다." />
      <AppHeader>리뷰 관리</AppHeader>
    </>
  );
}

export default memo(ReviewSettings);
