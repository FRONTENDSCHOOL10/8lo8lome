import getPbImageURL from '@/utils/getPbImageURL';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/api/pb'; // 포켓베이스 인스턴스

export default function MyProfile() {
  // 상태 선언: 유저 정보 저장
  const [userData, setUserData] = useState({
    id: '',
    nickname: '',
    email: '',
    profileImage: '',
  });

  useEffect(() => {
    // 포켓베이스에서 로그인된 유저 데이터 가져오기
    const fetchUserData = async () => {
      const authData = pb.authStore.model;

      if (authData) {
        // 유저 정보 설정
        setUserData({
          id: authData.id,
          nickname: authData.nickName,
          email: authData.email,
          profileImage: getPbImageURL(authData.id, authData.profile), // 프로필 이미지 URL 생성
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <section
      className="w-full h-24 border-b border-solid px-s20 border-strokeBlack"
      aria-label="내 프로필"
    >
      <div className="flex items-center h-full text-white">
        {/* 유저 프로필 이미지 */}
        <span className="h-64px w-64px">
          <img
            className="rounded-full"
            src={userData.profileImage} // 프로필 이미지 사용
            alt="내 프로필 사진"
            width={64}
            height={64}
          />
        </span>
        {/* 유저 정보 */}
        <div className="flex text-white flex-low ml-s20">
          <ul className="items-center">
            <li className="flex items-center font-bold mb-s10 text-f18">
              <h2 className="pr-s10">{userData.nickname}</h2>
              <Link to={'/mypage/editProfile'}>
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
              <p className="font-light text-s12">{userData.email}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
