import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import { memo } from 'react';

function Filter() {
  return (
    <>
      <AppHeader>필터</AppHeader>
      <AppMeta title="검색 필터 페이지" description="검색 필터 페이지입니다." />
      <h1 className="text-3xl">검색 필터 페이지입니다</h1>;
    </>
  );
}

export default memo(Filter);
