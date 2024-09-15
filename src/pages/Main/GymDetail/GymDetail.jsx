import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@/components';
import GymDetailHeader from './GymDetailHeader';
import { AppCheckboxInput } from '@/components';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function GymDetail() {
  const { gymId } = useParams();
  const navigate = useNavigate();
  const { createChatRoom } = useChatStore((s) => ({
    createChatRoom: s.createChatRoom,
  }));
  const handleCreateRoom = async () => {
    await createChatRoom(gymId, (roomId) => {
      navigate(`/chat/${roomId}`);
    });
  };

  const { fetchGymDetails, gymData } = mainStore((s) => ({
    fetchGymDetails: s.handleMethod.fetchGymDetails,
    gymData: s.searchInput.gymData,
  }));

  fetchGymDetails(gymId);

  return (
    <>
      <AppHeader>{gymData.name}</AppHeader>

      <div className="flex flex-col gap-s20">
        <GymDetailHeader />

        <section className="mx-8">
          <h3 className="text-f18 mb-2">가격</h3>
          <ul className="flex flex-col gap-4 bg-subBg rounded px-s14 py-s10">
            <li>
              <ul className="text-f18 flex flex-col gap-s10">
                헬스장
                <li className="text-f16 flex justify-between">
                  <p>1일권</p>
                  <p>15,000원</p>
                </li>
                <li className="text-f16 flex justify-between">
                  <p>1개월</p>
                  <p>60,000원</p>
                </li>
              </ul>
            </li>

            <li>
              <ul className="text-f18">PT</ul>
            </li>
          </ul>
        </section>

        <section className="mx-8">
          <h3 className="text-f18 mb-2">편의시설</h3>
          <ul className="flex">
            <li className="flex flex-col border border-solid border-white rounded p-2 gap-1">
              <svg
                role="icon"
                aria-label="와이파이"
                className="w-6 h-6 fill-white"
              >
                <use href="/assets/sprite.svg#wifi" />
              </svg>
              <span className="text-f12">WIFI</span>
            </li>
          </ul>
        </section>

        <section className="mx-8">
          <h3 className="text-f18 mb-2">위치</h3>
          <div className="w-s278 h-[10.875rem] bg-purple-300 rounded">
            지도 이미지
          </div>
        </section>

        <section className="mx-8">
          <h3 className="text-f18 mb-2">트레이너 정보</h3>
          <div className="w-s220 p-5 bg-purple-300 rounded-md flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-white"></div>
            <p className="text-f14 font-semibold py-s10">김아름 선생님</p>
            <p className="text-f12 font-normal pb-4">
              “저 김아름과 함께 인생 몸매를 만들고, 더 행복한 인생을 결정하세요.
            </p>
            <div className="w-full flex justify-between">
              <div className="flex gap-2">
                <div className="flex items-center gap-[0.125rem]">
                  <svg
                    role="icon"
                    aria-label="별점"
                    className="w-3 h-3 fill-yellow-300"
                  >
                    <use href="/assets/sprite.svg#star" />
                  </svg>
                  <p className="text-f12 font-normal">4.7</p>
                </div>
                <span className="text-f12 font-semibold">리뷰: 7개</span>
              </div>
              <span className="text-f14 font-semibold">click</span>
            </div>
          </div>
          <div className="flex w-full justify-center gap-2 pt-5">
            <div className="w-s10 h-s10 border-solid border border-mainColor rounded-full"></div>
            <div className="w-s10 h-s10 border-solid border border-mainColor rounded-full"></div>
            <div className="w-s10 h-s10 border-solid border border-mainColor rounded-full"></div>
          </div>
        </section>

        {/* 아코디언 컴포넌트화 하기 */}
        <section className="mx-8">
          <div className="flex justify-between text-f18 pb-2 border-b border-solid border-strokeBlack">
            <p>환불규정</p>
            <div>드롭다운 버튼</div>
          </div>
          <ul className="text-f12 font-normal list-disc gap-3">
            <li>헬스장 이용권은 7일 이내 미사용시 전액 환불</li>
            <li>PT 1회 이용 후 나머지 환불 시 90% 환불</li>
          </ul>
        </section>

        <footer className="flex gap-3 px-[1.9375rem] py-[1.5625rem]">
          <div className="absolute top-[0.5625rem] right-2 pl-7 pb-7">
            <AppCheckboxInput
              label={'헬스장 정보 찜하기 체크박스'}
              isHiddenLabel
              // name="over14"
              // isChecked={over14}
              // onChange={handleCheckboxChange}
              unCheckedSvgId="heart-unclick"
              checkedSvgId="heart-click"
              checkedColor="text-red-500"
            />
          </div>
          <Link to={'/filter'} aria-label="결제하기 링크">
            <button className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-300">
              결제하기
            </button>
          </Link>
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
          >
            채팅방 생성
          </button>
        </footer>
      </div>
    </>
  );
}
export default memo(GymDetail);
