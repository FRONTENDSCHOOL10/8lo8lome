import { Pagination, Keyboard, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { arrayOf, shape, string, number } from 'prop-types';
import { usePriceListStore } from '@/stores/priceListStore';
import { memo } from 'react';
import { useEffect } from 'react';

MyCoupon.propTypes = {
  items: arrayOf(
    shape({
      endDate: string.isRequired,
      gymId: string.isRequired,
      dayData: number.isRequired,
      products: arrayOf(
        shape({
          key: string.isRequired,
          name: string.isRequired,
        })
      ).isRequired,
    })
  ),
};

function MyCoupon() {
  const { paymentHistory, getPaymentHistory } = usePriceListStore((s) => ({
    paymentHistory: s.paymentHistory,
    getPaymentHistory: s.getPaymentHistory,
  }));
  useEffect(() => {
    getPaymentHistory();
  }, [getPaymentHistory]); // paymentHistpry에서 수정

  return (
    <section className="p-s20" aria-label="내 회원권 쿠폰" role="region">
      <h2 className="text-white mb-s16 text-f18">내 회원권 정보</h2>
      {paymentHistory.length === 0 ? (
        <p>쿠폰내역이 없습니다.</p>
      ) : (
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
          keyboard={{ enabled: true, pageUpDown: true }} // typo 수정
          a11y={{
            paginationBulletMessage: '슬라이드 {{index}}',
          }}
          aria-live="polite"
          aria-label="쿠폰 슬라이더"
        >
          {paymentHistory.map((item, index) => (
            <SwiperSlide key={index} aria-labelledby="내 회원권 정보">
              <ul className="flex flex-row rounded-md p-s20 bg-gradient-to-br from-mainColor to-green-900 h-s156">
                <li className="flex flex-col text-base text-black">
                  <p className="font-semibold text-f14 mb-s6">내 회원권</p>
                  <div className="mb-s6">
                    <p className="font-extrabold text-f20">
                      {item.products[0].name}
                    </p>
                  </div>
                  <p className="text-f14">{item.name}</p>
                  <p className="font-bold text-f16 pt-s20">
                    {item.dayData}일 남음
                  </p>
                </li>
              </ul>
            </SwiperSlide>
          ))}
          <div className="pager" aria-label="페이지 네비게이션"></div>
        </Swiper>
      )}
    </section>
  );
}

export default memo(MyCoupon);
