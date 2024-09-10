import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import Rating from './Rating.jsx';
import { memo } from 'react';

function Filter() {
  return (
    <>
      <AppHeader>필터</AppHeader>
      <AppMeta title="검색 필터 페이지" description="검색 필터 페이지입니다." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Rating />
      </form>
    </>
  );
}

export default memo(Filter);
