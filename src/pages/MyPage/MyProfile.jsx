import { useMyPageStore } from '@/stores/myPageStore';
import { memo } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyProfile() {
  // 상태 선언: 유저 정보 저장
  const { userData, fetchUserData } = useMyPageStore();
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  return (
    <section
      className="w-full h-24 border-b border-solid px-s20 border-strokeBlack mt-[100px] "
      aria-label="내 프로필"
    >
      <div className="flex items-center h-full text-white ">
        <span className="h-64px w-64px">
          <img
            className="rounded-full"
            src={userData.profileImage}
            alt="내 프로필 사진"
            width={64}
            height={64}
          />
        </span>
        <div className="flex text-white flex-low ml-s20">
          <ul className="items-center">
            <li className="flex items-center font-bold mb-s10 text-f18">
              <h2 className="pr-s10">{userData.nickname}</h2>
              <Link to={'/mypage/editProfile'}>
                <svg
                  role="icon"
                  aria-label="프로필 편집으로가는 버튼"
                  className="text-white w-s18 h-s18"
                >
                  <use href="/assets/sprite.svg#arrow-forward" />
                </svg>
              </Link>
            </li>
            <li>
              <p className="font-light text-s12">{userData.email}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default memo(MyProfile);
