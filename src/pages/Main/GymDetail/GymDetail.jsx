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
import Refundpolicy from './Refundpolicy';

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
        <Refundpolicy />

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
