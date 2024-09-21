import AppMeta from '@/components/AppMeta';
import { AppHeader, AppLoading, AppReviewList } from '@/components';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mainStore } from '@/stores/mainStore';
import TrainerProfile from './TrainerProfile';

function TrainerDetail() {
  const { trainerId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchTrainerDetails, trainerData } = mainStore((s) => ({
    fetchTrainerDetails: s.handleMethod.fetchTrainerDetails,
    trainerData: s.searchInput.trainerData,
  }));

  useEffect(() => {
    const loadTrainerDetails = async () => {
      if (trainerId) {
        try {
          await fetchTrainerDetails(trainerId);
        } catch (error) {
          console.error('Error fetching trainer details:', error);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTrainerDetails();
  }, [trainerId, fetchTrainerDetails]);

  return (
    <>
      <AppHeader>트레이너 정보</AppHeader>
      <AppMeta
        title="트레이너 정보 페이지"
        description="트레이너 정보 페이지입니다."
      />
      {isLoading ? (
        <AppLoading isLoading={isLoading} />
      ) : (
        <>
          <TrainerProfile />
        </>
      )}

      {/* <AppReviewList
        item={gymData}
        filter={`gym = '${gymData.id}'`}
        expand={'user, trainer'}
      /> */}
    </>
  );
}

export default memo(TrainerDetail);
