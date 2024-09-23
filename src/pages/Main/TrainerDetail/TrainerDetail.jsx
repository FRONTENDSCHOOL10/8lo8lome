import AppMeta from '@/components/AppMeta';
import {
  AppHeader,
  AppLoading,
  AppTrainerProfile,
  AppReviewList,
} from '@/components';
import { memo, useEffect, useState } from 'react';
import { mainStore } from '@/stores/mainStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { debounce } from '@/utils';
import 'swiper/css';

function TrainerDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    fetchTrainerDetails,
    trainerList,
    trainerData,
    selectedTrainerId,
    trainerDetailPath,
    handleTrainerSwiperChange,
    currentSwiperTrainerId,
  } = mainStore((s) => ({
    fetchTrainerDetails: s.handleMethod.fetchTrainerDetails,
    trainerList: s.searchInput.trainerList,
    trainerData: s.searchInput.trainerData,
    selectedTrainerId: s.selectedTrainerId,
    trainerDetailPath: s.trainerDetailPath,
    handleTrainerSwiperChange: s.handleMethod.handleTrainerSwiperChange,
    currentSwiperTrainerId: s.currentSwiperTrainerId,
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

  const debouncedHandleTrainerSwiperChange = debounce(
    handleTrainerSwiperChange,
    600
  );

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
              onSlideChange={debouncedHandleTrainerSwiperChange}
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

          <AppReviewList
            item={trainerData}
            filter={`trainer = '${currentSwiperTrainerId}'`}
            expand={'user, trainer'}
          />
        </>
      )}
    </>
  );
}

export default memo(TrainerDetail);
