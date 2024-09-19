import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@/components';
import { memo, useEffect } from 'react';
import { mainStore } from '@/stores/mainStore';
import GymDetailHeader from './GymDetailHeader';
import PriceList from './PriceList';
import AmenitiesList from './AmenitiesList';
import LocationMap from './LocationMap';
import TrainerList from './TrainerList';
import Refundpolicy from './Refundpolicy';
import GymDetailFooter from './GymDetailFooter';
import { AppSpinner } from '@/components';

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

  useEffect(() => {
    if (gymId) {
      fetchGymDetails(gymId);
    }
  }, [gymId, fetchGymDetails]);

  if (!gymData || gymData.id !== gymId) {
    return (
      <div className="w-full h-s386 flex justify-center items-center">
        <AppSpinner />
      </div>
    );
  }

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
        <GymDetailFooter />
      </div>
    </>
  );
}
export default memo(GymDetail);
