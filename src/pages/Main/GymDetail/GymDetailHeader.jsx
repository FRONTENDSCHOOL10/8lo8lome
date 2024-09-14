import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import getPbImageURL from '@/utils/getPbImageURL';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

function GymDetailHeader() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  const imgUrl = getPbImageURL(gymData);

  const days = {
    월: 'mondayHours',
    화: 'tuesdayHours',
    수: 'wednesdayHours',
    목: 'thursdayHours',
    금: 'fridayHours',
    토: 'saturdayHours',
    일: 'sundayHours',
  };

  return (
    <section className="ml-s31 mt-[100px]">
      {/* 스와이퍼 컴포넌트화 하기 */}
      <section
        aria-label={`${gymData.name} 헬스장 이미지`}
        className="flex justify-center"
      >
        <Swiper spaceBetween={16} slidesPerView={1.1} className="max-w-[320px]">
          {imgUrl.map((url) => (
            <SwiperSlide key={imgUrl.indexOf(url)}>
              <img
                src={url}
                alt=""
                className="w-s278 h-s156 bg-subBg rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="mr-s31 mt-s20">
        <div className="flex justify-between">
          <h2 className="text-f20 font-bold">{gymData.name}</h2>
          <div className="flex items-center gap-1">
            <svg
              role="icon"
              aria-label="별점"
              className="w-3 h-3 fill-yellow-300"
            >
              <use href="/assets/sprite.svg#star" />
            </svg>
            <p className="text-f14 font-normal">{gymData.rating}</p>
          </div>
        </div>

        <ul className="text-f12 flex flex-col gap-s6 pt-s10 pb-[0.125rem]">
          <li className="font-normal">{gymData.address}</li>
          <li className="font-semibold">{gymData.phoneNumber}</li>
          {gymData.operatingHours.weekDayHours ? (
            <li className="font-semibold">
              평일: {gymData.operatingHours.weekDayHours} / 주말:{' '}
              {gymData.operatingHours.weekendHours}
            </li>
          ) : (
            <ul className="font-semibold">
              {Object.entries(days).map(([key, value]) => (
                <li key={key}>
                  {key} : {gymData.operatingHours[value]}
                </li>
              ))}
            </ul>
          )}
        </ul>
        <button className="text-f14 w-full text-right">리뷰보기</button>
      </div>
    </section>
  );
}

export default memo(GymDetailHeader);
