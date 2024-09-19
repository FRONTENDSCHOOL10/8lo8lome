import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { getPbImageURL } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { AppRating } from '@/components';

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
          <AppRating gymData={gymData} className="text-f14" />
        </div>
        <ul className="text-f12 flex flex-col gap-s6 pt-s12 pb-s10">
          <li className="font-normal">{gymData.address}</li>
          <li className="font-semibold">{gymData.phoneNumber}</li>
          {gymData.operatingHours.weekDayHours ? (
            <li className="font-semibold">
              평일: {gymData.operatingHours.weekDayHours} / 주말:{' '}
              {gymData.operatingHours.weekendHours}
            </li>
          ) : (
            <ul className="font-semibold flex flex-col gap-[0.1875rem]">
              {Object.entries(days).map(([key, value]) => (
                <li key={key}>
                  {key} : {gymData.operatingHours[value]}
                </li>
              ))}
            </ul>
          )}
        </ul>

        <div className="flex justify-end">
          <Link
            to={'/Review'}
            aria-label={`${gymData.name} 리뷰 보기 링크`}
            className="text-f14 font-semibold inline-flex items-center"
          >
            <span>리뷰보기</span>
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
    </section>
  );
}

export default memo(GymDetailHeader);
