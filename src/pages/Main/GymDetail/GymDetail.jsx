import { useParams } from 'react-router-dom';
import { AppHeader, AppLoading } from '@/components';
import { memo, useEffect, useState } from 'react';
import { mainStore } from '@/stores/mainStore';
import GymDetailHeader from './GymDetailHeader';
import PriceList from './PriceList';
import AmenitiesList from './AmenitiesList';
import LocationMap from './LocationMap';
import TrainerList from './TrainerList';
import Refundpolicy from './Refundpolicy';
import GymDetailFooter from './GymDetailFooter';

function GymDetail() {
  const { gymId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { fetchGymDetails, gymData } = mainStore((s) => ({
    fetchGymDetails: s.handleMethod.fetchGymDetails,
    gymData: s.searchInput.gymData,
  }));

  useEffect(() => {
    let ignore = true; // 마운트 상태 플래그

    const loadGymDetails = async () => {
      if (gymId) {
        try {
          await fetchGymDetails(gymId);
        } catch (error) {
          console.error('Error fetching gym details:', error);
          if (ignore) {
            setIsLoading(false); // 마운트된 경우에만 상태 업데이트
          }
        } finally {
          if (ignore) {
            setIsLoading(false); // 마운트된 경우에만 상태 업데이트
          }
        }
      }
    };

    loadGymDetails();

    // 클린업 함수
    return () => {
      ignore = false; // 언마운트 시 플래그를 false로 설정
    };
  }, [gymId, fetchGymDetails]);

  return (
    <>
      <AppHeader navigation>{gymData?.name}</AppHeader>
      <div className="flex flex-col gap-s20">
        {isLoading ? (
          <AppLoading isLoading={isLoading} />
        ) : (
          <>
            <GymDetailHeader />
            <PriceList />
            <AmenitiesList />
            <LocationMap />
            <TrainerList />
            <Refundpolicy />
            <GymDetailFooter />
          </>
        )}
      </div>
    </>
  );
}

export default memo(GymDetail);
