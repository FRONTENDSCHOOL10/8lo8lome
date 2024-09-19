import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import { memo } from 'react';

function Review() {
  return (
    <>
      <AppHeader>리뷰</AppHeader>
      <AppMeta
        title="헬스장 리뷰 페이지"
        description="헬스장 리뷰 페이지입니다."
      />
      <h1 className="ml-s31 mt-[100px]">헬스장 리뷰 페이지입니다.</h1>
    </>
  );
}

export default memo(Review);
