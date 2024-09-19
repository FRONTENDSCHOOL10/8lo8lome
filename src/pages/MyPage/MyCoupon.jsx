import { Pagination, Keyboard, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { memo } from 'react';

const coupon = [
  {
    id: 1,
    subTitle1: '내 회원권',
    title: '3개월 이용권',
    subTitle2: '야! 너두 할수있어 점',
    dateInfo: '50일 남음',
  },
  {
    id: 2,
    subTitle1: '내 회원권',
    title: '1일 체험권',
    subTitle2: '야! 너두 할수있어 점',
    dateInfo: '60일 남음',
  },
  {
    id: 3,
    subTitle1: '내 회원권',
    title: '운동복 무료 대여권',
    subTitle2: '야! 너두 할수있어 점',
    dateInfo: '70일 남음',
  },
  {
    id: 4,
    subTitle1: '내 회원권',
    title: 'PT 10회 이용권',
    subTitle2: '야! 너두 할수있어 점',
    dateInfo: '80일 남음',
  },
  {
    id: 5,
    subTitle1: '내 회원권',
    title: '사물함 한달 대여권',
    subTitle2: '야! 너두 할수있어 점',
    dateInfo: '80일 남음',
  },
];

function MyCoupon() {
  return (
    <section className="p-s20" aria-label="내 회원권 쿠폰" role="region">
      <h2 className="text-white mb-s16 text-f18">내 회원권 정보</h2>
      <Swiper
        modules={[Pagination, Keyboard, A11y]}
        spaceBetween={16}
        slidesPerView={1.1}
        pagination={{
          clickable: true,
          el: '.pager',
          enabled: true,
          containerMessage: '다음 쿠폰',
        }}
        keyboard={{ enavled: true, pageUpDown: true }}
        a11y={{
          paginationBulletMessage: '슬라이드 {{index}}',
        }}
        aria-live="polite"
        aria-label="쿠폰 슬라이더"
      >
        {coupon.map((item) => (
          <SwiperSlide key={item.id} aria-labelledby={`slide-${item.id}`}>
            <ul className="flex flex-row rounded-md shadow-md p-s20 bg-gradient-to-br from-mainColor to-green-900 h-s156">
              <li className="flex flex-col text-base text-black ">
                <p className="font-semibold text-f14 mb-s6">{item.subTitle1}</p>
                <p className="font-extrabold text-f20 mb-s6">{item.title}</p>
                <p className="text-f14">{item.subTitle2}</p>
                <p className="font-bold text-f16 pt-s20">{item.dateInfo}</p>
              </li>
            </ul>
          </SwiperSlide>
        ))}
        <div className="pager" aria-label="페이지 네비게이션"></div>
      </Swiper>
    </section>
  );
}
export default memo(MyCoupon);
