import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import { arrayOf, number, shape, string } from 'prop-types';

PaymentList.propTypes = {
  items.arrayOf(
    shape({
      
    })
  )
}

//  삭제 기능
function PaymentList() {
  return (
    <>
      <section aria-label="결제내역 목록" className="mt-[100px] p-s20">
        <ul className="flex flex-col w-full ">
          {payList.map((item) => {
            const imgUrl = getPbImageURL(item);
            return (
              <li key={item.id} className="flex flex-col mb-s16">
                <span className="text-f12 mb-s6">{item.date}</span>
                <div className="flex flex-row items-center text-white gap-s10 mb-s10">
                  <img
                    src={imgUrl[0]}
                    alt={''}
                    width={112}
                    height={78}
                    style={{ width: '112px', height: '78px' }}
                    className="object-cover rounded"
                  />
                  <div className="flex flex-col w-full font-normal gab-2 text-f12">
                    <Link
                      to={`/main/$`}
                      aria-label="상세정보 링크"
                      className="flex flex-row mb-s6"
                    >
                      <h2 className="font-bold text-f16">{item.title}</h2>

                      <svg
                        className="text-white w-s18 h-s18 mr-s10"
                        role="icon"
                        aria-label="페이지 이동 버튼"
                      >
                        <use href="/assets/sprite.svg#arrow-forward" />
                      </svg>
                    </Link>
                    <p className="mb-s6">{item.usedDate}</p>
                    <p className="mb-s6"> {item.goods}</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                </div>
                <Link
                  to={'/mypage/reviewSettings/WriteReview.jsx'}
                  aria-label="라뷰작성 페이지 이동"
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
