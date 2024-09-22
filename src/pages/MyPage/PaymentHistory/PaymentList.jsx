import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import { arrayOf, number, shape, string } from 'prop-types';
import { usePriceListStore } from '@/stores/priceListStore'; // zustand 스토어 import

PaymentList.propTypes = {
  items: arrayOf(
    shape({
      endDate: string.isRequired,
      gymId: string.isRequired,
      paymentDate: string.isRequired,
      products: arrayOf(
        shape({
          key: string.isRequired,
          name: string.isRequired,
          price: number.isRequired,
        })
      ).isRequired, // products도 필수로 설정
    })
  ).isRequired,
};

function PaymentList() {
  const { paymentHistory } = usePriceListStore(); // 스토어에서 paymentHistory 가져오기
  useEffect(() => {
    if (paymentHistory.length > 0) {
      localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    }
  }, [paymentHistory]);
  return (
    <>
      <section
        aria-label="결제내역 목록"
        className="mt-[100px] p-s20 font-pretendard"
      >
        <ul className="flex flex-col w-full ">
          {paymentHistory.map((item, index) => {
            const imgUrl = getPbImageURL(item); // 이미지 URL 가져오기
            return (
              <li key={index} className="flex flex-col mb-s16">
                <span className="text-f12 mb-s6">{item.paymentDate}</span>
                <div className="flex flex-row items-center text-white gap-s10 mb-s10">
                  <img
                    src={imgUrl[0]} // 이미지 설정
                    alt={''}
                    width={112}
                    height={78}
                    style={{ width: '112px', height: '78px' }}
                    className="object-cover rounded"
                  />
                  <div className="flex flex-col w-full font-normal gab-2 text-f12">
                    <Link
                      to={`/main/${item.gymId}`}
                      aria-label={`${item.gymId} 상세정보 링크`}
                      className="flex flex-row mb-s6"
                    >
                      <h2 className="font-bold text-f16">{item.gymId}</h2>
                      <svg
                        className="text-white w-s18 h-s18 mr-s10"
                        role="icon"
                        aria-label="페이지 이동 버튼"
                      >
                        <use href="/assets/sprite.svg#arrow-forward" />
                      </svg>
                    </Link>
                    <p className="mb-s6">
                      이용기간: {item.paymentDate} ~ {item.endDate}
                    </p>
                    {item.products.map((product, productIndex) => (
                      <div key={productIndex} className="mb-s6">
                        <p className="mb-s6">결제 상품: {product.name}</p>
                        <p>결제금액: {product.price.toLocaleString()}원</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={'/mypage/reviewSettings/WriteReview.jsx'}
                  aria-label="리뷰 작성 페이지 이동"
                  className="flex items-center justify-center w-full border border-solid rounded border-mainColor align-center text-f18 py-s12"
                >
                  리뷰작성
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default memo(PaymentList);
