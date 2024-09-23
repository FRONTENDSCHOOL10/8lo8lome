import AppMeta from '@/components/AppMeta';
import { AppHeader, AppLoading } from '@/components';
import { memo, useEffect, useState } from 'react';
import { mainStore } from '@/stores/mainStore';
import TrainerProfile from './TrainerProfile';

function TrainerDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchTrainerDetails, trainerData, selectedTrainerId } = mainStore(
    (s) => ({
      fetchTrainerDetails: s.handleMethod.fetchTrainerDetails,
      trainerData: s.searchInput.trainerData,
      selectedTrainerId: s.selectedTrainerId,
    })
  );

  useEffect(() => {
    const loadTrainerDetails = async () => {
      if (selectedTrainerId) {
        try {
          await fetchTrainerDetails(selectedTrainerId);
        } catch (error) {
          console.error('Error fetching trainer details:', error);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTrainerDetails();
  }, [selectedTrainerId, fetchTrainerDetails]);

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
