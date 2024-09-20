import { AppHeader, AppList, AppMeta } from '@/components';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function WishList() {
  const { wishList } = mainStore((s) => ({
    wishList: s.searchInput.wishList,
  }));
  return (
    <>
      <AppMeta title="찜 목록" description="찜 목록 페이지 입니다." />
      <AppHeader>찜 목록</AppHeader>
      <main className="p-4 mt-[100px]">
        <AppList items={wishList} />
      </main>
    </>
  );
}

export default memo(WishList);
