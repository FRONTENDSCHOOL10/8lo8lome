import { Link } from 'react-router-dom';

const myProfile = [
  {
    id: 1,
    nickName: '놀고싶닥',
    email: 'nolgosipda@naver.com',
    image: 'https://picsum.photos/200',
  },
];
export default function MyProfile() {
  return (
    <section
      className="w-full h-24 border-b border-solid p-s20 border-strokeBlack"
      aria-label="내 프로필"
    >
      {myProfile.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center h-full text-white bg-mainBg "
          >
            <span className="h-64px w-64px ">
              <img
                className="rounded-full"
                src={item.image}
                alt="내 프로필 사진"
                width={64}
                height={64}
              />
            </span>

            <form action="" className="flex text-white flex-low ml-s20">
              <ul className="items-center ">
                <li className="flex items-center font-bold mb-s10 text-f18">
                  <h2 className="pr-s10">{item.nickName}</h2>
                  <Link to={''}>
                    <svg
                      role="icon"
                      aria-label="프로필 편집 버튼"
                      className="text-white w-s18 h-s18"
                    >
                      <use href="/assets/sprite.svg#arrow-forward" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <p className="font-light text-s12">{item.email}</p>
                </li>
              </ul>
            </form>
          </div>
        );
      })}
    </section>
  );
}
