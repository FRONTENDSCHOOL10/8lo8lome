import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@/components';
import { AppCheckboxInput } from '@/components';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import GymDetailHeader from './GymDetailHeader';
import PriceList from './PriceList';
import AmenitiesList from './AmenitiesList';
import LocationMap from './LocationMap';
import TrainerList from './TrainerList';

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
        <PriceList />
        <AmenitiesList />
        <LocationMap />
        <TrainerList />

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
