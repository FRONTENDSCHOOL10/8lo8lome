import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import { memo } from 'react';

function Payment() {
  return (
    <>
      <AppHeader>리뷰</AppHeader>
      <AppMeta title="결제하기 페이지" description="결제하기 페이지입니다." />
      <h1 className="ml-s31 mt-[100px]">결제하기 페이지입니다.</h1>
    </>
  );
}

export default memo(Payment);
