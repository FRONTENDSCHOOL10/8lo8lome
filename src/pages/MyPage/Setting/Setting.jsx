import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function Setting() {
  return (
    <>
      <AppMeta title="설정" description="설정 페이지 입니다." />
      <AppHeader>설정</AppHeader>
    </>
  );
}

export default memo(Setting);
