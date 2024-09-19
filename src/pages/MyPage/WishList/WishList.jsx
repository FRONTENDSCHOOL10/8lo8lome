import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function WishList() {
  const { wishList } = mainStore((s) => ({ wishList: s.searchInput.wishList }));
  console.log(wishList);
  return (
    <>
      <AppMeta title="찜 목록" description="찜 목록 페이지 입니다." />
      <AppHeader>찜 목록</AppHeader>
      <div className="p-4 mt-[100px]">
        <ul>
          {wishList.map((gym) => {
            return (
              <li key={gym.id} className="border-b py-2 text-white">
                <p className="text-[50px] text-white">{gym.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default memo(WishList);
