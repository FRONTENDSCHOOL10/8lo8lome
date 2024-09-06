const myInfo = [
  {
    id: 1,
    title: '결제하기',
    icon: (
      <svg role="icon" aria-label="">
        {' '}
        <use href="/assers/sprite.svg#receipt" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '리뷰관리',
    icon: (
      <svg role="icon" aria-label="">
        <use href="/assets/sprite.svg#star-unclick" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '찜목록',
    icon: (
      <svg role="icon" aria-label="">
        <use href="/assets/sprite.svg#heart-unclick" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '설정',
    icon: (
      <svg role="icon" aria-label="">
        <use href="/assets/sprite.svg#settings" />
      </svg>
    ),
  },
  {
    id: 5,
    title: '로그아웃',
    icon: (
      <svg role="icon" aria-label="">
        <use href="/assets/sprite.svg#log-out" />
      </svg>
    ),
  },
];

export default function MyInfo() {
  return (
    <section className="flex flex-row w-full mt-s38" aria-label="내 정보 목록">
      <ul className="border-b border-solid w-s278 border-subBg">
        {myInfo.map((item) => (
          <li key={item.id}>
            <span className="text-white w-s16 h-s20">{item.icon}</span>
            <h2 className=""></h2>
          </li>
        ))}
      </ul>
    </section>
  );
}
