import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';
import PaymentList from './PaymentList';

function PaymentHistory() {
  return (
    <>
      <AppMeta title="결제 내역" description="결제 관리 페이지 입니다." />
      <AppHeader>결제 관리</AppHeader>
      <PaymentList />
    </>
  );
}

export default memo(PaymentHistory);
