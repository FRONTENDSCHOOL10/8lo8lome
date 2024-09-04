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
    <section className="bg-black p-4">
      <div className="flex justify-between">
        <h1 className="text-white">내 주변 헬스장</h1>
        <span>필터</span>
      </div>

      <div>
        <span>🚩</span>
        <span>현재 위치로 찾기</span>
      </div>

      <ul className="flex">
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
          <span>&nbsp;|&nbsp;</span>
        </li>
      </ul>

      <ul className="flex flex-col gap-4">
        {list.map((item) => {
          return (
            <li key={item.id}>
              <a
                href=""
                className="text-white flex gap-2
            bg-subBg rounded-lg p-5"
              >
                <img src={item.image} alt="" width={120} height={120} />

                <div>
                  <div className="flex justify-between">
                    <h2>{item.title}</h2>
                    <p>❤️</p>
                  </div>
                  <p>가격 : {item.price.toLocaleString()}원</p>
                  <div className="flex justify-between">
                    <p>{item.range}km</p>
                    <p>⭐ {item.rating}</p>
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
