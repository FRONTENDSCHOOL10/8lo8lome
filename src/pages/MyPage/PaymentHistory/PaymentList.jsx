import { memo } from 'react';
import { Link } from 'react-router-dom/dist';
import { getPbImageURL } from '@/utils';

const payList = [
  {
    id: 1,
    date: '0월 0일 결제완료',
    title: '신대방점',
    usedDate: '이용기간:0000.00.00 ~ 0000.00.00',
    goods: '헬스장 3개월권',
    price: '50,000원',
  },
  {
    id: 2,
    date: '0월 0일 결제완료',
    title: '신대방점',
    usedDate: '이용기간:0000.00.00 ~ 0000.00.00',
    goods: '헬스장 3개월권',
    price: '50,000원',
  },
  {
    id: 3,
    date: '0월 0일 결제완료',
    title: '신대방점',
    usedDate: '이용기간:0000.00.00 ~ 0000.00.00',
    goods: '헬스장 3개월권',
    price: '50,000원',
  },
];
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
                <Link
                  to={`/main`}
                  className="flex flex-row items-center text-white gap-s10 mb-s10"
                  aria-label="상세정보 링크"
                >
                  <img
                    src={imgUrl[0]}
                    alt={''}
                    width={112}
                    height={78}
                    style={{ width: '112px', height: '78px' }}
                    className="object-cover rounded"
                  />
                  <div className="flex flex-col w-full font-normal gab-2 text-f12">
                    <div className="flex flex-row mb-s6">
                      <h2 className="font-bold text-f16">{item.title}</h2>
                      <svg
                        className="text-white w-s18 h-s18 mr-s10"
                        role="icon"
                        aria-label="페이지 이동 버튼"
                      >
                        <use href="/assets/sprite.svg#arrow-forward" />
                      </svg>
                    </div>
                    <p className="mb-s6">{item.usedDate}</p>
                    <p className="mb-s6"> {item.goods}</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                </Link>
                <Link
                  to
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
