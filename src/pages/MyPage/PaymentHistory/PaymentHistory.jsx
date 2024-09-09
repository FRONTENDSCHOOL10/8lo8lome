import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function PaymentHistory() {
  return (
    <>
      <AppMeta title="결제 관리" description="결제 관리 페이지 입니다." />
      <AppHeader>결제 관리</AppHeader>
    </>
  );
}

export default memo(PaymentHistory);
