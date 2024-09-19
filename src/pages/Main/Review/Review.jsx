import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import { memo } from 'react';
import { AppRating } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { Link } from 'react-router-dom';

function Review() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return (
    <>
      <AppHeader>{gymData.name}</AppHeader>
      <AppMeta
        title="헬스장 리뷰 페이지"
        description="헬스장 리뷰 페이지입니다."
      />

      <div className="m-s31 mt-[100px] flex justify-between">
        <h2 className="text-f18 font-semibold">리뷰 3개</h2>
        <AppRating gymData={gymData} className="text-f14" />
      </div>

      <ul className="mx-s31 flex flex-col gap-s16 mt-s16">
        <li className="flex flex-col w-full py-s12 border-b border-solid border-strokeBlack">
          <div className="flex justify-between">
            <Link
              to={'/GymDetail'}
              aria-label={`${gymData.name} 상세 정보 링크`}
              className="text-f16 font-bold inline-flex items-center"
            >
              <h3>{gymData.name}</h3>
              <svg
                role="icon"
                aria-label="상세 정보 링크 아이콘"
                className="w-s22 h-s22 fill-white"
              >
                <use href="/assets/sprite.svg#arrow-forward" />
              </svg>
            </Link>

            <button>
              <svg
                role="icon"
                aria-label="리뷰 메뉴 아이콘"
                className="w-s18 h-s18 fill-white"
              >
                <use href="/assets/sprite.svg#kebap-button" />
              </svg>
            </button>
          </div>

          <p className="text-f12">⭐⭐⭐⭐⭐</p>

          <p className="text-f16 font-medium pt-s16">기구가 다양해서 좋아요</p>
          <p className="text-f12 font-medium pt-[0.5625rem]">2024.08.31</p>
        </li>
      </ul>
    </>
  );
}

export default memo(Review);
