import AppMeta from '@/components/AppMeta';
import { AppHeader, AppLoading, AppTrainerProfile } from '@/components';
import { memo, useEffect, useState } from 'react';
import { mainStore } from '@/stores/mainStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function TrainerDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    fetchTrainerDetails,
    trainerList,
    trainerData,
    selectedTrainerId,
    trainerIdList,
    trainerDetailPath,
  } = mainStore((s) => ({
    fetchTrainerDetails: s.handleMethod.fetchTrainerDetails,
    trainerList: s.searchInput.trainerList,
    trainerData: s.searchInput.trainerData,
    selectedTrainerId: s.selectedTrainerId,
    trainerIdList: s.trainerIdList,
    trainerDetailPath: s.trainerDetailPath,
  }));

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
          {trainerDetailPath === 'trainers' && trainerList.length > 1 ? (
            <Swiper
              className="max-w-[340px]"
              initialSlide={trainerList.findIndex(
                (trainerData) => trainerData.id === selectedTrainerId
              )}
            >
              {trainerList.map((trainerData) => (
                <SwiperSlide key={trainerData.id}>
                  <AppTrainerProfile trainerData={trainerData} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <AppTrainerProfile trainerData={trainerData} />
          )}
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
