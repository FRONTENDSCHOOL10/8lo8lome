import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppRating } from '@/components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function TrainerList() {
  const { gymData, fetchTrainers } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
    fetchTrainers: s.handleMethod.fetchTrainers,
  }));

  fetchTrainers(gymData.trainer);

  // const data = await getData('gyms', gymId); //객체타입으로

  return (
    <section className="ml-s31">
      <h3 className="text-f18 font-bold mb-s10">트레이너 정보</h3>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.35}
        pagination={{
          clickable: true,
          renderBullet: () => {
            return `<span class="swiper-pagination-bullet inline-block  w-[14px] h-[14px] border-solid border border-mainColor rounded-full bg-purple-300"></span>`;
          },
        }}
        className="relative mb-20"
        style={{ '--swiper-pagination-bottom': '0' }}
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
      </Swiper>

      {/* <div className="flex w-full justify-center gap-2 pt-5">
        <div className="w-s10 h-s10 border-solid border border-mainColor rounded-full"></div>
        <div className="w-s10 h-s10 border-solid border border-mainColor rounded-full"></div>
        <div className="w-s10 h-s10 border-solid border border-mainColor rounded-full"></div>
      </div> */}
    </section>
  );
}

export default memo(TrainerList);
