const list = [
  {
    id: 1,
    title: '짐박스 신도림',
    price: 30000,
    rating: '3.4',
    range: '4.5',
    image:
      'https://news.skhynix.co.kr/hubfs/A_Medialibrary/10_Newsroom%20Upload/2022/11%EC%9B%94/%ED%95%98%EC%9D%B4%EC%9D%B8%ED%84%B0%EB%B7%B0_%EC%B2%B4%EC%9C%A1%EC%8B%9C%EC%84%A4/SK%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4_%ED%97%AC%EC%8A%A4%EC%9E%A52.jpg',
  },
  {
    id: 2,
    title: '득근득근 헬스장',
    price: 30000,
    rating: '3.4',
    range: '4.5',
    image:
      'https://news.skhynix.co.kr/hubfs/A_Medialibrary/10_Newsroom%20Upload/2022/11%EC%9B%94/%ED%95%98%EC%9D%B4%EC%9D%B8%ED%84%B0%EB%B7%B0_%EC%B2%B4%EC%9C%A1%EC%8B%9C%EC%84%A4/SK%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4_%ED%97%AC%EC%8A%A4%EC%9E%A52.jpg',
  },
  {
    id: 3,
    title: '짐박스 신대방',
    price: 30000,
    rating: '3.4',
    range: '4.5',
    image:
      'https://news.skhynix.co.kr/hubfs/A_Medialibrary/10_Newsroom%20Upload/2022/11%EC%9B%94/%ED%95%98%EC%9D%B4%EC%9D%B8%ED%84%B0%EB%B7%B0_%EC%B2%B4%EC%9C%A1%EC%8B%9C%EC%84%A4/SK%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4_%ED%97%AC%EC%8A%A4%EC%9E%A52.jpg',
  },
  {
    id: 4,
    title: '짐야드 헬스장',
    price: 30000,
    rating: '3.4',
    range: '4.5',
    image:
      'https://news.skhynix.co.kr/hubfs/A_Medialibrary/10_Newsroom%20Upload/2022/11%EC%9B%94/%ED%95%98%EC%9D%B4%EC%9D%B8%ED%84%B0%EB%B7%B0_%EC%B2%B4%EC%9C%A1%EC%8B%9C%EC%84%A4/SK%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4_%ED%97%AC%EC%8A%A4%EC%9E%A52.jpg',
  },
];

export default function GymList() {
  return (
    <section className="bg-mainBg p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-f18">내 주변 헬스장</h1>
        <svg role="icon" aria-label="검색 필터" className="w-5 h-5 fill-white">
          <use href="/public/assets/sprite.svg#filter-click" />
        </svg>
      </div>

      <div className="flex gap-1 items-center pt-2 pb-3">
        <svg role="icon" aria-label="현재 위치로 검색하기" className="w-5 h-5">
          <use href="/public/assets/sprite.svg#locate" />
        </svg>
        <span className="text-f14">현재 위치로 찾기</span>
      </div>

      <ul className="flex text-f12 pb-3">
        <li>
          <span className="whitespace-nowrap">별점 4점</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>월 5만원</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>주차장</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>WIFI</span>
        </li>
      </ul>

      <ul className="flex flex-col gap-4">
        {list.map((item) => {
          return (
            <li key={item.id}>
              <a
                href=""
                className="text-white flex gap-[0.625rem]
            bg-subBg rounded p-[0.625rem]"
              >
                <img
                  src={item.image}
                  alt="헬스장 사진"
                  width={112}
                  height={78}
                />

                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base">{item.title}</h2>
                    <svg
                      role="icon"
                      aria-label="헬스장 정보 찜하기"
                      className="w-5 h-5 fill-white"
                    >
                      <use href="/public/assets/sprite.svg#heart-unclick" />
                    </svg>
                  </div>

                  <p className="text-f12">
                    가격 : {item.price.toLocaleString()}원
                  </p>
                  <div className="flex justify-between text-[0.625rem] pt-4">
                    <p>{item.range}km</p>
                    <div className="flex items-center gap-1">
                      <svg
                        role="icon"
                        aria-label="별점"
                        className="w-3 h-3 fill-yellow-300"
                      >
                        <use href="/public/assets/sprite.svg#star" />
                      </svg>

                      <p>{item.rating}</p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
