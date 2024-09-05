const coupon = [
  {
    id: 1,
    subTitle1: '내 회원권',
    title: '3개월 이용권',
    subTitle2: '야! 너두 할수있어 점',
    dateInfo: '50일 남음',
  },
];

export default function MyCoupon() {
  return (
    <section className="p-s20 size-80">
      <h2 className="mb-4 text-f18 text-white">내 회원권 정보</h2>
      <div className="flex flex-row items-start w-full h-156px">
        <ul className="w-full h-40 p-4 rounded shadow-md bg-gradient-to-br from-mainColor to-green-900">
          {coupon.map((item) => {
            return (
              <li
                key={item.id}
                className="flex flex-col text-base text-black mb-1.5"
              >
                <p className="font-semibold">{item.subTitle1}</p>
                <p className="text-2xl font-bold">{item.title}</p>
                <p className="mb-5 text-f14">{item.subTitle2}</p>
                <p className="text-base font-bold">{item.dateInfo}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
