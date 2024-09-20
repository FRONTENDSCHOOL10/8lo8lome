import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppRating } from '@/components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';

function TrainerList() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return (
    <section className="ml-s31">
      <h3 className="text-f18 font-bold mb-s10">트레이너 정보</h3>
      <Swiper
        modules={[Pagination, Keyboard, A11y]}
        spaceBetween={16}
        slidesPerView={1.35}
        pagination={{
          clickable: true,
          el: '.pager',
          enabled: true,
        }}
        keyboard={{ enavled: true, pageUpDown: true }}
        a11y={{
          paginationBulletMessage: '슬라이드 {{index}}',
        }}
        aria-live="polite"
        aria-label="트레이너 리스트 슬라이더"
      >
        <SwiperSlide key="0">
          <div className="w-s220 p-5 bg-opacityWhite rounded-md flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-solid border-white"></div>
            <p className="text-f14 font-semibold py-s10">김아름 선생님</p>
            <p className="text-f12 font-normal pb-4 leading-normal">
              “저 김아름과 함께 인생 몸매를 만들고, 더 행복한 인생을 결정하세요.
            </p>
            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <AppRating gymData={gymData} className="text-f12" />
                <span className="text-f12 font-semibold">리뷰: 7개</span>
              </div>

              <Link
                to={'/TrainerDetail'}
                aria-label={`${gymData.name} 리뷰 보기 링크`}
                className="text-f14 font-semibold inline-flex items-center"
              >
                <span>click</span>
                <svg
                  role="icon"
                  aria-label="리뷰 보기 링크 아이콘"
                  className="w-s22 h-s22 fill-white"
                >
                  <use href="/assets/sprite.svg#arrow-forward" />
                </svg>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide key="1">
          <div className="w-s220 p-5 bg-opacityWhite rounded-md flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-solid border-white"></div>
            <p className="text-f14 font-semibold py-s10">김아름 선생님</p>
            <p className="text-f12 font-normal pb-4 leading-normal">
              “저 김아름과 함께 인생 몸매를 만들고, 더 행복한 인생을 결정하세요.
            </p>
            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <AppRating gymData={gymData} className="text-f12" />
                <span className="text-f12 font-semibold">리뷰: 7개</span>
              </div>

              <Link
                to={'/TrainerDetail'}
                aria-label={`${gymData.name} 리뷰 보기 링크`}
                className="text-f14 font-semibold inline-flex items-center"
              >
                <span>click</span>
                <svg
                  role="icon"
                  aria-label="리뷰 보기 링크 아이콘"
                  className="w-s22 h-s22 fill-white"
                >
                  <use href="/assets/sprite.svg#arrow-forward" />
                </svg>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <div className="pager" aria-label="페이지 네비게이션"></div>
      </Swiper>
    </section>
  );
}

export default memo(TrainerList);
