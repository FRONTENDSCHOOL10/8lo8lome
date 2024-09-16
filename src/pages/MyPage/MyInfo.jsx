import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useLogoutStore } from '@/stores/logOutStore';

const myInfo = [
  {
    id: 1,
    title: '결제 내역',
    icon: (
      <svg
        role="icon"
        aria-label="결제"
        className="text-white w-s16 h-s20 mx-s10"
      >
        <use href="/assets/sprite.svg#receipt" />
      </svg>
    ),
    link: '/mypage/paymentHistory',
  },
  {
    id: 2,
    title: '리뷰 관리',
    icon: (
      <svg
        role="icon"
        aria-label="리뷰"
        className="text-white w-s16 h-s20 mx-s10"
      >
        <use href="/assets/sprite.svg#star-unclick" />
      </svg>
    ),
    link: '/mypage/reviewSettings',
  },
  {
    id: 3,
    title: '찜 목록',
    icon: (
      <svg
        role="icon"
        aria-label="찜"
        className="text-white w-s16 h-s20 mx-s10"
      >
        <use href="/assets/sprite.svg#heart-unclick" />
      </svg>
    ),
    link: '/mypage/wishList',
  },
  {
    id: 4,
    title: '설정',
    icon: (
      <svg
        role="icon"
        aria-label="설정"
        className="text-white w-s16 h-s20 mx-s10"
      >
        <use href="/assets/sprite.svg#settings" />
      </svg>
    ),
    link: '/mypage/setting',
  },
];

function MyInfo() {
  const { handleLogout } = useLogoutStore((s) => ({
    handleLogout: s.handleLogout,
  }));

  return (
    <section
      className="flex flex-row w-full mb-[60px]"
      aria-label="내 정보 목록"
    >
      <ul className="w-full px-s20">
        {myInfo.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center border-b border-solid h-s62 border-strokeBlack py-s20"
            >
              <span className="text-white ">{item.icon}</span>
              <h2 className="font-semibold text-white text-f16">
                {item.title}
              </h2>
              <svg
                role="icon"
                aria-label="페이지 이동 버튼"
                className="text-white w-s18 h-s18 mr-s10"
              >
                <use href="/assets/sprite.svg#arrow-forward" />
              </svg>
            </Link>
          </li>
        ))}
        <li>
          <button
            className="flex items-center border-b border-solid h-s62 border-strokeBlack py-s20"
            onClick={handleLogout}
            type="button"
          >
            <svg
              role="icon"
              aria-label="설정"
              className="text-white w-s16 h-s20 mx-s10"
            >
              <use href="/assets/sprite.svg#log-out" />
            </svg>
            <h2 className="font-semibold text-white text-f16">로그아웃</h2>
            <svg
              role="icon"
              aria-label="페이지 이동 버튼"
              className="text-white w-s18 h-s18 mr-s10"
            >
              <use href="/assets/sprite.svg#arrow-forward" />
            </svg>
          </button>
        </li>
      </ul>
    </section>
  );
}
export default memo(MyInfo);
