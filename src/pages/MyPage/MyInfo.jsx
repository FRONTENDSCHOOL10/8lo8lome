const myInfo = [
  {
    id: 1,
    title: '결제하기',
    icon: (
      <svg
        role="icon"
        aria-label="결제"
        className="text-white w-s16 h-s20 mx-s10"
      >
        {' '}
        <use href="/assets/sprite.svg#receipt" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '리뷰관리',
    icon: (
      <svg
        role="icon"
        aria-label="리뷰"
        className="text-white w-s16 h-s20 mx-s10"
      >
        <use href="/assets/sprite.svg#star-unclick" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '찜목록',
    icon: (
      <svg
        role="icon"
        aria-label="찜"
        className="text-white w-s16 h-s20 mr-s10"
      >
        <use href="/assets/sprite.svg#heart-unclick" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '설정',
    icon: (
      <svg
        role="icon"
        aria-label="설정"
        className="text-white w-s16 h-s20 mr-s10"
      >
        <use href="/assets/sprite.svg#settings" />
      </svg>
    ),
  },
  {
    id: 5,
    title: '로그아웃',
    icon: (
      <svg
        role="icon"
        aria-label="로그아웃"
        className="text-white w-s16 h-s20 mr-s10"
      >
        <use href="/assets/sprite.svg#log-out" />
      </svg>
    ),
  },
];

export default function MyInfo() {
  return (
    <section className="flex flex-row w-full" aria-label="내 정보 목록">
      <ul className="w-full p-s20">
        {myInfo.map((item) => (
          <li
            key={item.id}
            className="flex items-center border-b border-solid w-s278 h-s62 border-subBg py-s20"
          >
            <span className="text-white ">{item.icon}</span>
            <h2 className="text-white text-f16">{item.title}</h2>
          </li>
        ))}
      </ul>
    </section>
  );
}
