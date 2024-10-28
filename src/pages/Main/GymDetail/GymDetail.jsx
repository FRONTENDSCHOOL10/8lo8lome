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
  const [isLoading, setIsLoading] = useState(true);
  const { fetchGymDetails, gymData } = mainStore((s) => ({
    fetchGymDetails: s.handleMethod.fetchGymDetails,
    gymData: s.searchInput.gymData,
  }));

  useEffect(() => {
    let ignore = false;
    const loadGymDetails = async () => {
      if (gymId) {
        try {
          await fetchGymDetails(gymId);
          if (!ignore) {
            setIsLoading(false);
          }
        } catch (error) {
          if (!ignore) {
            setIsLoading(false);
            console.error('Error fetching gym details:', error);
          }
        }
      }
    };
    loadGymDetails();

    return () => {
      ignore = true;
    };
  }, [gymId, fetchGymDetails]);

  if (isLoading) {
    return <AppLoading isLoading={isLoading} />;
  }

  if (!gymData) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <AppHeader navigation>{gymData?.name}</AppHeader>
      <div className="flex flex-col gap-s20">
        <>
          <GymDetailHeader />
          <PriceList />
          <AmenitiesList />
          <LocationMap />
          <TrainerList />
          <Refundpolicy />
          <GymDetailFooter />
        </>
      </div>
    </>
  );
}

export default memo(GymDetail);
